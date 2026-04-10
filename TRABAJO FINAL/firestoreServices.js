import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";


export const getUsuarios = async () => {
  const usuariosRef = collection(db, "Usuarios");
  const snapshot = await getDocs(usuariosRef);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};


// 💾 GUARDAR USUARIO
export const createUsuario = async (usuario) => {
  await setDoc(doc(db, "Usuarios", usuario.idUsuario), usuario);
};