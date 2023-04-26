import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from './TechnicianList';
import CreateTechnicianForm from './TechnicianForm';
import AppointmentList from './AppointmentList';
import CreateAppointmentForm from './CreateAppointmentForm'
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="technicians" >
            <Route path="" element={<TechnicianList />} />
            <Route path="new" element={<CreateTechnicianForm/>} />
          </Route>

          <Route path="appointments" >
            <Route path="" element={<AppointmentList />} />
            <Route path="new" element={<CreateAppointmentForm/>} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
