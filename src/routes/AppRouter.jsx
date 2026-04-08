import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../views/Login";
import Perfil from "../views/Perfil";
import Usuarios from "../views/Usuarios";

function AppRouter({ usuario, datos, loading }) {

  // ⏳ ESPERAR DATOS
  if (loading) {
    return <h2 className="text-center mt-5">Cargando...</h2>;
  }

  return (
    <Routes>

      {/* 🔐 LOGIN */}
      <Route 
        path="/" 
        element={!usuario ? <Login /> : <Navigate to="/perfil" />} 
      />

      {/* 👤 PERFIL */}
      <Route
        path="/perfil"
        element={usuario ? <Perfil usuario={usuario} datos={datos} /> : <Login />}
      />

      {/* 👥 SOLO ADMIN */}
      <Route
        path="/usuarios"
        element={
          usuario && datos?.Rol === "Admin"
            ? <Usuarios />
            : <h2 className="text-center mt-5">🚫 Acceso denegado</h2>
        }
      />

    </Routes>
  );
}

export default AppRouter;