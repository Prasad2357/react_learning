import { useState } from "react";

function ControlledForm() {
    const [inputValue, setInputValue] = useState("")
    const [email, setEmail] = useState("")
    const [submittedData, setSubmittedData] = useState(null);
    const [error, setError] = useState("");



    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!inputValue || !email || !inputValue && !email) {
            setError("Both fields are required!");
            return;
        }

        console.log("Form Submitted with name:", inputValue, "and email:", email)
        setSubmittedData({ inputValue, email })
    }


    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <form onSubmit={handleSubmit} >
                <label>
                    Enter your name:
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                    />
                </label><br></br>

                <label>
                    Enter your email:
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </label><br></br>

                <button type="submit">Submit</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {submittedData && (
                <div>
                    <p>Name: {submittedData.inputValue}</p>
                    <p>Email: {submittedData.email}</p>
                </div>
            )}

        </div>

    )
}

export default ControlledForm