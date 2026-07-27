import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../views/Login";
import Perfil from "../views/Perfil";
import Usuarios from "../views/Usuarios";
import ForgotPassword from "../views/ForgotPassword";
import CrearAsesoria from "../views/CrearAsesoria";
import Formulario from "../views/Formulario";
import Tablon from "../views/Tablon";
import Respaldo from "../views/Respaldo";
import AnalysisHome from "../views/AnalysisHome";
import ImportExcel from "../views/ImportExcel";
import CreateReport from "../views/CreateReport";
import Alumnos from "../views/Alumnos";
import AlumnoDetalle from "../views/AlumnoDetalle";
import AlumnoFormulario from "../views/AlumnoFormulario"; 


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
            path="/crear-asesoria"
            element={
              usuario && (datos?.Rol === "Admin" || datos?.Rol === "Asesor")
                ? <CrearAsesoria usuario={usuario} datos={datos} />
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

            <Route
          path="/analysis"
          element={
            usuario && (datos?.Rol === "Admin" || datos?.Rol === "Asesor")
              ? <AnalysisHome />
              : <h2 className="text-center mt-5">🚫 Acceso denegado</h2> }
        />

        <Route
          path="/analysis/import"
          element={
            usuario && (datos?.Rol === "Admin" || datos?.Rol === "Asesor")
              ? <ImportExcel />
              : <h2 className="text-center mt-5">🚫 Acceso denegado</h2>
          }
        />

        <Route
          path="/analysis/create"
          element={
            usuario && (datos?.Rol === "Admin" || datos?.Rol === "Asesor")
              ? <CreateReport />
              : <h2 className="text-center mt-5">🚫 Acceso denegado</h2>
          }
        />

        <Route
          path="/alumnos"
          element={
            usuario && (datos?.Rol === "Admin" || datos?.Rol === "Asesor")
              ? <Alumnos />
              : <Navigate to="/perfil" />
          }
        />

        <Route path="/alumnos/nuevo" element={
          usuario && (datos?.Rol === "Admin" || datos?.Rol === "Asesor") 
            ? <AlumnoFormulario usuario={usuario} datos={datos} /> 
            : <Navigate to="/perfil" />
        } />

        <Route
          path="/alumnos/:id"
          element={
            usuario && (datos?.Rol === "Admin" || datos?.Rol === "Asesor")
              ? <AlumnoDetalle />
              : <Navigate to="/perfil" />
          }
        />

      {/* Contraseña Olvida */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

    </Routes>
  );
}

export default AppRouter;
