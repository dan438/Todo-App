import React, { useState, useEffect } from "react";
import "./App.css";
import { AddCircleOutlineRounded } from "@material-ui/icons";
import { Button, Container, TextField } from "@material-ui/core";
import Todo from "./component/Todo";
import { db } from "./FireBase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const list = db
      .collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().todo,
              timestamp: doc.data().timestamp,
            };
          })
        );
      });

    return () => list();
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <Container maxWidth="sm">
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="todo"
          label="Enter ToDo"
          name="todo"
          autoFocus
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addTodo}
          disabled={!input}
          startIcon={<AddCircleOutlineRounded />}
        >
          Add Todo
        </Button>
      </form>
      <Todo todos={todos} />
    </Container>
  );
}
export default App;
