import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../views/Login";
import Perfil from "../views/Perfil";
import Usuarios from "../views/Usuarios";
import ForgotPassword from "../views/ForgotPassword";
import Asesoria from "../views/Asesoria";
import CrearAnuncio from "../views/CrearAnuncio";
import Formulario from "../views/Formulario";
import Tablon from "../views/Tablon2";
import Respaldo from "../views/Respaldo";


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
      {/* 📋 REGISTRO ACTIVIDAD (Admin + Asesor) */}
        <Route
          path="/Asesoria"
          element={
            usuario && (datos?.Rol === "Admin" || datos?.Rol === "Asesor")
              ? <Asesoria />
              : <h2 className="text-center mt-5">🚫 Acceso denegado</h2>
          }
        />

              {/* TABLÓN DE ANUNCIOS*/}
      <Route 
        path="/tablon" 
        element={usuario ? <Tablon usuario={usuario} datos={datos} /> : <Navigate to="/login" />} 
      />

              {/* FORMULARIO DE ANUNCIOS */}
      <Route 
        path="/formulario" 
        element={usuario ? <Formulario usuario={usuario} datos={datos} /> : <Navigate to="/login" />} 
      />

        <Route 
  path="/tablon" 
  element={<Tablon usuario={usuario} datos={datos} />} 
/>


        <Route
            path="/crear-anuncio"
            element={
              usuario && (datos?.Rol === "Admin" || datos?.Rol === "Asesor")
                ? <CrearAnuncio usuario={usuario} datos={datos} />
                : <Navigate to="/perfil" />
            }
          />

          <Route
              path="/respaldo"
              element={
                usuario && datos?.Rol === "Admin"
                  ? <Respaldo />
                  : <h2 className="text-center mt-5">🚫 Acceso denegado</h2>
              }
            />

      {/* Contraseña Olvida */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

    </Routes>
  );
}

export default AppRouter;