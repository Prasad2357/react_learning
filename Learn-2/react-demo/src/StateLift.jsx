import { useState, useEffect } from "react";

function Name() {
    const [name, setName] = useState("")
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setName(e.target.value)
        if (error) setError("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name) {
            setError("Field is required")
            return
        }

        console.log("Name is ", name)

    }



    return (
        <div>
            <div >
                <form onSubmit={handleSubmit}>
                    <label>
                        Enter your name:
                        <input
                            type="text"
                            value={name}
                            onChange={handleChange}
                        />
                    </label> <br></br>

                    <button type="submit">Submit</button>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                </form>

            </div>


            <div>
                <p>Live Preview: {name} </p>

            </div>
        </div>
    )

}

export default Name