import { db } from "./firebase"; 
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";


export const obtenerAsesorias = async () => {
  const snapshot = await getDocs(collection(db, "asesorias"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const guardarAsesoria = async (datosAsesoria) => {
  try {
    await addDoc(collection(db, "asesorias"), datosAsesoria);
    return true;
  } catch (error) {
    console.error("Error al guardar asesoría:", error);
    return false;
  }
};

export const obtenerAsesoriasAlumno = async (alumnoId) => {
  try {
    const q = query(collection(db, "asesorias"), where("alumnoId", "==", alumnoId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener asesorías del alumno:", error);
    return [];
  }
};
