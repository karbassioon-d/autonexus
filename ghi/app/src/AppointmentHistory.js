import React, { useState, useEffect } from 'react'
import historySVG from './icons/calendar4.svg'

const AppointmentHistory = () => {
    const [appointments, setAppointments] = useState([])
    const [search, setSearch] = useState('')

    const fetchAppointmentList = async () => {
        const url = 'http://localhost:8080/api/appointments/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments.filter((appointment) => appointment.vin.startsWith(search)))
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setSearch(value);
    }

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
    }, [search]);

    if (appointments.length === 0) {
        return (
            <div className="container mt-3">
                <div className="container d-flex justify-content-center align-items-center">
                <img style={{width:"6%", maxWidth:"50px"}} src={historySVG} />
                    <h1 style={{marginLeft:"12px"}} className="text-center">Appointment History</h1>
                </div>
            <form style={{margin:"15px"}}>
                <input onChange={handleChange} placeholder='Filter by VIN...' required type="text" name="VIN" id="VIN" className="form-control" value={search}/>
            </form>
            <h5 className="mt-2">No appointments found for vins starting with '{search}'. </h5>
            </div>
        )
    } else {

    return (
        <div className="container mt-3">
            <div className="container d-flex justify-content-center align-items-center">
            <img style={{width:"6%", maxWidth:"50px"}} src={historySVG} />
                <h1 style={{marginLeft:"12px"}} className="text-center">Appointment History</h1>
            </div>
        <form style={{margin:"15px"}}>
            <input onChange={handleChange} placeholder='Filter by VIN...' required type="text" name="VIN" id="VIN" className="form-control" value={search}/>
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
                <td>{makeLocalDate(appointment.date_time)}</td>
                <td>{makeLocalTime(appointment.date_time)}</td>
                <td>{appointment.technician.first_name + ' ' + appointment.technician.last_name}</td>
                <td>{appointment.reason}</td>
                <td style={{color:`${appointment.status_color}`}}>{appointment.status}</td>
            </tr>
            );
            })}
            </tbody>
        </table>

        </div>
    )
    }
}

export default AppointmentHistory
