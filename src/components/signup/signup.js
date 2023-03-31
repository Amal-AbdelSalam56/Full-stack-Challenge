import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setError] = useState({
    firstnameError: "",
    lastnameError: "",
    emailError: "",
    passwordError: "",
  });

  const getValue = (event) => {
    if (event.target.name === "firstname") {
      setUser({ ...user, firstname: event.target.value });

      setError({
        ...errors,
        firstnameError:
          event.target.value.length === 0 ? "this field is required" : "",
      });
    } else if (event.target.name === "lastname") {
      setUser({ ...user, lastname: event.target.value });

      setError({
        ...errors,
        lastnameError:
          event.target.value.length === 0 ? "this field is required" : "",
      });
    } else if (event.target.name === "email") {
      setUser({ ...user, email: event.target.value });

      setError({
        ...errors,
        emailError:
          event.target.value.length === 0 ? "this field is required" : "",
      });
    } else if (event.target.name === "password") {
      setUser({ ...user, password: event.target.value });
      setError({
        ...errors,
        passwordError:
          event.target.value.length === 0 ? "this field is required" : "",
      });
    }
  };

  // const handleForm = (event) => {
  //   event.preventDefault();
  // };

  const navigate = useNavigate();

  const handleForm = (event) => {
    event.preventDefault();
    if (
      user.firstname.length === 0 &&
      user.lastname.length === 0 &&
      user.email.length === 0 &&
      user.password.length === 0
    ) {
      alert("Compelete Your Register Info");
    }
    if (
      user.firstname.length > 0 &&
      user.lastname.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      navigate("/srchtable");
    }
  };

  return (
    <div>
      <Form
        onSubmit={(event) => {
          handleForm(event);
        }}
      >
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type="firstname"
            className={`form-control  ${
              errors.firstnameError ? "border-danger shadow-none" : ""
            }`}
            placeholder="Enter firstname"
            value={user.firstname}
            name="firstname"
            onChange={(event) => {
              getValue(event);
            }}
          />
          <p className="text-danger">{errors.firstnameError}</p>
        </Form.Group>

        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>lastName</Form.Label>
          <Form.Control
            type="lastname"
            className={`form-control  ${
              errors.lastnameError ? "border-danger shadow-none" : ""
            }`}
            placeholder="Enter lastname"
            value={user.lastname}
            name="lastname"
            // pattern="^([A-Za-z]){3,}$"
            onChange={(event) => {
              getValue(event);
            }}
          />
          <p className="text-danger">{errors.lastnameError}</p>
        </Form.Group>

        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            className={`form-control  ${
              errors.emailError ? "border-danger shadow-none" : ""
            }`}
            placeholder="Enter email"
            value={user.email}
            name="email"
            // pattern="^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
            onChange={(event) => {
              getValue(event);
            }}
          />
          <p className="text-danger">{errors.emailError}</p>

          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            className={`form-control  ${
              errors.passwordError ? "border-danger shadow-none" : ""
            }`}
            placeholder="Password"
            value={user.password}
            name="password"
            // pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$"
            onChange={(event) => {
              getValue(event);
            }}
          />
          <p className="text-danger">{errors.passwordError}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
