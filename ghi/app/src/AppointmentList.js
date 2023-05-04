import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import calendarSVG from './icons/calendars.svg'

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
        data.status_color = '#dc3545';

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
        data.status_color = '#0d6efd';
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


    function makeLocalDate(string) {
        let date = new Date(string).toLocaleDateString('en-US', { timeZone: 'UTC' })
        return date
    }

    function makeLocalTime(string) {
        let time = new Date(string).toLocaleTimeString('en-US', { timeZone: 'UTC' });
        return time;
    }



    useEffect(() => {
        fetchAppointmentList();
    }, []);

    if (appointments.length === 0) {
        return (
            <div className="container mt-3">
                <div className="d-flex justify-content-center align-items-center">
                    <img style={{width:"5%"}} src={calendarSVG} />
                    <h1 style={{marginLeft:"10px"}} className="text-center">Appointments <Link to="new" className="btn btn-sm btn-success">+</Link></h1>
                </div>
                <hr></hr>
                <h2 className="mt-5" style={{textAlign:"center"}}>No appointments scheduled</h2>
            </div>

        )
    } else {
        return (
            <div className="container mt-3">
                <div className="d-flex justify-content-center align-items-center">
                    <img style={{width:"5%"}} src={calendarSVG} />
                    <h1 style={{marginLeft:"10px"}} className="text-center">Appointments <Link to="new" className="btn btn-sm btn-success">+</Link></h1>
                </div>
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
                        <td>{makeLocalDate(appointment.date_time)}</td>
                        <td>{makeLocalTime(appointment.date_time)}</td>
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

}

export default AppointmentList
