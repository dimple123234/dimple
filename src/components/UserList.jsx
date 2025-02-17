import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/users"; // JSON Server API URL

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch users from JSON Server
  useEffect(() => {
    axios.get(API_URL).then((res) => setUsers(res.data));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new user (Fix ID issue)
  const handleAddUser = () => {
    if (!form.name || !form.email) return;

    axios.post(API_URL, form).then((res) => {
      setUsers([...users, res.data]); // JSON Server assigns an ID
      setForm({ name: "", email: "" });
    });
  };

  // Edit user - Populate form
  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setIsEditing(true);
    setEditingId(user.id); // Store ID for updating
  };

  // Update user (Fix ID handling)
  const handleUpdateUser = () => {
    axios.put(`${API_URL}/${editingId}`, form).then((res) => {
      setUsers(users.map((user) => (user.id === editingId ? res.data : user)));
      setForm({ name: "", email: "" });
      setIsEditing(false);
      setEditingId(null);
    });
  };

  // Delete user
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  return (
    <div className="container">
      <h2>{isEditing ? "Edit User" : "Add User"}</h2>
      <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />

      {isEditing ? (
        <button onClick={handleUpdateUser} className="update">Update</button>
      ) : (
        <button onClick={handleAddUser} className="add" disabled={!form.name || !form.email}>
          Add User
        </button>
      )}

      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(user)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
