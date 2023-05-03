import React, { useEffect, useState } from 'react'
import SuccessAlert from './SuccessAlert';

const SalespersonForm = () => {

  const [show, setShow] = useState(false)

  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');

  const heading = `Salesperson added successfully`
  const route = `salespeople`
  const buttonMessage = `View salespeople`

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
              setShow(true);
          }

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
            <h1 className='text-center'>Add a new salesperson</h1>
            <form onSubmit={handleSubmit} id="add-salesperson-form">
              <div className="form-floating mb-3">
                <input onChange={handleFirst_nameChange} placeholder="First name" required type="text" name="first_name" id="first_name" className="form-control" value={first_name} />
                <label htmlFor="name">First name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleLast_nameChange} placeholder="Last name" required type="text" name="last_name" id="last_name" className="form-control" value={last_name} />
                <label htmlFor="fabric">Last name</label>
              </div>
              <button className="btn btn-success w-100">Add</button>
            </form>
          </div>
          <SuccessAlert show={show} setShow={setShow} heading={heading} route={route} buttonMessage={buttonMessage} />
        </div>
      </div>
    </div>
  )
}

export default SalespersonForm
