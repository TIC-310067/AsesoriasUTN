import AlumnoForm from "./AlumnoForm";

function AlumnoModal({
    mostrar,
    cerrar,
    alumnoEditar
}) {

    if (!mostrar) return null;

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,.5)"
            }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
    {alumnoEditar ? "Editar Alumno" : "Registrar Alumno"}
                        </h5>

                        <button
                            className="btn-close"
                            onClick={cerrar}
                        />

                    </div>

                    <div className="modal-body">

                        <AlumnoForm
    onGuardado={cerrar}
    alumnoEditar={alumnoEditar}
/>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AlumnoModal;