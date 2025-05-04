import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";
import Home from "./Components/Home/Home";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute"; // Импорт компонента защиты маршрутов
import Service from "./Components/Service/Service";
import Date from "./Components/Date/Date";
import Record from "./Components/Record/Record";
import Barber from "./Components/Barber/Barber";
import Confrim from "./Components/Confirm/Confirm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
          </Route>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/date" element={<Date />} />
            <Route path="/record" element={<Record />} />
            <Route path="/barberinfo" element={<Barber />} />
            <Route path="/confrim" element={<Confrim />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
