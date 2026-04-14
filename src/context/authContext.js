// 🔧 Herramientas de React
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";

// 🌐 Creamos el contexto global
export const AuthContext = createContext();

// 🧠 Provider que envuelve toda la app
export const AuthProvider = ({ children }) => {

  // 👤 Estado donde guardamos al usuario
  const [usuario, setUsuario] = useState(null);

  // 🔄 Se ejecuta automáticamente cuando carga la app
  useEffect(() => {

    // 👀 Firebase escucha cambios de sesión
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 👉 Si hay usuario → lo guarda
      // 👉 Si no → null
      setUsuario(user);
    });

    // 🧹 Limpia el listener cuando el componente se destruye
    return () => unsubscribe();

  }, []);

  return (
    // 🌍 Hace disponible "usuario" en toda la app
    <AuthContext.Provider value={{ usuario }}>
      {children}
    </AuthContext.Provider>
  );
};