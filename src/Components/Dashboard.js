import React, { useState, useEffect } from "react";
import { Row} from "react-bootstrap";
import TodoColumn from "./TodoColumn";
import TodoService from "../services/Todoservices";
import Addcard from "./AddCard";


export default function Dashboard() {
  const [todos, setTodos] = useState([{ "title": "",
  "description": "",
  "status": "TODO",
  "id": 0}]);
  const [todosInProgress, setTodosInProgress] = useState([{ "title": "",
  "description": "",
  "status": "INPROGRESS",
  "id": 0}]);
  const [todosDone, setTodosDone] = useState([{ "title": "",
  "description": "",
  "status": "DONE",
  "id":0 }]);

  useEffect(() => {
    TodoService.getAll()
      .then((res) => {
        setTodos([...todos,...res.data.filter((todo) => todo.status === "TODO")]);
        setTodosInProgress([...todosInProgress,...res.data.filter((todo) => todo.status === "INPROGRESS")]);
        setTodosDone([...todosDone,...res.data.filter((todo) => todo.status === "DONE")]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);


  return (
    <>
    <Addcard/>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Row>
        <TodoColumn title="Todo" todos={todos} />
        <TodoColumn title="In Progress" todos={todosInProgress} />
        <TodoColumn title="Done" todos={todosDone} />
      </Row>
      </div>
    </>
  );
}
