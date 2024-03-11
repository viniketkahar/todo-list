import React, { useState, useEffect } from 'react'
import Header from './Header'
import TodoItem from './TodoItem';

export default function Home() {

    let myStyle = {
        minHeight: "33.5vh",
        margin: "40px auto"
    }
    const [load, setload] = useState(false)
    const [todoItems, setTodoItems] = useState([]);

    const [todo, setTodo] = useState({ title: "", desc: "" });
    const submit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/adddata", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: todo.title, desc: todo.desc })
        });
        const json = await response.json();
        if (!json.success) {
            alert("Title and Description are not in required format.")
        }
        else {
            setTodo({ title: "", desc: "" });
            alert("Item added.")
            setload((load) => !load)
        }
    }

    const deleteHandler = async (id) => {
        const response = await fetch(`http://localhost:5000/api/deletedata/${id}`, {
            method: "DELETE"
        });
        const json = await response.json();
        if (!json.success) {
            alert("Error")
        }
        else {
            alert("item deleted")
            setload((load) => !load)
        }
    }

    const onchange = (event) => {
        setTodo({ ...todo, [event.target.name]: event.target.value })
    }

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/showdata", {
            method: "POST",
            headers: {
                'Content-Type': 'json/application'
            }
        });
        response = await response.json();
        setTodoItems(response[0])
    }

    useEffect(() => {
        loadData();
    }, [load])


    return (
        <div>
            <div><Header title="Todo's List" /></div>
            <div className='container my-3'>
                <h3>Add a Todo</h3>
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Todo Title</label>
                        <input type="text" name='title' value={todo.title} onChange={onchange} className="form-control" id="title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Todo Description</label>
                        <input type="text" name='desc' value={todo.desc} onChange={onchange} className="form-control" id="desc" />
                    </div>
                    <button type="submit" className="btn btn-sm btn-success">Add Todo</button>
                </form>
            </div>
            <div>
                <div className='container' style={myStyle}>
                    <h3 className='my-4'>Todo's List</h3>
                    {
                        todoItems.length !== 0 ?
                            todoItems.map((todo) => {
                                return (<>
                                    <TodoItem key={todo._id} todo={todo} deleteHandler={deleteHandler} id={todo._id}/>
                                    <hr />
                                </>)
                            }) : "No Todo's Item to display!!"
                    }
                </div>
            </div>
        </div>
    )
}