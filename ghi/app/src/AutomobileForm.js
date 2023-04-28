import React, { useState, useEffect } from 'react'


const AutomobileForm = () => {
    const [models, setModels] = useState([]);

    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [model, setModel] = useState('');

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }
    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
    }
    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }
    const handleModelChange = (event) => {
        const value = event.target.value;
        setModel(value);
    }

    // fetch data from list of models
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json()
            setModels(data.models)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.color = color;
        data.year = year;
        data.vin = vin
        data.model_id = model;

        const appointmentsUrl = `http://localhost:8100/api/automobiles/`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await fetch(appointmentsUrl, fetchConfig);
        if (response.ok) {
            setColor('');
            setYear('');
            setVin('');
            setModel('');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="text-center">Add an automobile</h1>
                    <form onSubmit={handleSubmit} id="create-appointment-form">

                    <div className="form-floating mb-3">
                        <input onChange={handleColorChange} placeholder="Color" required type="text" name="Color" id="CustColoromer" className="form-control" value={color}/>
                        <label htmlFor="last_name">Color</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={handleYearChange} placeholder="Year" required type="text" name="Year" id="Date" className="form-control" value={year}/>
                        <label htmlFor="first_name">Year</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={handleVinChange} placeholder="Vin" required type="text" name="Vin" id="Vin" className="form-control" value={vin}/>
                        <label htmlFor="last_name">Vin</label>
                    </div>

                    <div className="form-floating mb-3">
                        <select onChange={handleModelChange} required name="Model" id="Model" className="form-select" value={model}>
                        <option value=''>Choose a model</option>
                        {models.map(model => {
                            return (
                                <option key={model.id} value={model.id}>
                                    {model.name}
                                </option>
                                );
                            })}
                        </select>
                    </div>

                    <button className="btn btn-success w-100">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AutomobileForm
