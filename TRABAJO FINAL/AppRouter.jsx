import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../views/Login";
import Perfil from "../views/Perfil";
import Usuarios from "../views/Usuarios";
import Tablon from "../views/Tablon";
import Formulario from "../views/Formulario";

function AppRouter({ usuario, datos, loading }) {

  if (loading) {
    return <h2 className="text-center mt-5">Cargando...</h2>;
  }

  return (
    <Routes>

      {/* LOGIN */}
      <Route 
        path="/login" 
        element={!usuario ? <Login /> : <Navigate to="/perfil" />} 
      />

      {/* RAIZ - Redirige según autenticación */}
      <Route 
        path="/" 
        element={!usuario ? <Login /> : <Navigate to="/perfil" />} 
      />

      {/* PERFIL */}
      <Route
        path="/perfil"
        element={usuario ? <Perfil usuario={usuario} datos={datos} /> : <Navigate to="/login" />}
      />

      {/* TABLÓN DE ANUNCIOS*/}
      <Route 
        path="/tablon" 
        element={usuario ? <Tablon usuario={usuario} datos={datos} /> : <Navigate to="/login" />} 
      />

      {/* USUARIOS - SOLO ADMIN */}
      <Route
        path="/usuarios"
        element={
          usuario && datos?.Rol === "Admin"
            ? <Usuarios />
            : <Navigate to="/perfil" />
        }
      />

      {/* FORMULARIO DE ANUNCIOS */}
      <Route 
      path="/formulario" 
      element={usuario ? <Formulario usuario={usuario} datos={datos} /> : <Navigate to="/login" />} 
      />

      {/* 404 - Ruta no encontrada */}
      <Route 
        path="*" 
        element={<h2 className="text-center mt-5">❌ Página no encontrada</h2>} 
      />

    </Routes>
  );
}

export default AppRouter;