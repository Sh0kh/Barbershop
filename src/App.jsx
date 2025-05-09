import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";
import Home from "./Components/Home/Home";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute";
import Service from "./Components/Service/Service";
import Date from "./Components/Date/Date";
import Record from "./Components/Record/Record";
import Barber from "./Components/Barber/Barber";
import Confrim from "./Components/Confirm/Confirm";
import ScrollToTop from "./Components/ScrollTop";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import BarbersCreate from "./Components/Dashboard/components/Barbers/BarbersCreate";
import Barbers from "./Components/Dashboard/components/Barbers/Barbers";
import BarbersEdit from "./Components/Dashboard/components/Barbers/BarbersEdit";

function App() {
  return (
    <Router>
      <ScrollToTop /> 
      <Routes>
        <Route path="/" element={<AppLayout />}>
        <Route path="/login" element={<Login/>} />

        <Route
            element={
              // <ProtectedRoute>
                <AdminLayout />
              // </ProtectedRoute>
            }
          >
            <Route path="admin/dashboard" element={<Dashboard/>} />
            <Route path="admin/barbers" element={<Barbers/>} />
            <Route path="admin/barbers/edit" element={<BarbersEdit/>} />

            <Route path="admin/barbers/create" element={<BarbersCreate/>} />

          
          </Route>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/date" element={<Date />} />
            <Route path="/record" element={<Record />} />
            <Route path="/barberinfo" element={<Barber />} />
            <Route path="/confirm" element={<Confrim />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
