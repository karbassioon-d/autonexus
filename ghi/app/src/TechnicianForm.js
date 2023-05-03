import React, { useState } from 'react';
import SuccessAlert from './SuccessAlert';

const TechnicianForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [show, setShow] = useState(false)

  const heading = `Technician added successfully`
  const route = `technicians`
  const buttonMessage = `View technicians`

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
}

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
  }

const handleSubmit = async (event) => {
  event.preventDefault();

  const data = {};
  data.first_name = firstName;
  data.last_name = lastName;
  const shoesUrl = `http://localhost:8080/api/technicians/`;
  const fetchConfig = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(shoesUrl, fetchConfig);
  if (response.ok) {
      setFirstName('');
      setLastName('');
      setShow(true);
  }
}

  return (
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1 className="text-center">Add a Technician</h1>
            <form onSubmit={handleSubmit} id="add-technician-form">

              <div className="form-floating mb-3">
                <input onChange={handleFirstNameChange} placeholder="First name" required type="text" name="first_name" id="fst_name" className="form-control" value={firstName}/>
                <label htmlFor="first_name">First name</label>
              </div>

              <div className="form-floating mb-3">
                <input onChange={handleLastNameChange} placeholder="Last name" required type="text" name="last_name" id="last_name" className="form-control" value={lastName}/>
                <label htmlFor="last_name">Last name</label>
              </div>

              <button className="btn btn-success w-100">Add</button>
            </form>
          </div>
          <SuccessAlert show={show} setShow={setShow} heading={heading} route={route} buttonMessage={buttonMessage} />
        </div>
      </div>
  )
}

export default TechnicianForm
