import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { deleteDoc} from "firebase/firestore";
import { addDoc} from "firebase/firestore";


export const getUsuarios = async () => {
  const usuariosRef = collection(db, "Usuarios");
  const snapshot = await getDocs(usuariosRef);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};


export const createAnuncio = async (anuncio) => {
  return await addDoc(collection(db, "Anuncios"), anuncio);
};

export const getAnuncios = async () => {
  const ref = collection(db, "Anuncios"); // 👈 IMPORTANTE

  const snapshot = await getDocs(ref);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};


// 🗑️ ELIMINAR USUARIO
export const deleteUsuario = async (id) => {
  const usuarioRef = doc(db, "Usuarios", id);
  await deleteDoc(usuarioRef);
};

// 💾 GUARDAR USUARIO
export const createUsuario = async (usuario) => {
  await setDoc(doc(db, "Usuarios", usuario.idUsuario), usuario);
};