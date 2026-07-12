import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { crearAnuncio, actualizarAnuncio, getAnuncioPorId } from '../services/anunciosService';
import fondo_login from "./Imagenes/background_blur.png"; 

function Formulario({ usuario, datos }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    materia: '',
    descripcion: ''
  });

  const esAdminOAsesor = datos?.Rol === "Admin" || datos?.Rol === "Asesor";

  useEffect(() => {
    if (!esAdminOAsesor) {
      navigate('/tablon');
    }
  }, [esAdminOAsesor, navigate]);

  useEffect(() => {
    const anuncioId = localStorage.getItem("editarAnuncioId");
    if (anuncioId) {
      cargarAnuncioParaEditar(anuncioId);
    }
  }, []);

  const cargarAnuncioParaEditar = async (id) => {
    try {
      const anuncio = await getAnuncioPorId(id);
      if (anuncio) {
        setFormData({
          titulo: anuncio.titulo,
          materia: anuncio.materia,
          descripcion: anuncio.descripcion
        });
        setIsEditing(true);
        setEditId(id);
      }
      localStorage.removeItem("editarAnuncioId");
    } catch (error) {
      console.error("Error al cargar anuncio:", error);
      setError("No se pudo cargar el anuncio para editar");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.titulo.trim()) {
      setError("El asunto del aviso es obligatorio");
      return;
    }
    if (!formData.materia.trim()) {
      setError("La materia/área es obligatoria");
      return;
    }
    if (!formData.descripcion.trim()) {
      setError("La descripción es obligatoria");
      return;
    }

    setLoading(true);

    try {
      if (isEditing && editId) {
        await actualizarAnuncio(editId, formData);
      } else {
        await crearAnuncio(formData, usuario, datos);
      }
      
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/tablon');
      }, 800);
      
    } catch (err) {
      console.error("Error al guardar:", err);
      setError("Hubo un error al guardar el anuncio");
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

            <div className="card shadow-lg border-0 bg-white p-4" style={{ borderRadius: '2rem' }}>
              <div className="card-body">

                <Link to="/tablon" className="text-decoration-none text-dark d-inline-flex align-items-center mb-4 fw-medium" style={{ fontSize: '15px' }}>
                  <span className="me-2" style={{ fontSize: '18px' }}>←</span> Volver al tablón
                </Link>

                <h2 className="text-center fw-bold text-dark text-uppercase tracking-wide mb-1" style={{ fontSize: '26px' }}>
                  {isEditing ? "Editar Anuncio" : "Crear un nuevo anuncio"}
                </h2>
                <p className="text-center text-secondary mb-4 mx-auto" style={{ fontSize: '14px', maxWidth: '340px', lineHeight: '1.4' }}>
                  {isEditing 
                    ? "Modifique los campos correspondientes para actualizar la información en el tablón." 
                    : "Por favor complete los campos para poder publicar el anuncio en el tablón."}
                </p>

                {error && (
                  <div className="alert alert-danger py-2 rounded-3 text-center mb-3" style={{ fontSize: '14px' }}>
                    {error}
                  </div>
                )}

                {showSuccess && (
                  <div className="alert alert-success py-2 rounded-3 text-center mb-3" style={{ fontSize: '14px' }}>
                    ¡Anuncio {isEditing ? "actualizado" : "guardado"} con éxito! Redirigiendo...
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
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleChange}
                      className="form-control border-0 px-3 py-2 rounded-pill"
                      style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }}
                      placeholder="Ej: Examen extraordinario"
                      disabled={loading}
                    />
                  </div>

                  {/* MATERIA / ÁREA */}
                  <div className="mb-3">
                    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}>
                      Materia / Área
                    </label>
                    <input 
                      type="text" 
                      name="materia"
                      value={formData.materia}
                      onChange={handleChange}
                      className="form-control border-0 px-3 py-2 rounded-pill"
                      style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }}
                      placeholder="Ej: Administración de base de datos"
                      disabled={loading}
                    />
                  </div>

                  {/* DESCRIPCIÓN DETALLADA */}
                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}>
                      Descripción detallada
                    </label>
                    <textarea 
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleChange}
                      className="form-control border-0 px-3 py-3 rounded-4"
                      style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500', resize: 'none', minHeight: '130px' }}
                      placeholder="Escriba aquí los detalles del anuncio"
                      disabled={loading}
                    ></textarea>
                  </div>

                  {/* BOTÓN SUBMIT */}
                  <div className="d-grid pt-2">
                    <button 
                      type="submit" 
                      className="btn text-white fw-semibold rounded-pill border-0 py-2"
                      style={{ backgroundColor: loading ? '#6c757d' : '#00b96b', fontSize: '16px', letterSpacing: '0.5px' }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Procesando...
                        </>
                      ) : (
                        isEditing ? "Actualizar Anuncio" : "Publicar Anuncio"
                      )}
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

export default Formulario;
