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
import BarberComment from "./Components/BarberComment/BarberComment";
import OrderCreate from "./Components/Dashboard/components/Orders/OrderCreate";
import BarberDashboardComment from "./Components/Dashboard/BarberDashboardComment";
import OrderEdit from "./Components/Dashboard/components/Orders/OrderEdit";
import Benifit from "./Components/Dashboard/components/Benifit/Benifit";
import Archive from "./Components/Dashboard/components/Archive/Archive";
import BarbersInfo from "./Components/Dashboard/components/Barbers/BarbersInfo";
import TwoService from "./Components/Dashboard/components/Service/TwoService";
import BarberWorkTimeTwo from "./Components/BarberWorkTime/BarberWorkTimeTwo";
import BarberDayOffTwo from "./Components/BarberDayOff/BarberDayOffTwo";
import BarberDashboardComTwo from "./Components/Dashboard/BarberDashboardComTwo";
import AdminBarberService from "./Components/AdminBarberService/AdminBarberService";
import AdminBarberWorkTime from "./Components/AdminBarberWorkTime/AdminBarberWorkTime";
import AdminBarberDayOff from "./Components/AdminBarberDayOff/AdminBarberDayOff";
import AdminBarberComment from "./Components/AdminBarberComment/AdminBarberComment";
import Expenses from "./Components/Expenses/Expenses";

function App() {
  return (
    <Router >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/login" element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/bron/create" element={<OrderCreate />} />
            <Route path="admin/bron/edit/:ID" element={<OrderEdit />} />
            <Route path="admin/barbers" element={<Barbers />} />
            <Route path="admin/barbers/info/:ID" element={<BarbersInfo />} />

            <Route path="admin/barbers/edit" element={<BarbersEdit />} />
            <Route path="admin/barbers/create" element={<BarbersCreate />} />

            <Route path="admin/benefit" element={<Benifit/>} />
            <Route path="admin/archive" element={<Archive/>} />
            <Route path="admin/expenses" element={<Expenses/>} />

            <Route path="admin/barber/service/:ID" element={<AdminBarberService/>} />
            <Route path="admin/barber/work-time/:ID" element={<AdminBarberWorkTime/>} />
            <Route path="admin/barber/day-off/:ID" element={<AdminBarberDayOff/>} />
            <Route path="admin/barber/comment/:ID" element={<AdminBarberComment/>} />






          </Route>

          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/service/:barberId" element={<Service />} />
            <Route path="/barber/comment/:ID" element={<BarberComment />} />
            <Route path="/date/:barberId/:selectedServices" element={<Date />} />
            <Route path="/record/:barberId/:selectedServices" element={<Record />} />
            <Route path="/barberinfo/:ID" element={<Barber />} />
            <Route path="/confirm/:barberId/:selectedServices/:date/:time" element={<Confrim />} />
          </Route>
        </Route>


        <Route path="/berber/dashboard/service" element={<MyService />} />
        <Route path="/berber/dashboard/servicetwo" element={<TwoService/>} />

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
          path="/barber/dashboard/workTimetwo"
          element={
            <ProtectedRoute>
              <BarberWorkTimeTwo />
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
         <Route
          path="/barber/dashboard/dayOfftwo"
          element={
            <ProtectedRoute>
              <BarberDayOffTwo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barber/dashboard/comment"
          element={
            <ProtectedRoute>
              <BarberDashboardComment />
            </ProtectedRoute>
          }
        />
         <Route
          path="/barber/dashboard/commenttwo"
          element={
            <ProtectedRoute>
              <BarberDashboardComTwo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
