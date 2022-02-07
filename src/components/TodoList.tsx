import { Button, List, TextField } from "@shopify/polaris";
import axios from "axios";
import React, { useState } from "react";
import { ToDosInterface } from "../interfaces/ToDoInterface";

interface toDos {
  toDoList: { _id: { $oid: number }; todo: string }[];
  setTodos: React.Dispatch<React.SetStateAction<ToDosInterface[]>>;
}

const TodoList = ({ toDoList, setTodos }: toDos): JSX.Element => {
  const [updatedToDo, setUpdatedToDo] = useState<ToDosInterface>({
    _id: { $oid: 0 },
    todo: "",
  });
  const [edit, setEdit] = useState<boolean>(false);
  const [id, setId] = useState(0);

  var token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjFhNzZmYjlkNjAzMWM1N2U4NTFmOTM5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjc1NzU2MTA2LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJhdWQiOiIxMjcuMC4wLjEiLCJ0b2tlbl9pZCI6IjYyMDBjZWNhYTU2ZTM1MmM3YzU5MThlMiJ9.Mbj0cJhoxrL2kjyiiuTLxq-BtjDhWY-caMUzElRjvPBczSU_qkKag4FD7C8qgRwRMMUkL35YnWDeXj5OrmdrlkCX9MyLVSJA6o-Lm6WnEHMQhf0P2uMxkWSKLJseNzjho9k1o9Ws0ezmroZzy4hjVb0X_6qpZXHMdI3F0kK8MB4eecNTmi8TlpQNn108k_UsYxHt26tC6sWhgW4HvGjn_GdQyLKISMZA84DZEeu7PChcbqLDbeTzoD0sWnG_V6iDNOoelu4FVg5Q5D_9qbkq-J3p67pmtMb6EtjaTAOibt9mcdNo4MMgBx-if4fSicjXbO0EU-Ur4QCVL6RIBKdyOw";

  const handleDelete = (id: number) => {
    axios
      .delete(
        "http://home.local.cedcommerce.com:8080/onyxhome/todo/deletetodos",
        {
          data: { id: id },
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => setTodos(res.data));
  };

  const handleEdit = (id: number, i: number) => {
    setId(id);
    toDoList.map(
      (toDo) => toDo._id.$oid === id && setEdit((prevState) => !prevState)
    );
    if (edit === true) {
      axios
        .put(
          "http://home.local.cedcommerce.com:8080/onyxhome/todo/updatetodos",
          { id: id, todo: updatedToDo.todo },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => setTodos(res.data.reverse()));
      setUpdatedToDo({ _id: { $oid: 0 }, todo: "" });
    }
  };

  const handleChange = (id: number, value: string) => {
    setUpdatedToDo({ _id: { $oid: id }, todo: value });
  };

  return (
    <div>
      {toDoList.map((toDo: ToDosInterface, i: number) => (
        <List key={toDo._id.$oid} type="bullet">
          <List.Item>{toDo.todo}</List.Item>
          {edit === true && id === toDo._id.$oid && (
            <TextField
              // name="ToDo"
              value={updatedToDo.todo}
              onChange={(value) => handleChange(toDo._id.$oid, value)}
              label="ToDo"
              type="text"
              autoComplete="off"
            />
          )}
          <Button onClick={() => handleDelete(toDo._id.$oid)}>Delete</Button>
          <Button onClick={() => handleEdit(toDo._id.$oid, i)}>
            {toDo._id.$oid === id && edit === true ? "Update" : "Edit"}
          </Button>
        </List>
      ))}
    </div>
  );
};

export default TodoList;
