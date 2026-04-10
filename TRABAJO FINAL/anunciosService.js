// src/services/anunciosService.js
import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  deleteDoc, 
  updateDoc, 
  doc, 
  orderBy, 
  query, 
  serverTimestamp
} from "firebase/firestore";


export const getAnuncios = async () => {
  try {
    const q = query(collection(db, "anuncios"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error al obtener anuncios:", error);
    return [];
  }
};

export const getAnuncioPorId = async (id) => {
  try {
    const docRef = doc(db, "anuncios", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error al obtener anuncio:", error);
    return null;
  }
};

export const crearAnuncio = async (anuncioData, usuario, datos) => {
  try {
    const ahora = new Date();
    const fechaLegible = ahora.toLocaleString();
    
    const nuevoAnuncio = {
      titulo: anuncioData.titulo,
      materia: anuncioData.materia,
      descripcion: anuncioData.descripcion,
      fecha: fechaLegible,
      timestamp: serverTimestamp(),
      autor: datos?.Nombre || usuario?.email || "Anónimo",
      autorId: usuario?.uid,
      autorRol: datos?.Rol
    };
    
    const docRef = await addDoc(collection(db, "anuncios"), nuevoAnuncio);
    return { id: docRef.id, ...nuevoAnuncio };
  } catch (error) {
    console.error("Error al crear anuncio:", error);
    throw error;
  }
};

export const actualizarAnuncio = async (id, anuncioData) => {
  try {
    const ahora = new Date();
    const fechaLegible = ahora.toLocaleString();
    
    const docRef = doc(db, "anuncios", id);
    await updateDoc(docRef, {
      titulo: anuncioData.titulo,
      materia: anuncioData.materia,
      descripcion: anuncioData.descripcion,
      fecha: fechaLegible,
      updatedAt: serverTimestamp(),
      editado: true
    });
    return true;
  } catch (error) {
    console.error("Error al actualizar anuncio:", error);
    throw error;
  }
};

export const eliminarAnuncio = async (id) => {
  try {
    await deleteDoc(doc(db, "anuncios", id));
    return true;
  } catch (error) {
    console.error("Error al eliminar anuncio:", error);
    throw error;
  }
};