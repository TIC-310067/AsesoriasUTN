import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import AppRouter from "./routes/AppRouter";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/authContext";

// 🔥 SERVICE
import { getUserData } from "./services/userService";

function App() {

  // 🌐 Usuario global (Auth)
  const { usuario } = useContext(AuthContext);

  // 🔥 Estado para datos de Firestore
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Traer datos cuando haya usuario
  useEffect(() => {
  const cargarDatos = async () => {
    if (usuario) {
      const data = await getUserData(usuario.uid);
      setDatos(data);
    } else {
      setDatos(null);
    }
    setLoading(false); // 🔥 termina carga
  };

    cargarDatos();

  }, [usuario]);

  return (
    <BrowserRouter> {/* 🔥 AQUÍ ESTÁ EL FIX */}

      {/* 🔥 NAVBAR GLOBAL */}
      {usuario && <Navbar usuario={usuario} datos={datos} />}

      {/* 🔥 CONTENIDO */}
      <main style={{ marginTop: "50px" }}>
        <AppRouter usuario={usuario} datos={datos} />
      </main>

    </BrowserRouter>
  );
}

export default App;