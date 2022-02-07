import { Button, Form, FormLayout, TextField } from "@shopify/polaris";
import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { ToDosInterface } from "../interfaces/ToDoInterface";
import TodoList from "./TodoList";

const ToDo = (): JSX.Element => {
  const [toDo, setTodo] = useState<string>("");
  const [toDos, setTodos] = useState<ToDosInterface[]>([]);

  var token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjFhNzZmYjlkNjAzMWM1N2U4NTFmOTM5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjc1NzU2MTA2LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJhdWQiOiIxMjcuMC4wLjEiLCJ0b2tlbl9pZCI6IjYyMDBjZWNhYTU2ZTM1MmM3YzU5MThlMiJ9.Mbj0cJhoxrL2kjyiiuTLxq-BtjDhWY-caMUzElRjvPBczSU_qkKag4FD7C8qgRwRMMUkL35YnWDeXj5OrmdrlkCX9MyLVSJA6o-Lm6WnEHMQhf0P2uMxkWSKLJseNzjho9k1o9Ws0ezmroZzy4hjVb0X_6qpZXHMdI3F0kK8MB4eecNTmi8TlpQNn108k_UsYxHt26tC6sWhgW4HvGjn_GdQyLKISMZA84DZEeu7PChcbqLDbeTzoD0sWnG_V6iDNOoelu4FVg5Q5D_9qbkq-J3p67pmtMb6EtjaTAOibt9mcdNo4MMgBx-if4fSicjXbO0EU-Ur4QCVL6RIBKdyOw";

  const fetchData = async () => {
    const response = await axios.get(
      "http://home.local.cedcommerce.com:8080/onyxhome/todo/gettodos",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await response.data;
    setTodos(data.reverse());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .post(
        "http://home.local.cedcommerce.com:8080/onyxhome/todo/createtodos",
        {
          todo: toDo,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => setTodos(res.data.reverse()));
    setTodo("");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} method="post">
        <FormLayout>
          <TextField
            name="ToDo"
            value={toDo}
            onChange={(value) => setTodo(value)}
            label="ToDo"
            type="text"
            autoComplete="off"
          />
          <Button primary submit>
            Submit
          </Button>
        </FormLayout>
      </Form>
      <TodoList toDoList={toDos} setTodos={setTodos} />
    </div>
  );
};

export default ToDo;
