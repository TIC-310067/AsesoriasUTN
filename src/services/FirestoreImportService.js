import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const importarRegistros = async (datos, columnas) => {

    for (const fila of datos) {

        const nuevoRegistro = {};

        columnas.forEach(col => {

            nuevoRegistro[col] = fila[col];

        });

        await addDoc(
            collection(db, "Alumnos"),
            nuevoRegistro
        );

    }

};