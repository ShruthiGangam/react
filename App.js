import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSelection from './components/UserSelection';
import CommonPage from './components/CommonPage';
import DoctorPage from './components/DoctorPage/DoctorPage';
import PatientPage from './components/PatientPage/PatientPage'; // Updated import path
import AdminPage from './components/AdminPage/AdminPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSelection />} />
        <Route path="/common" element={<CommonPage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;