

function NameForm({name, setName}){
    const handleChange = (e)=>{
        setName(e.target.value)
    }

    return (
        <form>
            <label>
                Enter your name:
                <input type="text" value={name} onChange={handleChange}/>
            </label> 
        </form>  
    )
}

export default NameForm