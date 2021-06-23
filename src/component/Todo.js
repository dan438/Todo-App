import React, { useState } from "react";
import { DeleteOutlineRounded, Edit } from "@material-ui/icons";
import {
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { db } from "../FireBase";
import moment from "moment";

const Todo = ({ todos }) => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");
  const [toUpdateId, setToUpdateId] = useState("");

  const deleteTodo = (id) => {
    db.collection("todos")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("Deleted!", res);
      });
  };

  const openUpdateDialog = (todo) => {
    setOpen(true);
    setToUpdateId(todo.id);
    setUpdate(todo.name);
  };

  const editTodo = () => {
    db.collection("todos").doc(toUpdateId).update({
      todo: update,
    });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <List dense={true}>
        {todos?.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              primary={todo.name}
              secondary={moment(todo.timestamp?.toDate().toString()).format(
                "MMMM Do YYYY"
              )}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="Edit"
                onClick={() => {
                  openUpdateDialog(todo);
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteTodo(todo.id)}
              >
                <DeleteOutlineRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Update Todo"
            type="text"
            fullWidth
            name="updateTodo"
            value={update}
            onChange={(event) => setUpdate(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editTodo} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Todo;
