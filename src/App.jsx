
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Layout from './Pages/Layout';
import Dashboard from './Pages/Dashboard';
import Employees from './Pages/Employees';
import Attendance from './Pages/Attendance';
import Leave from './Pages/Leave';
import Payslips from './Pages/Payslips';
import Settings from './Pages/Settings';
import PrintPayslip from './Pages/PrintPayslip';
import LogForm from './Components/LogForm';

const App = () => {
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/login/admin" element={<LogForm role='admin' title='Admin Portal' subTitle='Sign in to manage the organization' />} />
        <Route path="/login/employee" element={<LogForm role='employee' title='Employee Portal' subTitle='Sign in to access your account ' />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payslips" element={<Payslips />} />
          <Route path="/settings" element={<Settings />} />

        </Route>
        <Route path="/print/payslip/:id" element={<PrintPayslip />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default App;