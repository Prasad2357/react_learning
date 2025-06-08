import React, { useActionState, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AddToDo = ({AddToDo}) => {
    const [title ,setTitle] = useState("");
    const [description, setDescription ] = useState("");
    const submit = (e) =>{
        e.preventDefault();
        if(!title || !description ){
            alert("Title or Description cannot be blank!")
        }  
        
        AddToDo(title,description);
    }

    return (
        <div className='container my-3'>
            <h3>Add a ToDo</h3>
            <form onSubmit={submit}>
                <div className="mb-3" >
                    <label htmlFor="title" className="form-label">ToDo Title</label>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="form-control" id="Title" placeholder="title" />
                </div>

                <div className="mb-3" >
                    <label htmlFor="desc" className="form-label">ToDo Description</label>
                    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className="form-control" id="description" placeholder="description" />
                </div>
                <Button type="submit" className="btn btn-sm btn-success" >
                    Submit
                </Button>
            </form>

        </div>
    )
}
