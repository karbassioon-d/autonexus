
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const AutomobileList = () => {
    const [automobiles, setAutomobiles] = useState([])
    const [sales, setSales] = useState([])

    const fetchAutomobileList = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos)
        }
    }

    const fetchSalesList = async () => {
        const url = 'http://localhost:8090/api/sale/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sale)
        }
    }

    useEffect(() => {
        fetchAutomobileList();
        fetchSalesList();
    }, []);

    return (
        <div className="container">
        <h1 className="text-center">Automobiles <Link to="new" className="btn btn-sm btn-success ">
                +
            </Link></h1>

        <table className="table table-striped">
            <thead>
            <tr>
                <th>VIN</th>
                <th>Color</th>
                <th>Year</th>
                <th>Manufacturer</th>
                <th>Model</th>
                <th>Sold?</th>
            </tr>
            </thead>
            <tbody>
            {automobiles.map((automobile) => {
            return (
            <tr key={automobile.vin} value={automobile.vin}>
                <td>{automobile.vin}</td>
                <td>{automobile.color}</td>
                <td>{automobile.year}</td>
                <td>{automobile.model.manufacturer.name}</td>
                <td>{automobile.model.name}</td>
                <td>{automobile.sold ? 'Yes': 'No'}</td>
                {/* <td>{sales.includes(automobile.vin) ? 'Yes': 'No'}</td> */}
            </tr>
            );
            })}
            </tbody>
        </table>
        </div>
    )
}

export default AutomobileList
