import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"


const CreateAppointmentForm = () => {
    const [technicians, setTechnicians] = useState([]);

    // fetch data from list of technicians
    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json()
            setTechnicians(data.technicians)
        }
    }

    const [automobileVIN, setAutomobileVIN] = useState('');
    const [customer, setCustomer] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [technician, setTechnician] = useState('');
    const [reason, setReason] = useState('');


    const handleAutomobileVINChange = (event) => {
        const value = event.target.value;
        setAutomobileVIN(value);
    }
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }
    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }
    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
    }
    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }
    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.vin = automobileVIN;
        data.customer = customer;
        data.date_time = date + ' ' + time
        data.technician = technician;
        data.reason = reason;

        const appointmentsUrl = `http://localhost:8080/api/appointments/`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await fetch(appointmentsUrl, fetchConfig);
        if (response.ok) {
            setAutomobileVIN('');
            setCustomer('');
            setDate('');
            setTime('');
            setTechnician('');
            setReason('');
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Make an appointment</h1>
                    <Link to="/appointments" className="btn btn-lg btn-primary">
                        View Appointment List
                    </Link>
                    <form onSubmit={handleSubmit} id="create-appointment-form">

                    <div className="form-floating mb-3">
                        <input onChange={handleAutomobileVINChange} placeholder="Automobile VIN" required type="text" name="Automobile_VIN" id="Automobile_VIN" className="form-control" value={automobileVIN}/>
                        <label htmlFor="first_name">Automobile VIN</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={handleCustomerChange} placeholder="Customer" required type="text" name="Customer" id="Customer" className="form-control" value={customer}/>
                        <label htmlFor="last_name">Customer</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={handleDateChange} placeholder="Date" required type="date" name="first_name" id="Date" className="form-control" value={date}/>
                        <label htmlFor="first_name">Date</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={handleTimeChange} placeholder="Time" required type="time" name="Time" id="Time" className="form-control" value={time}/>
                        <label htmlFor="last_name">Time</label>
                    </div>

                    <div className="form-floating mb-3">
                        <select onChange={handleTechnicianChange} required name="Technician" id="Technician" className="form-select" value={technician}>
                        <option value=''>Choose a technician</option>
                        {technicians.map(technician => {
                            return (
                                <option key={technician.employee_id} value={technician.employee_id}>
                                    {technician.first_name + ' ' + technician.last_name}
                                </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={handleReasonChange} placeholder="Reason" required type="text" name="Reason" id="Reason" className="form-control" value={reason}/>
                        <label htmlFor="last_name">Reason</label>
                    </div>

                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAppointmentForm
