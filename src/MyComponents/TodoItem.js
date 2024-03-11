import React from 'react'

export default function TodoItem({ todo, deleteHandler,id}) {
    return (
        <div>
            <h4>{todo.title}</h4>
            <p>{todo.desc}</p>
            <button className="btn btn-sm btn-danger" onClick={()=>deleteHandler(id)}>Delete</button>
        </div>
    )
}
