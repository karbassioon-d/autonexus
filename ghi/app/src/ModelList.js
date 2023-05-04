import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import sportscarSVG from './icons/sport.svg'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

const ModelList = () => {
  const [models, setModels] = useState([]);

  const [picture, setPicture] = useState('');

  const fetchData = async ()=> {
    const url = 'http://localhost:8100/api/models/';

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models)
    }
  };

  const deleteModel = async (event, id) => {
    event.preventDefault();
    const url = `http://localhost:8100/api/models/${id}/`;
    const response = await fetch(url, {method: "DELETE" });
    if (response.ok) {
      setModels(models.filter((sale) => sale.id !== id));
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="container mt-3">
      <div className="container d-flex justify-content-center align-items-center">
          <img style={{width:"5%"}} src={sportscarSVG} />
          <h1 style={{marginLeft:"20px"}}>Models <Link to="new" className="btn btn-sm btn-success">+</Link></h1>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <Carousel>
          {models.map(model => {
            return(
              <Carousel.Item key={model.id} value={model.id} interval={2000}>
                <div className="object-fit-cover" >
                  <img className="border" style={{width:"800px", height:"600px"}} src={model.picture_url} alt={model.name} />
                </div>
                <Carousel.Caption>
                  <h3>{model.manufacturer.name} {model.name}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })}
        </Carousel>
      </div>
      <table className="table table-striped position-static">
        <thead>
          <tr>
            <th>Manufacturer</th>
              <th>Model</th>
              <th>Picture</th>
          </tr>
        </thead>
        <tbody>
        {models.map(model => {
            return (
            <tr key={model.id} value={model.id} >
                <td>{model.manufacturer.name}</td>
                <td>{model.name}</td>
                <td><img src={model.picture_url} style={{ width:"200px" }} /></td>
                <td>
                  <button className="btn btn-sm btn-outline-danger" onClick={(event) => deleteModel(event, model.id)}>Delete</button>
                </td>
            </tr>
            );
        })}
        </tbody>
      </table>
    </div>
  )
}
export default ModelList
