import { eliminarAlumno } from "../services/AlumnoService";

function EliminarAlumnoModal({ mostrar, cerrar, alumno }) {

    if (!mostrar || !alumno) return null;

    const eliminar = async () => {

        const correcto = await eliminarAlumno(alumno.id);

        if (correcto) {

            alert("Alumno eliminado correctamente");

            cerrar();

        } else {

            alert("Ocurrió un error");

        }

    };

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,.5)"
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            Eliminar Alumno

                        </h5>

                        <button
                            className="btn-close"
                            onClick={cerrar}
                        />

                    </div>

                    <div className="modal-body">

                        <p>

                            ¿Deseas eliminar este alumno?

                        </p>

                        <hr/>

                        <strong>Nombre:</strong>

                        <p>{alumno.nombre}</p>

                        <strong>Matrícula:</strong>

                        <p>{alumno.matricula}</p>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={cerrar}
                        >

                            Cancelar

                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={eliminar}
                        >

                            Eliminar

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EliminarAlumnoModal;