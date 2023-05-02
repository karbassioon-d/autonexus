import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import sportscarSVG from './icons/sport.svg'

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
    const url = `http://localhost:8090/api/sale/${id}/`;
    const response = await fetch(url, {method: "DELETE" });
    if (response.ok) {
      setModels(models.filter((sale) => sale.id !== id));
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="container">
      <div className="container d-flex justify-content-center align-items-center">
          <img style={{width:"5%"}} src={sportscarSVG} />
          <h1 style={{marginLeft:"20px"}}>Models <Link to="new" className="btn btn-sm btn-success">+</Link></h1>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Picture</th>
          </tr>
        </thead>
        <tbody>
        {models.map(model => {
            return (
            <tr key={model.id} value={model.id} >
                <td>{model.name}</td>
                <td>{model.manufacturer.name}</td>
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
