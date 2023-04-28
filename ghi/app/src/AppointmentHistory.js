import React, { useState, useEffect } from 'react'

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

    function makeDate(string) {
        let date = new Date(string)
        return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
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
    }, [search]);

    return (
        <div className="container">
        <h1 className="text-center">Appointment History</h1>
        <form>
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
