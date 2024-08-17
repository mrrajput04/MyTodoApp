"use client";
import { useState, useEffect } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./todoService";
import styles from "./page.module.css";
export default function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await getTodos();
    setTodos(response.data);
  };

  const handleAddTodo = async () => {
    const newTodo = { title, description };
    await createTodo(newTodo);
    fetchTodos();
    setTitle("");
    setDescription("");
  };

  const handleUpdateTodo = async (id, completed) => {
    await updateTodo(id, { completed });
    fetchTodos();
  };
  const handleEditClick = (todo) => {
    setIsEditing(true);
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
  };
  const handleSaveEdit = async () => {
    try {
      await updateTodo(editId, {
        title: editTitle,
        description: editDescription,
      });
      fetchTodos();
      setIsEditing(false);
      setEditId(null);
      setEditTitle("");
      setEditDescription("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className={styles.container}>
      <div className={styles.addtodo}>
        <h2 className="todohead">Add a Todo to the List</h2>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={styles.description}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className={styles.btn} onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <div className={styles.alltodos}>
        <h2 className="todohead">Todo List </h2>
        <ul className={styles.unorderedlist}>
          {todos.map((todo) => (
            <li className={styles.list} key={todo.id}>
              {editId === todo.id ? (
                <div className={styles.editForm}>
                  <input
                    type="text"
                    placeholder="Edit Title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className={styles.input}
                  />
                  <textarea
                    placeholder="Edit Description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className={styles.textarea}
                  ></textarea>
                  <button
                    onClick={handleSaveEdit}
                    className={styles.saveButton}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h2 className={styles.heading2}>{todo.title}</h2>
                  <p className={styles.para}>{todo.description}</p>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) =>
                      handleUpdateTodo(todo.id, e.target.checked)
                    }
                  />
                  <button
                    onClick={() => handleEditClick(todo)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
