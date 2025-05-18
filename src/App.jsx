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
import BarberDashboard from "./Components/Dashboard/BarberDashboard";
import MyService from "./Components/Dashboard/components/Service/MyService";
import ProfileEdit from "./Components/Dashboard/components/ProfileEdit";
import BarberServiceCreate from "./Components/BarberService/BarberServiceCreate";
import BarberServiceEdit from "./Components/BarberService/BarberServiceEdit";
import BarberWorkTime from "./Components/BarberWorkTime/BarberWorkTime";
import BarberDayOff from "./Components/BarberDayOff/BarberDayOff";

function App() {
  return (
    <Router >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/login" element={<Login />} />

          <Route
            element={
              // <ProtectedRoute>
              <AdminLayout />
              // </ProtectedRoute>
            }
          >
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/barbers" element={<Barbers />} />
            <Route path="admin/barbers/edit" element={<BarbersEdit />} />
            <Route path="admin/barbers/create" element={<BarbersCreate />} />

          </Route>

          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/service/:barberId" element={<Service />} />
            <Route path="/date" element={<Date />} />
            <Route path="/record" element={<Record />} />
            <Route path="/barberinfo/:ID" element={<Barber />} />
            <Route path="/confirm" element={<Confrim />} />
          </Route>
        </Route>


        <Route path="/berber/dashboard/service" element={<MyService />} />
        <Route
          path="/barber/dashboard"
          element={
            <ProtectedRoute>
              <BarberDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barber/profile"
          element={
            <ProtectedRoute>
              <ProfileEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barber/dashboard/service/create"
          element={
            <ProtectedRoute>
              <BarberServiceCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barber/dashboard/service/edit/:ID"
          element={
            <ProtectedRoute>
              <BarberServiceEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barber/dashboard/workTime"
          element={
            <ProtectedRoute>
              <BarberWorkTime />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barber/dashboard/dayOff"
          element={
            <ProtectedRoute>
              <BarberDayOff />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
