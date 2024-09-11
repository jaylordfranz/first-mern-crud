import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Import custom CSS

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  // Fetch all items
  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(response => {
        setItems(response.data);
      });
  }, []);

  // Add new item
  const addItem = () => {
    axios.post('http://localhost:5000/items', { name })
      .then(response => {
        setItems([...items, response.data]);
        setName('');
      });
  };

  // Edit item
  const editItem = (id) => {
    const itemToEdit = items.find(item => item._id === id);
    setName(itemToEdit.name);
    setEditId(id);
  };

  // Update item
  const updateItem = () => {
    axios.put(`http://localhost:5000/items/${editId}`, { name })
      .then(response => {
        setItems(items.map(item => item._id === editId ? response.data : item));
        setName('');
        setEditId(null);
      });
  };

  // Delete item
  const deleteItem = (id) => {
    axios.delete(`http://localhost:5000/items/${id}`)
      .then(() => {
        setItems(items.filter(item => item._id !== id));
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">FIRST CRUD</h1>

      <div className="row mb-4">
        <div className="col-md-8 offset-md-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={editId ? updateItem : addItem}
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>

      <ul className="list-group">
        {items.map(item => (
          <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name}
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => editItem(item._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteItem(item._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
