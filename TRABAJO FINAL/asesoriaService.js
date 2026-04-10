import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const obtenerAsesorias = async () => {
  const snapshot = await getDocs(collection(db, "asesorias"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

