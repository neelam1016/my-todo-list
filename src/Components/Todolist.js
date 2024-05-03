import React,{useState} from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TodoService from "../services/Todoservices";

export default function TodoList({ title, todos }) {
  const navigate = useNavigate();
  const [draggedTodo, setDraggedTodo] = useState(null);

  const handleDragStart = (e, todo) => {
    e.dataTransfer.setData("application/json", JSON.stringify(todo))
    setDraggedTodo(todo);
  };
  console.log("after",draggedTodo)
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e, targetTodo) => {
    e.preventDefault();
    const draggedTodoData = e.dataTransfer.getData("application/json");
    const startData=JSON.parse(draggedTodoData);
    TodoService.update(startData.id, { "title": startData.title,
    "description": startData.description,
    "status": targetTodo.status,
    "id": startData.id })
    .then((res) => {
      if (res) {
        console.log(res.data);
        window.location.reload();
      }
    })
    .catch((error) => {
      console.error("Error updating todo:", error);
    });
    setDraggedTodo(null);
  };
  

  const handleUpdateTodoClick = (id) => {
    navigate(`/updatetodo/${id}`);
  };
 
  return (
    
    <Card style={{ width: "18rem" ,textAlign:'center' }}>
      <Card.Header>
        {title}
      </Card.Header>
      <ListGroup variant="flush" onDragOver={handleDragOver}>
        {todos && todos.map((todo) => (
          <div >
          <ListGroup.Item
            key={todo.id}
            draggable
            onDragStart={(e) => handleDragStart(e, todo)}
            onDrop={(e) => handleDrop(e, todo)}
            onClick={() => handleUpdateTodoClick(todo.id)}
          >
            <div className={`${todos?.length<2 ?"h-100 d-inline-block":''}`}>
            {todos?.length<2 && <text style={{color:'grey' }}>Drop here</text>}
            {todo.id !== 0 &&
            <Card>
              <Card.Body>
                <Card.Title>{todo.title}</Card.Title>
                <Card.Text className="mb-2 text-muted">
                  {todo.description}
                </Card.Text>
              </Card.Body>
            </Card>
            }
             </div>
          </ListGroup.Item>
          </div>
        ))}
      </ListGroup>
    </Card>
  );
}
