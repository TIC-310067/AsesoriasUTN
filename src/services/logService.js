import { db } from "./firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

// 🔥 FUNCIÓN GLOBAL DE LOGS
export const crearLog = async ({
  usuario,
  idUsuario,
  accion,
  descripcion
}) => {
  try {
    await addDoc(collection(db, "Logs"), {
      usuario: usuario || "Desconocido",
      idUsuario: idUsuario || null,
      accion, // Ej: LOGIN_EXITOSO
      descripcion, // texto libre
      fecha: serverTimestamp()
    });
  } catch (error) {
    console.error("Error al guardar log:", error);
  }
};


export const getLogs = async () => {
  const ref = collection(db, "Logs");
  const snapshot = await getDocs(ref);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};