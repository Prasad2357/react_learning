import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(username.trim()){
            navigate("/dashboard")
        }
        else
        {
            alert("Please enter a username")
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input 
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>

                <button type="submit"> Login</button>
        </form>
    )
}

export default Login