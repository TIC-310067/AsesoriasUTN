import { useEffect, useState } from "react"; 
import { useParams, Link, useNavigate } from "react-router-dom"; 
import { guardarAsesoria, obtenerAsesoriasAlumno } from "../services/AsesoriaService"; 
import { obtenerAlumnoPorId } from "../services/AlumnoService"; 
import { generarReporteExcel } from "../services/ReporteExcelService"; 
import AlumnoDashboard from "../components/AlumnoDashboard"; 
import AlumnoCharts from "../components/AlumnoCharts"; 
import HistorialAsesorias from "../components/HistorialAsesorias";

function AlumnoDetalle() { 
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [alumno, setAlumno] = useState(null); 
  const [motivo, setMotivo] = useState("Asesoría Ordinaria"); 
  const [asesorias, setAsesorias] = useState([]); 
  const [numeroAsesoria, setNumeroAsesoria] = useState(1); 
  const [detalle, setDetalle] = useState(""); 
  const [cargando, setCargando] = useState(false);

  useEffect(() => { 
    cargarAlumno(); 
  }, [id]); 

  const cargarAlumno = async () => { 
    try {
      const datos = await obtenerAlumnoPorId(id); 
      setAlumno(datos); 
      const lista = await obtenerAsesoriasAlumno(id); 
      setAsesorias(lista);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      alert("Error al cargar los datos del alumno");
    }
  }; 

  const cargarAsesorias = async () => { 
    try {
      const datos = await obtenerAsesoriasAlumno(id); 
      setAsesorias(datos);
    } catch (error) {
      console.error("Error al cargar asesorías:", error);
    }
  }; 

  const registrarAsesoria = async () => { 
    if (!detalle.trim()) {
      alert("Por favor, escriba el detalle de la asesoría");
      return;
    }

    setCargando(true);
    try { 
      const datos = { 
        alumnoId: alumno.id, 
        nombre: alumno.nombre, 
        matricula: alumno.matricula, 
        carrera: alumno.carrera, 
        grupo: alumno.grupo, 
        correo: alumno.correo, 
        telefono: alumno.telefono, 
        motivo, 
        numeroAsesoria, 
        detalle,
        fecha: new Date().toISOString()
      }; 
      
      const correcto = await guardarAsesoria(datos); 
      if (correcto) { 
        generarReporteExcel(datos); 
        alert("Reporte generado correctamente."); 
        // Recargar asesorías para actualizar la tabla
        await cargarAsesorias();
        // Limpiar campos
        setDetalle("");
        setNumeroAsesoria(1);
        setMotivo("Asesoría Ordinaria");
      } else { 
        alert("Ocurrió un error al guardar la asesoría."); 
      } 
    } catch (error) {
      console.error("Error al registrar asesoría:", error);
      alert("Error al registrar la asesoría");
    } finally {
      setCargando(false);
    }
  }; 

  if (!alumno) { 
    return ( 
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#c2f0d5' }}> 
        <div className="text-center"> 
          <div className="spinner-border" role="status" style={{ color: '#10b981' }}></div> 
          <p className="mt-2 text-muted fw-bold">Cargando expediente del alumno...</p> 
        </div> 
      </div> 
    ); 
  } 

  return ( 
    <div className="min-vh-100" style={{ backgroundColor: '#c2f0d5', fontFamily: '"Afacad Flux", Helvetica' }}> 
      <div className="container py-4"> 
        
        {/* ENCABEZADO DE LA VISTA */}
        <div className="card shadow-sm border-0 rounded-4 bg-white p-2 mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <Link to="/alumnos" className="text-decoration-none text-dark d-inline-flex align-items-center mb-2 fw-medium" style={{ fontSize: '14px' }}>
                  <span className="me-2">←</span> Volver a Alumnos
                </Link>
                <h2 className="fw-bold mb-1 text-uppercase tracking-wide" style={{ color: '#000000', fontSize: '30px' }}>
                  Expediente Escolar
                </h2>
                <small className="text-success fw-semibold"> ● Portal Informativo Universitario </small>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* COLUMNA IZQUIERDA: INFORMACIÓN GENERAL Y DASHBOARDS */}
          <div className="col-12 col-lg-7 d-flex flex-column gap-4">
            
            {/* CARD: DATOS DEL ALUMNO */}
            <div className="card shadow-sm border-0 rounded-4 bg-white p-3"> 
              <div className="card-body"> 
                <h3 className="fw-bold mb-3 text-dark text-uppercase tracking-wide" style={{ fontSize: '22px' }}>
                  👨‍🎓 {alumno.nombre}
                </h3>
                <hr className="my-3" style={{ opacity: '0.15' }} />
                <div className="row g-3" style={{ fontSize: '16px', color: '#333333' }}>
                  <div className="col-6"><strong>Matrícula:</strong> {alumno.matricula}</div>
                  <div className="col-6"><strong>Grupo:</strong> {alumno.grupo}</div>
                  <div className="col-12"><strong>Carrera:</strong> {alumno.carrera}</div>
                  <div className="col-12"><strong>Correo:</strong> {alumno.correo}</div>
                  <div className="col-12"><strong>Teléfono:</strong> {alumno.telefono || "No registrado"}</div>
                </div>
              </div> 
            </div>

            {/* DASHBOARDS COMPLEMENTARIOS */}
            <div className="card shadow-sm border-0 rounded-4 bg-white p-3">
              <AlumnoDashboard alumno={alumno} asesorias={asesorias} /> 
            </div>

            <div className="card shadow-sm border-0 rounded-4 bg-white p-3">
              <AlumnoCharts asesorias={asesorias} /> 
            </div>

            <div className="card shadow-sm border-0 rounded-4 bg-white p-3">
              <HistorialAsesorias asesorias={asesorias} /> 
            </div>

            {/* CARD: TABLA DE HISTORIAL INTEGRADA */}
            <div className="card shadow-sm border-0 rounded-4 bg-white p-3"> 
              <div className="card-body p-0"> 
                <h4 className="fw-bold mb-3 text-uppercase tracking-wide" style={{ fontSize: '20px' }}>📚 Historial de Asesorías</h4> 
                {asesorias.length === 0 ? ( 
                  <p className="text-muted">Este alumno aún no tiene asesorías registradas.</p> 
                ) : ( 
                  <div className="table-responsive">
                    <table className="table table-hover align-middle"> 
                      <thead className="table-light"> 
                        <tr> 
                          <th>Motivo</th> 
                          <th>No.</th> 
                          <th>Detalle</th> 
                          <th>Fecha</th>
                        </tr> 
                      </thead> 
                      <tbody> 
                        {asesorias.map((asesoria) => ( 
                          <tr key={asesoria.id}> 
                            <td className="fw-semibold text-secondary">{asesoria.motivo}</td> 
                            <td><span className="badge bg-secondary rounded-pill">{asesoria.numeroAsesoria}</span></td> 
                            <td className="text-wrap" style={{ maxWidth: '250px' }}>{asesoria.detalle}</td> 
                            <td>{asesoria.fecha ? new Date(asesoria.fecha).toLocaleDateString() : '-'}</td>
                          </tr> 
                        ))} 
                      </tbody> 
                    </table> 
                  </div>
                )} 
              </div> 
            </div>

          </div>

          {/* COLUMNA DERECHA: REGISTRAR NUEVA ASESORÍA */}
          <div className="col-12 col-lg-5">
            <div className="position-sticky" style={{ top: "20px" }}>
              <div className="card shadow-sm border-0 rounded-4 bg-white p-3"> 
                <div className="card-body"> 
                  <h4 className="fw-bold mb-4 text-uppercase tracking-wide text-center" style={{ fontSize: '20px' }}>
                    📝 Nueva Asesoría
                  </h4> 

                  {/* FORMULARIO DE CAPTURA */}
                  <div className="mb-3"> 
                    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}> 
                      Motivo de la asesoría 
                    </label> 
                    <select 
                      className="form-select border-0 px-3 py-2 rounded-pill" 
                      style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }}
                      value={motivo} 
                      onChange={(e) => setMotivo(e.target.value)} 
                    > 
                      <option value="Remedial">Remedial</option> 
                      <option value="Extraordinario">Extraordinario</option> 
                      <option value="Asesoría Ordinaria">Asesoría Ordinaria</option> 
                    </select> 
                  </div> 

                  {/* CONTADOR DE NÚMERO DE ASESORÍA */}
                  <div className="mb-3"> 
                    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}> 
                      Número de asesoría 
                    </label> 
                    <div className="d-flex align-items-center justify-content-center p-2 rounded-pill" style={{ backgroundColor: '#c2f0d5', maxWidth: '180px', margin: '0 auto' }}> 
                      <button 
                        type="button"
                        className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center" 
                        onClick={() => setNumeroAsesoria(Math.max(1, numeroAsesoria - 1))} 
                        style={{ backgroundColor: '#11676A', color: 'white', width: '30px', height: '30px', border: 'none' }}
                      > - </button> 
                      <span className="mx-4 fw-bold" style={{ fontSize: "20px", color: '#11676A' }}> {numeroAsesoria} </span> 
                      <button 
                        type="button"
                        className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center" 
                        onClick={() => setNumeroAsesoria(numeroAsesoria + 1)} 
                        style={{ backgroundColor: '#11676A', color: 'white', width: '30px', height: '30px', border: 'none' }}
                      > + </button> 
                    </div> 
                  </div> 

                  {/* DETALLE / TEXTAREA */}
                  <div className="mb-4"> 
                    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}> 
                      Detalle de la asesoría 
                    </label> 
                    <textarea 
                      rows={5}
                      className="form-control border-0 px-3 py-3 rounded-4" 
                      style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500', resize: 'none' }} 
                      placeholder="Escriba los pormenores y acuerdos de la sesión académica..." 
                      value={detalle} 
                      onChange={(e) => setDetalle(e.target.value)} 
                    />
                  </div>

                  {/* BOTÓN GENERAR */}
                  <button 
                    className="btn text-white fw-bold rounded-pill border-0 py-2 w-100" 
                    onClick={registrarAsesoria} 
                    disabled={cargando}
                    style={{ backgroundColor: cargando ? '#6c757d' : '#00b159', fontSize: '16px', letterSpacing: '0.5px' }} 
                  >
                    {cargando ? "Generando..." : " Generar Reporte"}
                  </button> 
                </div> 
              </div> 
            </div>
          </div>
        </div> 
      </div> 
    </div> 
  );
} 

export default AlumnoDetalle;