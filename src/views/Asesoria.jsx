

function Asesoria(){
return(

    <div>
         <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 col-lg-5">
        <div className="form-container shadow-lg p-4">

          <h3 className="text-center titulo-verde">
            Registro de Actividad
          </h3>

          <p className="text-center text-muted small mb-4">
            Ingresa los datos solicitados
          </p>

          <form>
            {/* NOMBRE */}
            <div className="mb-3">
              <label className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Juan Pérez"
              />
            </div>

            {/* TITULO */}
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de la tarea o evento"
              />
            </div>

            {/* DESCRIPCIÓN */}
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Escribe los detalles..."
              ></textarea>
            </div>

            {/* HORA */}
            <div className="mb-4">
              <label className="form-label">Hora del Evento</label>
              <input
                type="time"
                className="form-control"
                defaultValue="13:00"
              />
            </div>

            {/* BOTÓN */}
            <div className="d-grid">
              <button type="submit" className="btn btn-verde">
                Guardar Información
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
    </div>
);
}
export default Asesoria