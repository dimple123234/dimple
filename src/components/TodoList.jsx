import { useEffect, useState } from "react";
import "../index.css"; // Ensure CSS is applied

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/todos");
                const json = await response.json();
                setTodos(json.slice(0, 200)); // Limit to 10 todos for better UI
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="todo-container">
            <h2>Todo List</h2>
            {todos.length > 0 ? (
                <table className="todo-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>User ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.title}</td>
                                <td>{todo.userId}</td>
                                <td className={todo.completed ? "completed" : "not-completed"}>
                                    {todo.completed ? "✅ Completed" : "❌ Not Completed"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="loading">Loading...</p>
            )}
        </div>
    );
}

export default TodoList;
