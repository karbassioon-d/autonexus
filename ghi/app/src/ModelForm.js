import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";


const ModelForm = () => {
  const navigate = useNavigate();

  const [manufacturers, setManufacturers] = useState([]);

  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [manufacturer, setManufacturer] = useState('');

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers)
    }
  }

  const handleNameChange = (event) => {
      const value = event.target.value;
      setName(value);
    }

  const handlePictureChange = (event) => {
      const value = event.target.value;
      setPicture(value);
  }

  const handleManufacturerChange = (event) => {
    const value = event.target.value;
    setManufacturer(value);
}

  const handleSubmit = async (event) => {
      event.preventDefault();

      const data = {}

      data.name = name;
      data.picture_url = picture;
      data.manufacturer_id = manufacturer;

      const modelUrl = 'http://localhost:8100/api/models/'
      const fetchConfig = {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json',
          },
      };
      try {
          const response = await fetch(modelUrl, fetchConfig);
          if (response.ok) {
              setName('');
              setPicture('');
          }
          navigate('/models')

      } catch (error) {
          console.error(error);
      }

  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a new model</h1>
              <form onSubmit={handleSubmit} id="add-model-form">
                <div className="form-floating mb-3">
                  <input onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={name} />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handlePictureChange} placeholder="Picture" required type="url" name="picture" id="picure" className="form-control" value={picture} />
                  <label htmlFor="fabric">Picture</label>
                </div>
                <div className="mb-3">
                  <select onChange={handleManufacturerChange} required name="manufacturer" id="manufacturer" className="form-select" value={manufacturer} >
                      <option value="">Choose a Manufacturer</option>
                      {manufacturers.map((manufacturer) => {
                          return (
                              <option key={manufacturer.id} value={manufacturer.id}>
                                  {manufacturer.name}
                              </option>
                          );
                      })}
                  </select>
                </div>
                <button className="btn btn-primary">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ModelForm
