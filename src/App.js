import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Login from './views/Login.jsx';
import Perfil from './views/Perfil.jsx';
import Navbar from "./components/Navbar";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/authContext.js";

// 🔥 SERVICE
import { getUserData } from "./services/userService";

function App() {

  // 🌐 Usuario global (Auth)
  const { usuario } = useContext(AuthContext);

  // 🔥 Estado para datos de Firestore
  const [datos, setDatos] = useState(null);

  // 🔄 Traer datos cuando haya usuario
  useEffect(() => {

    const cargarDatos = async () => {
      if (usuario) {
        const data = await getUserData(usuario.uid);
        setDatos(data);
      } else {
        setDatos(null);
      }
    };

    cargarDatos();

  }, [usuario]);

  return (
    <div>

      {/* 🔥 NAVBAR GLOBAL */}
      {usuario && <Navbar usuario={usuario} datos={datos} />}

      {/* 🔥 CONTENIDO */}
      <main style={{ marginTop: "50px" }}>
        
        {usuario 
          ? <Perfil usuario={usuario} datos={datos} />
          : <Login />
        }

      </main>

    </div>
  );
}

export default App;