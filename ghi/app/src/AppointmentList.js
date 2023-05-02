import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([])

    const fetchAppointmentList = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments.filter((appointment) => appointment.status === "Scheduled"))
        }
    }

    const cancelAppointment = async (event, id) => {
        event.preventDefault();

        const data = {};
        data.status = 'Canceled';
        const url = `http://localhost:8080/api/appointments/${id}/cancel`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newStatus = await response.json();
            setAppointments(appointments.filter((appointment) => appointment.id !== id));
        };
    }

    const finishAppointment = async (event, id) => {
        event.preventDefault();

        const data = {};
        data.status = 'Finished';
        const url = `http://localhost:8080/api/appointments/${id}/finish`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setAppointments(appointments.filter((appointment) => appointment.id !== id));
        }
    };

    function makeDate(string) {
        let date = new Date(string).toDateString()
        return date
    }

    function makeTime(string) {
        let time = new Date(string)
        let minutes = time.getUTCMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes.toString();
        }
        return `${time.getUTCHours()}:${minutes}`;
    }


    useEffect(() => {
        fetchAppointmentList();
    }, []);

    return (
        <div className="container">
        <h1 className="text-center">Appointments <Link to="new" className="btn btn-sm btn-success">+</Link></h1>
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
                <td><button className="btn btn-sm btn-outline-primary" onClick={(event) => finishAppointment(event, appointment.id)}>Finish</button></td>
                <td><button className="btn btn-sm btn-outline-danger" onClick={(event) => cancelAppointment(event, appointment.id)}>Cancel</button></td>
            </tr>
            );
            })}
            </tbody>
        </table>
        </div>
    )
}

export default AppointmentList
