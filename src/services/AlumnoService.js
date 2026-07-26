import { db } from "./firebase";

import {
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    onSnapshot,
    doc,
    getDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

export const guardarAlumno = async (alumno) => {

    try {

        await addDoc(
            collection(db, "Alumnos"),
            {
                ...alumno,
                activo: true,
                fechaRegistro: serverTimestamp()
            }
        );

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

};

export const obtenerAlumnos = async () => {

    const snapshot = await getDocs(collection(db, "Alumnos"));

    const alumnos = [];

    snapshot.forEach(doc => {

        alumnos.push({
            id: doc.id,
            ...doc.data()
        });

    });

    return alumnos;

};

export const escucharAlumnos = (callback) => {

    return onSnapshot(collection(db, "Alumnos"), (snapshot) => {

        const alumnos = [];

        snapshot.forEach((doc) => {

            alumnos.push({
                id: doc.id,
                ...doc.data()
            });

        });

        callback(alumnos);

    });

};
export const obtenerAlumnoPorId = async (id) => {

    const referencia = doc(db, "Alumnos", id);

    const documento = await getDoc(referencia);

    if (!documento.exists()) {

        return null;

    }

    return {

        id: documento.id,

        ...documento.data()

    };

};
export const actualizarAlumno = async (id, alumno) => {

    try {

        await updateDoc(

            doc(db, "Alumnos", id),

            {
                nombre: alumno.nombre,
                matricula: alumno.matricula,
                carrera: alumno.carrera,
                grupo: alumno.grupo,
                correo: alumno.correo,
                telefono: alumno.telefono
            }

        );

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

};
export const eliminarAlumno = async (id) => {

    try {

        await deleteDoc(doc(db, "Alumnos", id));

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

};