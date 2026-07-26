import { useState, useEffect } from "react";
import {

    guardarAlumno,

    actualizarAlumno

} from "../services/AlumnoService";
function AlumnoForm({

    onGuardado,

    alumnoEditar = null

}) {
    const [alumno, setAlumno] = useState({

        nombre: "",

        matricula: "",

        carrera: "",

        grupo: "",

        correo: "",

        telefono: ""

    });
useEffect(() => {

    if (alumnoEditar) {

        setAlumno(alumnoEditar);

    }

}, [alumnoEditar]);
    const cambiar = (e) => {

        setAlumno({

            ...alumno,

            [e.target.name]: e.target.value

        });

    };

    const guardar = async (e) => {

    e.preventDefault();

    let correcto;

    if (alumnoEditar) {

        correcto = await actualizarAlumno(

            alumnoEditar.id,

            alumno

        );

    } else {

        correcto = await guardarAlumno(alumno);

    }

    if (correcto) {

        alert(

            alumnoEditar

                ? "Alumno actualizado"

                : "Alumno registrado"

        );

        setAlumno({

            nombre: "",

            matricula: "",

            carrera: "",

            grupo: "",

            correo: "",

            telefono: ""

        });

        if (onGuardado) {

            onGuardado();

        }

    }

};

    return (

        <form onSubmit={guardar}>

            <input
                className="form-control mb-3"
                name="nombre"
                placeholder="Nombre"
                value={alumno.nombre}
                onChange={cambiar}
            />

            <input
                className="form-control mb-3"
                name="matricula"
                placeholder="Matrícula"
                value={alumno.matricula}
                onChange={cambiar}
            />

            <input
                className="form-control mb-3"
                name="carrera"
                placeholder="Carrera"
                value={alumno.carrera}
                onChange={cambiar}
            />

            <input
                className="form-control mb-3"
                name="grupo"
                placeholder="Grupo"
                value={alumno.grupo}
                onChange={cambiar}
            />

            <input
                className="form-control mb-3"
                name="correo"
                placeholder="Correo"
                value={alumno.correo}
                onChange={cambiar}
            />

            <input
                className="form-control mb-3"
                name="telefono"
                placeholder="Teléfono"
                value={alumno.telefono}
                onChange={cambiar}
            />

            <button className="btn btn-primary">

                Guardar Alumno

            </button>

        </form>

    );

}

export default AlumnoForm;