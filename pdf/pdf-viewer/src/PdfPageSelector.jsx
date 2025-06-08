// import React, { useState } from 'react';
// import { PDFDocument } from 'pdf-lib';

// const PdfPageSelector = () => {
//   const [file, setFile] = useState(null);
//   const [pageInput, setPageInput] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handlePageChange = (e) => {
//     setPageInput(e.target.value);
//   };

//   const extractPages = async () => {
//     if (!file || !pageInput.trim()) {
//       alert("Please upload a PDF and enter page numbers.");
//       return;
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const existingPdf = await PDFDocument.load(arrayBuffer);
//     const newPdf = await PDFDocument.create();

//     const totalPages = existingPdf.getPageCount();
//     const pageNumbers = pageInput
//       .split(',')
//       .map(n => parseInt(n.trim()) - 1)
//       .filter(n => n >= 0 && n < totalPages);

//     const copiedPages = await newPdf.copyPages(existingPdf, pageNumbers);
//     copiedPages.forEach(page => newPdf.addPage(page));

//     const pdfBytes = await newPdf.save();
//     download(pdfBytes, 'selected-pages.pdf');
//   };

//   const download = (data, filename) => {
//     const blob = new Blob([data], { type: 'application/pdf' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = filename;
//     link.click();
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Select Pages from PDF</h2>
//       <input type="file" accept="application/pdf" onChange={handleFileChange} />
//       <input
//         type="text"
//         placeholder="Enter pages (e.g., 1,3,5)"
//         value={pageInput}
//         onChange={handlePageChange}
//         className="block border p-2 w-full mt-3"
//       />
//       <button
//         onClick={extractPages}
//         className="bg-blue-600 text-white px-4 py-2 mt-3 rounded"
//       >
//         Extract Pages
//       </button>
//     </div>
//   );
// };

// export default PdfPageSelector;



/***************************************************************88 */

// import React, { useState, useEffect } from 'react';
// import { PDFDocument } from 'pdf-lib';
// import { pdfjs } from 'react-pdf';
// import { saveAs } from 'file-saver';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const PdfPageSelector = () => {
//   const [file, setFile] = useState(null);
//   const [selectedPages, setSelectedPages] = useState([]);
//   const [pdfPreview, setPdfPreview] = useState([]);
//   const [originalDocId, setOriginalDocId] = useState('');
//   const [totalPages, setTotalPages] = useState(0);

//   // Save PDF to CouchDB (Mock implementation - replace with your API call)
//   const saveToDatabase = async (pdfData, isOriginal = false) => {
//     try {
//       const response = await fetch('/api/save-pdf', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           pdf: btoa(String.fromCharCode(...new Uint8Array(pdfData))),
//           isOriginal,
//           originalDocId: isOriginal ? null : originalDocId,
//           pages: isOriginal ? null : selectedPages,
//         }),
//       });
//       const data = await response.json();
//       if (isOriginal) setOriginalDocId(data.id);
//       return data;
//     } catch (error) {
//       console.error('Database save failed:', error);
//     }
//   };

//   const handleFileChange = async (e) => {
//     const newFile = e.target.files[0];
//     if (!newFile) return;

//     // Save original PDF to database
//     const arrayBuffer = await newFile.arrayBuffer();
//     const dbResponse = await saveToDatabase(arrayBuffer, true);
    
//     // Generate preview
//     const url = URL.createObjectURL(newFile);
//     const loadingTask = pdfjs.getDocument(url);
//     const pdf = await loadingTask.promise;
    
//     const pages = [];
//     for (let i = 1; i <= pdf.numPages; i++) {
//       const page = await pdf.getPage(i);
//       const viewport = page.getViewport({ scale: 0.5 });
//       const canvas = document.createElement('canvas');
//       canvas.height = viewport.height;
//       canvas.width = viewport.width;
      
//       const context = canvas.getContext('2d');
//       await page.render({ canvasContext: context, viewport }).promise;
//       pages.push(canvas.toDataURL());
//     }
    
//     setFile(newFile);
//     setTotalPages(pdf.numPages);
//     setPdfPreview(pages);
//     setSelectedPages(Array.from({ length: pdf.numPages }, (_, i) => i));
//   };

//   const togglePage = (pageIndex) => {
//     setSelectedPages(prev => 
//       prev.includes(pageIndex)
//         ? prev.filter(p => p !== pageIndex)
//         : [...prev, pageIndex]
//     );
//   };

//   const extractPages = async () => {
//     if (!file || selectedPages.length === 0) {
//       alert("Please upload a PDF and select pages.");
//       return;
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const existingPdf = await PDFDocument.load(arrayBuffer);
//     const newPdf = await PDFDocument.create();

//     const copiedPages = await newPdf.copyPages(existingPdf, selectedPages);
//     copiedPages.forEach(page => newPdf.addPage(page));

//     const pdfBytes = await newPdf.save();
    
//     // Save extracted pages to database
//     await saveToDatabase(pdfBytes);
//     download(pdfBytes, 'selected-pages.pdf');
//   };

//   return (
//     <div className="p-4 max-w-2xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4">PDF Page Selector</h2>
      
//       <div className="mb-4">
//         <input 
//           type="file" 
//           accept="application/pdf" 
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//         />
//       </div>

//       {pdfPreview.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-medium mb-3">Select Pages ({selectedPages.length} selected)</h3>
//           <div className="grid grid-cols-3 gap-4">
//             {pdfPreview.map((preview, index) => (
//               <label 
//                 key={index}
//                 className={`relative border-2 rounded-lg p-2 cursor-pointer ${
//                   selectedPages.includes(index) 
//                     ? 'border-blue-500 bg-blue-50' 
//                     : 'border-gray-200'
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedPages.includes(index)}
//                   onChange={() => togglePage(index)}
//                   className="absolute top-2 right-2"
//                 />
//                 <img 
//                   src={preview} 
//                   alt={`Page ${index + 1}`} 
//                   className="w-full h-40 object-contain"
//                 />
//                 <div className="text-center mt-2">Page {index + 1}</div>
//               </label>
//             ))}
//           </div>
//         </div>
//       )}

//       {pdfPreview.length > 0 && (
//         <button
//           onClick={extractPages}
//           className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//         >
//           Save Selected Pages to Database
//         </button>
//       )}
//     </div>
//   );
// };

// export default PdfPageSelector;

