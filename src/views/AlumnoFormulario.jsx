import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from "react-router-dom"; 
import { guardarAlumno, actualizarAlumno, obtenerAlumnoPorId } from '../services/AlumnoService'; 
import fondo_login from "./Imagenes/background_blur.png"; 

function FormularioAlumno({ usuario, datos }) { 
  const navigate = useNavigate(); 
  const [isEditing, setIsEditing] = useState(false); 
  const [editId, setEditId] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [showSuccess, setShowSuccess] = useState(false); 

  // 🌟 Estado con los 6 campos reales de tus asesorados
  const [formData, setFormData] = useState({ 
    nombre: '', 
    matricula: '', 
    carrera: '', 
    grupo: '', 
    correo: '', 
    telefono: '' 
  }); 

  const esAdminOAsesor = datos?.Rol === "Admin" || datos?.Rol === "Asesor"; 

  useEffect(() => { 
    if (!esAdminOAsesor) { 
      navigate('/alumnos'); 
    } 
  }, [esAdminOAsesor, navigate]); 

  useEffect(() => { 
    const alumnoId = localStorage.getItem("editarAlumnoId"); 
    if (alumnoId) { 
      cargarAlumnoParaEditar(alumnoId); 
    } 
  }, []); 

  const cargarAlumnoParaEditar = async (id) => { 
    try { 
      const alumno = await obtenerAlumnoPorId(id); 
      if (alumno) { 
        setFormData({ 
          nombre: alumno.nombre || '', 
          matricula: alumno.matricula || '', 
          carrera: alumno.carrera || '', 
          grupo: alumno.grupo || '', 
          correo: alumno.correo || '', 
          telefono: alumno.telefono || '' 
        }); 
        setIsEditing(true); 
        setEditId(id); 
      } 
      localStorage.removeItem("editarAlumnoId"); 
    } catch (error) { 
      console.error("Error al cargar alumno:", error); 
      setError("No se pudo cargar la información del asesorado"); 
    } 
  }; 

  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  }; 

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setError(""); 

    // 🌟 Validaciones obligatorias de campos vacíos
    if (!formData.nombre.trim()) return setError("El nombre completo es obligatorio"); 
    if (!formData.matricula.trim()) return setError("La matrícula es obligatoria"); 
    if (!formData.carrera.trim()) return setError("La carrera es obligatoria"); 
    if (!formData.grupo.trim()) return setError("El grupo es obligatorio"); 
    if (!formData.correo.trim()) return setError("El correo institucional es obligatorio"); 

    setLoading(true); 
    try { 
      if (isEditing && editId) { 
        // Llama a Firebase para actualizar
        await actualizarAlumno(editId, formData); 
      } else { 
        // Llama a Firebase para guardar nuevo
        await guardarAlumno(formData); 
      } 
      setShowSuccess(true); 
      setTimeout(() => { 
        navigate('/alumnos'); 
      }, 800); 
    } catch (err) { 
      console.error("Error al guardar:", err); 
      setError("Hubo un error al procesar el registro del alumno"); 
    } finally { 
      setLoading(false); 
    } 
  }; 

  if (!esAdminOAsesor) { 
    return ( 
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#c2f0d5' }}> 
        <div className="text-center"> 
          <div className="spinner-border" role="status" style={{ color: '#10b981' }}></div> 
          <p className="mt-2 text-muted">Redirigiendo...</p> 
        </div> 
      </div> 
    ); 
  } 

  return ( 
    <> 
      <section className="vh-100 w-100 position-fixed top-0 start-0" style={{ backgroundImage: `url(${fondo_login})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1 }} /> 
      
      <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center py-4" style={{ fontFamily: '"Afacad Flux", Helvetica' }}> 
        <div className="row justify-content-center w-100"> 
          {/* Se aumentó el tamaño a col-md-8 col-lg-6 para balancear los 6 inputs */}
          <div className="col-12 col-md-8 col-lg-6"> 
            <div className="card shadow-lg border-0 bg-white p-4" style={{ borderRadius: '2rem' }}> 
              <div className="card-body"> 
                
                <Link to="/alumnos" className="text-decoration-none text-dark d-inline-flex align-items-center mb-4 fw-medium" style={{ fontSize: '15px' }}> 
                  <span className="me-2" style={{ fontSize: '18px' }}>←</span> Volver a Gestión de Asesorados 
                </Link> 

                <h2 className="text-center fw-bold text-dark text-uppercase tracking-wide mb-1" style={{ fontSize: '26px' }}> 
                  {isEditing ? "Editar Asesorado" : "Registrar asesorado para su gestión"} 
                </h2> 
                
                <p className="text-center text-secondary mb-4 mx-auto" style={{ fontSize: '14px', maxWidth: '380px', lineHeight: '1.4' }}> 
                  {isEditing ? "Modifique los campos correspondientes para actualizar la ficha técnica del alumno." : "Por favor complete los campos para poder tener el registro de control del asesorado."} 
                </p> 

                {error && ( 
                  <div className="alert alert-danger py-2 rounded-3 text-center mb-3" style={{ fontSize: '14px' }}> 
                    {error} 
                  </div> 
                )} 
                {showSuccess && ( 
                  <div className="alert alert-success py-2 rounded-3 text-center mb-3" style={{ fontSize: '14px' }}> 
                    ¡Asesorado {isEditing ? "actualizado" : "guardado"} con éxito! Redirigiendo... 
                  </div> 
                )} 

                <form onSubmit={handleSubmit}> 
                  <div className="row">
                    
                    {/* NOMBRE COMPLETO */} 
                    <div className="col-12 mb-3"> 
                      <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}> 
                        Nombre Completo 
                      </label> 
                      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="form-control border-0 px-3 py-2 rounded-pill" style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }} placeholder="Ej: Juan Pérez Gómez" disabled={loading} /> 
                    </div> 

                    {/* MATRÍCULA */} 
                    <div className="col-12 col-sm-6 mb-3"> 
                      <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}> 
                        Matrícula 
                      </label> 
                      <input type="text" name="matricula" value={formData.matricula} onChange={handleChange} className="form-control border-0 px-3 py-2 rounded-pill" style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }} placeholder="Ej: TIC-000000" disabled={loading} /> 
                    </div> 

                    {/* GRUPO */} 
                    <div className="col-12 col-sm-6 mb-3"> 
                      <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}> 
                        Grupo 
                      </label> 
                      <input type="text" name="grupo" value={formData.grupo} onChange={handleChange} className="form-control border-0 px-3 py-2 rounded-pill" style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }} placeholder="Ej: TI-41M" disabled={loading} /> 
                    </div> 

                    {/* CARRERA */} 
                    <div className="col-12 mb-3"> 
                      <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}> 
                        Carrera / Programa Educativo 
                      </label> 
                      <input type="text" name="carrera" value={formData.carrera} onChange={handleChange} className="form-control border-0 px-3 py-2 rounded-pill" style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }} placeholder="Ej: Tecnologías de la Información" disabled={loading} /> 
                    </div> 

                    {/* CORREO INSTITUCIONAL */} 
                    <div className="col-12 mb-3"> 
                      <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}> 
                        Correo Electrónico 
                      </label> 
                      <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="form-control border-0 px-3 py-2 rounded-pill" style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }} placeholder="Ej: alu.23091044@utn.edu.mx" disabled={loading} /> 
                    </div> 

                    {/* TELÉFONO CELULAR */} 
                    <div className="col-12 mb-4"> 
                      <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}> 
                        Teléfono Celular (Opcional) 
                      </label> 
                      <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="form-control border-0 px-3 py-2 rounded-pill" style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }} placeholder="Ej: 5512345678" disabled={loading} /> 
                    </div> 

                  </div> 

                  {/* BOTÓN ENVIAR ACCIÓN */}
                  <div className="d-grid pt-2"> 
                    <button 
                      type="submit" 
                      className="btn text-white fw-semibold rounded-pill border-0 py-2" 
                      style={{ backgroundColor: loading ? '#6c757d' : '#00b96b', fontSize: '16px', letterSpacing: '0.5px' }} 
                      disabled={loading} 
                    >
                      {loading ? "Procesando..." : (isEditing ? "Guardar Cambios" : "Guardar asesorado")}
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

export default FormularioAlumno;