import React, { useEffect, useState } from 'react';
import axios from "axios";


const Todo = () => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);

    const onDelete = (id) => {
        let newTodo = todos.filter(todo => todo.id !== id);
        setTodos(newTodo);
    }

    const saveInfo = () => {
        fetch("http://localhost:8080/todos", {

            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                text: newTodo,
                isCompleted: false,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setTodos([...todos, data]);
                setNewTodo("");
            });
    };

    useEffect(() => {
        const getTodo = async () => {
            let res = await axios.get(`http://localhost:8080/todos?_page=${page}&_limit=7`);
            setTodos(res.data);
            console.log(res);
            setTotalPage(Number(res.headers["x-total-count"]));
        };
        getTodo();
    }, [page]);

    return (
        <div>
            <div className='input'>
                <input onChange={({ target }) => setNewTodo(target.value)} placeholder='Add Tasks...' />

                <button onClick={saveInfo}> + </button>
            </div>
            <div className='input-div'>
                {todos.map((todo) => (
                    <div className='input-data' key={todo.id}>
                        {todo.text}
                        <button className='delete' onClick={() => onDelete(todo.id)}> ✘ </button>
                    </div>
                ))}

                <div className='page-button'>
                    <button
                        disabled={page <= 1}
                        onClick={() => {
                            if (page > 1) {
                                setPage(page - 1);
                            }
                            setPage(page - 1)
                        }}>
                        {`«`}
                    </button>

                    <button
                        disabled={totalPage < page * 7}
                        onClick={() => setPage(page + 1)}>
                        {`»`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Todo;