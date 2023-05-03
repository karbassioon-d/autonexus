import React from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const SuccessAlert = (props) => {
  const navigate = useNavigate();

  return (
    <Alert show={props.show} variant={"success"} onClick={() => props.setShow(false)} dismissible>
      <Alert.Heading>{props.heading}</Alert.Heading>
      <Button variant="outline-success" onClick={() => navigate(`/${props.route}`)}>{props.buttonMessage}</Button>
    </Alert>
  )
}

export default SuccessAlert
