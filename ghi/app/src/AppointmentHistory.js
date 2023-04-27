import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"


const AppointmentHistory = () => {

    const [appointments, setAppointments] = useState([])
    const [search, setSearch] = useState('')


    const fetchAppointmentList = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            // shows all appointments that have ever been made
            setAppointments(data.appointments.filter((appointment) => appointment.vin.startsWith(search)))
        }
    }


    // This function converts a string date to a JS Date object and returns a modified string date
    function makeDate(string) {
        let date = new Date(string)
        return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    }

    // This function converts a string date to a JS Date object and returns a modified string time
    function makeTime(string) {
        let date = new Date(string)
        return `${date.getHours()}:${date.getMinutes()}`;
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setSearch(value);
    }

    useEffect(() => {
        fetchAppointmentList();
    }, [search]);

    return ( // conditional if appointments === 0, hide table and show 'No appointments that start with ${search}
        <div className="container">
        <h1>Service Appointment History</h1>
        <form>
            <input onChange={handleChange} placeholder='Search by VIN...' required type="text" name="VIN" id="VIN" className="form-control" value={search}/>
        </form>

        <table className="table table-striped">
            <thead>
            <tr>
                <th>VIN</th>
                <th>Customer</th>
                <th>VIP?</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {appointments.map((appointment) => {
            return (
            <tr key={appointment.id} value={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.vip_status ? 'Yes': 'No'}</td>
                <td>{makeDate(appointment.date_time)}</td>
                <td>{makeTime(appointment.date_time)}</td>
                <td>{appointment.technician.first_name + ' ' + appointment.technician.last_name}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.status}</td>
            </tr>
            );
            })}
            </tbody>
        </table>

        </div>
    )
}

export default AppointmentHistory
