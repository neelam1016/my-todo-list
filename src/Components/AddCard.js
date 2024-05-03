import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import TodoService from "../services/Todoservices";
import { useParams, useNavigate } from "react-router-dom";

export default function Addcard() {
  const initialState = {
    title: "",
    description: "",
    status: "",
  };
  const [todo, setTodo] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    setTitleError("");
    setDescriptionError("");
    setTodo(initialState);
    navigate("/");
  };
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    if (params.id) {
      handleShowModal();
      TodoService.getById(params.id)
        .then((res) => {
          setTodo(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [params.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;


    if (name === "title") {
      if (!/^[A-Za-z ]+$/.test(value)) {
        setTitleError("Title should only contain alphabets.");
      } else {
        setTitleError("");
      }
    }

    if (name === "description") {
      if (value.length < 25) {
        setDescriptionError("Description should be at least 25 characters.");
      } else {
        setDescriptionError("");
      }
    }

    setTodo({ ...todo, [name]: value });
    if (params.id) {
      TodoService.update(params.id, { ...todo, [name]: value })
        .then((res) => {
          if (res) {
            console.log(res.data);
          }
        })
        .catch((error) => {
          console.error("Error updating todo:", error);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (params.id) {
      if (window.confirm("Do u want to delete")) {
        TodoService.remove(params.id).then((res) => {
          if (res) {
            alert("Todo Deleted");
            handleCloseModal();
            navigate("/");
          }
        });
      }
    } else {
      // Add todo
      TodoService.create(todo)
        .then((res) => {
          if (res) {
            handleCloseModal();
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Error adding todo:", error);
        });
    }
  };

  return (
    <>
      {!params.id && (
        <div
          className="my-2"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button variant="primary" onClick={handleShowModal}>
            Add Todo
          </Button>
        </div>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{params.id ? "Update Todo" : "Add Todo"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={todo.title}
                onChange={handleChange}
                required
              />
              {titleError && <Alert variant="danger">{titleError}</Alert>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={todo.description}
                onChange={handleChange}
                required
              />
              {descriptionError && (
                <Alert variant="danger">{descriptionError}</Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={todo.status}
                onChange={handleChange}
                required
              >
                <option value="">Select status</option>
                <option value="TODO">TODO</option>
                <option value="INPROGRESS">INPROGRESS</option>
                <option value="DONE">DONE</option>
              </Form.Select>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="d-flex justify-content-between"
            >
              {params.id ? "Delete" : "Add"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
