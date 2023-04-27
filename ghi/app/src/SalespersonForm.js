import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";


const SalespersonForm = () => {
  const navigate = useNavigate();

  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');

  const handleFirst_nameChange = (event) => {
      const value = event.target.value;
      setFirst_name(value);
    }

  const handleLast_nameChange = (event) => {
      const value = event.target.value;
      setLast_name(value);
  }

  const handleSubmit = async (event) => {
      event.preventDefault();

      const data = {}

      data.first_name = first_name;
      data.last_name = last_name;

      const salespersonUrl = 'http://localhost:8090/api/salespeople/'
      const fetchConfig = {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          },
      };
      try {
          const response = await fetch(salespersonUrl, fetchConfig);
          if (response.ok) {
              setFirst_name('');
              setLast_name('');
          }
          navigate('/salespeople')

      } catch (error) {
          console.error(error);
      }

  }
  useEffect(() => {
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new salesperson</h1>
            <form onSubmit={handleSubmit} id="add-salesperson-form">
              <div className="form-floating mb-3">
                <input onChange={handleFirst_nameChange} placeholder="First name" required type="text" name="first_name" id="first_name" className="form-control" value={first_name} />
                <label htmlFor="name">First name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleLast_nameChange} placeholder="Last name" required type="text" name="last_name" id="last_name" className="form-control" value={last_name} />
                <label htmlFor="fabric">Last name</label>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalespersonForm
