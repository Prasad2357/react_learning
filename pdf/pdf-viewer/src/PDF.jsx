import React, { useState, useEffect } from 'react';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { Document, Page } from 'react-pdf';

export default function PDFViewerSelector() {
    const [fileURL, setFileURL] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [selectedPages, setSelectedPages] = useState([]);
    const [originalFile, setOriginalFile] = useState(null);
    const [arrayBuffer, setArrayBuffer] = useState(null);
    const [pdfId, setPdfId] = useState('');

    const onDocumentLoadSuccess = ({ numPages }) => {
        setPageCount(numPages);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const buffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer);
        const form = pdfDoc.getForm();

        const pages = pdfDoc.getPageCount();
        const allPages = pdfDoc.getPages();
        let updatedSelectedPages = [];

        allPages.forEach((page, index) => {
            const checkBox = form.createCheckBox(`checkBox.page${index + 1}`);
            const { width, height } = page.getSize();

            checkBox.addToPage(page, {
                x: 50,
                y: height - 75,
                width: 25,
                height: 25,
                textColor: rgb(1, 0, 0),
                backgroundColor: rgb(0, 1, 0),
                borderColor: rgb(0, 0, 1),
                borderWidth: 2,
            });

            // ✅ OPTIONAL: Check the box if you want to preselect it
            if (index === 0) {
                checkBox.check();  // <-- this is what you're missing
            }

            // 📝 Page label
            page.drawText(`Page ${index + 1}`, {
                x: width - 110,
                y: height - 35,
                size: 14,
                color: rgb(0, 0, 1),
            });
        });
        form.updateFieldAppearances();


        // Save the modified PDF
        const pdfBytes = await pdfDoc.save();

        // Create a downloadable link for the modified PDF
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);


       

        // Update state with the new file URL
        setPageCount(pages);
        setOriginalFile(file);
        setArrayBuffer(buffer);
        setFileURL(pdfUrl);  // Set the link to the new modified PDF
        setSelectedPages(updatedSelectedPages);
        console.log("selected page", selectedPages)


    };

    const togglePageSelection = (index) => {
        setSelectedPages((prev) =>
            prev.includes(index)
                ? prev.filter((p) => p !== index)
                : [...prev, index]
        );
    };

    const handleSubmit = async () => {
        if (!originalFile || selectedPages.length === 0) {
            alert('Please upload a file and select at least one page.');
            return;
        }

        const formData = new FormData();
        formData.append('file', originalFile);  // <-- Use the actual File object directly
        formData.append('selectedPages', JSON.stringify(selectedPages));

        try {
            const response = await fetch('http://127.0.0.1:8000/pdf/store-pdf-pages', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Original PDF and selected pages sent to backend.');
            } else {
                const error = await response.json();
                alert(`Upload failed: ${error.detail || 'Unknown error'}`);
            }
        } catch (err) {
            alert('Upload failed due to network or server error.');
        }
    };

    const handleSelectedPage = async (pdfId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/pdf/get-selected-pages/${pdfId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                const error = await response.json();
                alert(`Failed to fetch pages: ${error.detail || 'Unknown error'}`);
                return;
            }

            const data = await response.json();
            console.log('Selected Pages:', data.selected_pages);

            pdfDoc.getPage(data.selected_pages[0])


            // Do something with selected_pages, e.g., render them
            // setSelectedPages(data.selected_pages);
        } catch (err) {
            console.error('Error fetching selected pages:', err);
            alert('Error fetching selected pages. Please try again.');
        }
    };
    useEffect(() => {
        console.log("selectedPages:", selectedPages);
    }, [selectedPages]);


    return (
        <div>
            <h2>Upload PDF and Select Pages</h2>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />

            {fileURL && (
                <>
                    <div style={{ marginTop: '20px', display: "flex" }}>
                        <object data={fileURL} type="application/pdf" width="100%" height='100%'>
                            <iframe
                                src={fileURL}
                                title="PDF Viewer"
                                width="100%"
                                height="100%"
                                style={{ border: '1px solid #ccc' }}
                            >

                            </iframe>

                        </object>

                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <h4>Select Pages:</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {Array.from({ length: pageCount }, (_, index) => (
                                <label key={index}>
                                    <input
                                        type="checkbox"
                                        checked={selectedPages.includes(index)}
                                        onChange={() => togglePageSelection(index)}
                                    />
                                    Page {index + 1}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button style={{ marginTop: '20px' }} onClick={handleSubmit}>
                        Submit Selection
                    </button>
                </>
            )}

            </div>
    );
}



            