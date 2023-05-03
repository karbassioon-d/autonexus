import React from 'react'
import Alert from 'react-bootstrap/Alert'

const FailedAlert = (props) => {
  return (
    <Alert show={props.failedSubmit} variant={"danger"} onClick={() => props.setFailedSubmit(false)} dismissible>{props.message}</Alert>
  )
}

export default FailedAlert