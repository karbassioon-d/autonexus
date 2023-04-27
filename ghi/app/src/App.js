import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonForm from './SalespersonForm';
import SalespeopleList from './SalespeopleList';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import SaleList from './SaleList';
import SaleForm from './SaleForm';
import SalespersonHistory from './SalespersonHistory';
import ModelForm from './ModelForm';
import ModelList from './ModelList';
import TechnicianList from './TechnicianList';
import CreateTechnicianForm from './TechnicianForm';
import AppointmentList from './AppointmentList';
import CreateAppointmentForm from './CreateAppointmentForm'
import AppointmentHistory from './AppointmentHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="manufacturers" >
            <Route path="" element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>

          <Route path="models" >
            <Route path="" element={<ModelList />} />
            <Route path="new" element={<ModelForm />} />
          </Route>

          <Route path="salespeople" >
            <Route path="" element={<SalespeopleList />} />
            <Route path="new" element={<SalespersonForm />} />
            <Route path="history" element={<SalespersonHistory />} />
          </Route>

          <Route path="customers" >
            <Route path="" element={<CustomerList />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>

          <Route path="sale" >
            <Route path="" element={<SaleList />} />
            <Route path="new" element={<SaleForm />} />
          </Route>

          <Route path="technicians" >
            <Route path="" element={<TechnicianList />} />
            <Route path="new" element={<CreateTechnicianForm/>} />
          </Route>

          <Route path="appointments" >
            <Route path="" element={<AppointmentList />} />
            <Route path="new" element={<CreateAppointmentForm/>} />
            <Route path="history" element={<AppointmentHistory/>} />
          </Route>

        </Routes>



      </div>
    </BrowserRouter>
  );
}

export default App;
