import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"


const AppointmentList = () => {

    const [appointments, setAppointments] = useState([])


    const fetchAppointmentList = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();

            // only shows appointments that are not cancelled or finished
            setAppointments(data.appointments.filter((appointment) => appointment.status === "created"))

            for (let appointment of appointments) {
                console.log(appointment.vip_status)
            }
        }
    }

    // This function gets invoked when the cancel button is clicked
    const cancelAppointment = async (event, id) => {
        event.preventDefault();

        const data = {};
        data.status = 'cancelled'; // data to be passed in to PUT request

        const url = `http://localhost:8080/api/appointments/${id}/cancel`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data), // changes the status to canceled
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newStatus = await response.json();
            // Removes the cancelled appointment from the list (but not from the db)
            setAppointments(appointments.filter((appointment) => appointment.id !== id));
        };
    }


    // This function gets invoked when the finish button is clicked
    const finishAppointment = async (event, id) => {
        event.preventDefault();

        const data = {}; // data to be passed in to PUT request
        data.status = 'finished';

        const url = `http://localhost:8080/api/appointments/${id}/finish`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(data), // changes the status to finished
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            // Removes the finished appointment from the list of appointments (but not from the db)
            setAppointments(appointments.filter((appointment) => appointment.id !== id));
        }
    };

    // const vipStatusCheck = async () => {
    //     const vinsList = [];
    //     const salesUrl = `http://localhost:8090/api/sale`;
    //     const salesResponse = await fetch(salesUrl);

    //     const sales = await salesResponse.json();
    //     console.log('here is sales', sales.sale)
    //     for (let sal of sales.sale) {
    //         vinsList.push(sal.automobile.vin)
    //     }

    //     const data = {}; // data to be passed in to PUT request
    //     data['vip_status'] = vinsList.includes(data.vin);
    //     console.log(data.vip_status)

        // const url = `http://localhost:8080/api/appointments/${id}/finish`;
        // const fetchConfig = {
        //     method: "PUT",
        //     body: JSON.stringify(data), // changes the status to finished
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // };

        // const response = await fetch(url, fetchConfig);
        // if (response.ok) {
        //     // Removes the finished appointment from the list of appointments (but not from the db)
        //     setAppointments(appointments.filter((appointment) => appointment.id !== id));
        // }
    // };

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

    useEffect(() => {
        fetchAppointmentList();
        // vipStatusCheck();
    }, []);


    return (
        <div className="container">
        <h1>Service Appointments</h1>
            <Link to="/appointments/new" className="btn btn-md btn-primary">
                Add an appointment
            </Link>
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

                <td><button className="btn btn-sm btn-primary" onClick={(event) => finishAppointment(event, appointment.id)}>Finish</button></td>
                <td><button className="btn btn-sm btn-danger" onClick={(event) => cancelAppointment(event, appointment.id)}>Cancel</button></td>

            </tr>
            );
            })}
            </tbody>

        </table>

        </div>
    )
}

export default AppointmentList
