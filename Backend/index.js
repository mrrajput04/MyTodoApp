import express from "express";
import { createConnection } from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = createConnection({
  host: "localhost",
  user: "root", // replace with your MySQL username
  password: "@passwordMySQL80", // replace with your MySQL password
  database: "todo_app",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to the database", err);
    return;
  }
  console.log("Connected to the MySQL database");
});

// CRUD operations here

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

//Create a Todo:
app.post("/todos", (req, res) => {
  const { title, description } = req.body;
  db.query(
    "INSERT INTO todos (title, description) VALUES (?, ?)",
    [title, description],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res
        .status(201)
        .send({ id: result.insertId, title, description, completed: false });
    }
  );
});

//Read or get all Todo
app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

//update a Todo
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  // Ensure only the fields that are provided are updated
  const fieldsToUpdate = {};
  if (title !== undefined) fieldsToUpdate.title = title;
  if (description !== undefined) fieldsToUpdate.description = description;
  if (completed !== undefined) fieldsToUpdate.completed = completed;

  const sql = `UPDATE todos SET ? WHERE id = ?`;
  db.query(sql, [fieldsToUpdate, id], (err, result) => {
    if (err) {
      console.error("Error updating todo:", err);
      return res.status(500).send("Server error");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Todo not found");
    }
    res.status(200).send({ message: "Todo updated successfully" });
  });
});

//Delete a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todos WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: "Todo deleted successfully" });
  });
});
