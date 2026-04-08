// 🔐 Importamos funciones de autenticación
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


// 🚪 FUNCIÓN PARA LOGIN
export const loginUser = (email, password) => {
  // 👉 Manda correo y contraseña a Firebase
  return signInWithEmailAndPassword(auth, email, password);
};

// 🔓 FUNCIÓN PARA LOGOUT
export const logoutUser = () => {
  // 👉 Cierra la sesión del usuario
  return signOut(auth);
};

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};