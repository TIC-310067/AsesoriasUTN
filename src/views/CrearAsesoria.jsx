import { useState } from "react";
import { Link } from "react-router-dom";
import fondo_login from "./Imagenes/background_blur.png"; 

function CrearAsesoria() {
  // 1. Declaramos los estados reales mapeados exactamente con los inputs de la imagen
  const [asunto, setAsunto] = useState("");
  const [materia, setMateria] = useState("");
  const [hora, setHora] = useState("01:00 p.m"); // Valor por defecto o placeholder de tu imagen
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!asunto.trim() || !materia.trim() || !hora.trim() || !descripcion.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      console.log("Publicando asesoría:", { asunto, materia, hora, descripcion });
      alert("¡Asesoría publicada con éxito! 📑");
      
      // Limpiar formulario
      setAsunto("");
      setMateria("");
      setHora("01:00 p.m");
      setDescripcion("");
    } catch (err) {
      console.error(err);
      setError("Error al publicar la asesoría");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fondo de pantalla de la universidad */}
      <section 
        className="vh-100 w-100 position-fixed top-0 start-0" 
        style={{
          backgroundImage: `url(${fondo_login})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          zIndex: -1 
        }}
      />

      <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center py-4" style={{ fontFamily: '"Afacad Flux", Helvetica' }}>
        <div className="row justify-content-center w-100">
          <div className="col-12 col-md-6 col-lg-5">

            {/* Tarjeta blanca redondeada */}
            <div className="card shadow-lg border-0 bg-white p-4" style={{ borderRadius: '2rem' }}>
              <div className="card-body">

               {/*<Link to="/tabloncopy" className="text-decoration-none text-dark d-inline-flex align-items-center mb-4 fw-medium" style={{ fontSize: '15px' }}>
                <span className="me-2" style={{ fontSize: '18px' }}>←</span> Volver al tablón
                 </Link>*/}

                {/* Cabecera idéntica a la imagen */}
                <h2 className="text-center fw-bold text-dark text-uppercase tracking-wide mb-1" style={{ fontSize: '26px' }}>
                  CREAR UNA NUEVA ASESORÍA
                </h2>
                <p className="text-center text-secondary mb-4 mx-auto" style={{ fontSize: '14px', maxWidth: '340px', lineHeight: '1.4' }}>
                  Por favor ingrese los datos solicitados.
                </p>

                {error && (
                  <div className="alert alert-danger py-2 rounded-3 text-center mb-3" style={{ fontSize: '14px' }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  {/* ASUNTO DEL AVISO */}
                  <div className="mb-3">
                    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}>
                      Asunto del aviso
                    </label>
                    <input 
                      type="text" 
                      className="form-control border-0 px-3 py-2 rounded-pill"
                      style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }}
                      value={asunto}
                      onChange={(e) => setAsunto(e.target.value)}
                      placeholder="Ej: Examen extraordinario"
                      disabled={loading}
                    />
                  </div>

                  {/* MATERIA */}
                  <div className="mb-3">
                    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}>
                      Materia
                    </label>
                    <input 
                      type="text" 
                      className="form-control border-0 px-3 py-2 rounded-pill"
                      style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }}
                      value={materia}
                      onChange={(e) => setMateria(e.target.value)}
                      placeholder="Ej: Administración de base de datos"
                      disabled={loading}
                    />
                  </div>

                  {/* HORA DE LA ASESORÍA */}
                    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}>
                      Hora de la asesoría
                    </label>
                    <div className="input-group">
                    <input
                      type="time"
                      className="form-control border-0 px-3 py-2 rounded-pill" 
                      style={{ 
                        backgroundColor: '#c2f0d5', 
                        color: '#11676A', 
                        fontWeight: '500' 
                      }}
                      defaultValue="13:00"
                    />
                  </div>


                  {/* DESCRIPCIÓN */}
                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}>
                      Descripción
                    </label>
                    <textarea 
                      className="form-control border-0 px-3 py-3 rounded-4"
                      style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500', resize: 'none', minHeight: '120px' }}
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      placeholder="Escriba aquí los detalles de la asesoría"
                      disabled={loading}
                    ></textarea>
                  </div>

                  {/* BOTÓN PUBLICAR ASESORÍA */}
                  <div className="d-grid pt-2">
                    <button 
                      type="submit" 
                      className="btn text-white fw-semibold rounded-pill border-0 py-2"
                      style={{ backgroundColor: loading ? '#6c757d' : '#00b96b', fontSize: '16px', letterSpacing: '0.5px' }}
                      disabled={loading}
                    >
                      {loading ? "Procesando..." : "Publicar Asesoría"}
                    </button>
                  </div>

                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default CrearAsesoria;
