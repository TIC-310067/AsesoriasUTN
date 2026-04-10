import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const getUserData = async (uid) => {
  try {
    // 🔍 Buscar en la colección donde idUsuario == uid
    const q = query(
      collection(db, "Usuarios"),
      where("idUsuario", "==", uid)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // 👉 agarramos el primer resultado
      const docData = querySnapshot.docs[0].data();
      return docData;
    } else {
      console.log("No se encontró usuario");
      return null;
    }

  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};