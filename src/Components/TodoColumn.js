import React from "react";
import { Col } from "react-bootstrap";
import TodoList from "./Todolist";

export default function TodoColumn({ title, todos }) {
  return (
    <Col md={4}>
      <TodoList title={title} todos={todos} />
    </Col>
  );
}