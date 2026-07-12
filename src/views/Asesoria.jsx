import React, { useState, useEffect } from 'react';
import { getAnuncios, eliminarAnuncio } from '../services/anunciosService';
import { Link, useNavigate } from "react-router-dom";
import Reloj from '../routes/Reloj';

const Asesoria = ({ usuario, datos }) => {
  const navigate = useNavigate();
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eliminando, setEliminando] = useState(null);

  const esAdminOAsesor = datos?.Rol === "Admin" || datos?.Rol === "Asesor";

  useEffect(() => {
    cargarAnuncios();
  }, []);

  const cargarAnuncios = async () => {
    setLoading(true);
    try {
      const anunciosGuardados = await getAnuncios();
      setAnuncios(anunciosGuardados);
    } catch (error) {
      console.error("Error al cargar anuncios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Deseas eliminar este anuncio?")) return;
    
    setEliminando(id);
    try {
      await eliminarAnuncio(id);
      await cargarAnuncios();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar el anuncio");
    } finally {
      setEliminando(null);
    }
  };

  const handleEditar = (id) => {
    localStorage.setItem("editarAnuncioId", id);
    navigate("/formulario");
  };


  //EMPIEZA EL DISEÑO HTML
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#c2f0d5', fontFamily: '"Afacad Flux", Helvetica' }}>
      <div className="container py-4">
        <div className="row g-4">

          {/* COLUMNA DE ANUNCIOS */}
          <div className="col-12 col-md-7 col-lg-8 d-flex flex-column gap-4">
            
            {/* CABECERA DEL TABLÓN */}
            <div className="card shadow-sm border-0 rounded-4 bg-white p-2">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h2 className="fw-bold mb-1 text-uppercase tracking-wide" style={{ color: '#000000', fontSize: '32px' }}>
                      Tablón de Asesorías
                    </h2>
                    <small className="text-success fw-semibold">
                      ● Portal Informativo Universitario
                    </small>
                  </div>

                  {/* BOTÓN SUBIR ASESORIA */}
                  {esAdminOAsesor && (
                    <Link to="/CrearAsesoria" className="text-decoration-none">
                      <button 
                        className="btn text-white rounded-pill border-0 px-3 py-2 fw-semibold d-flex align-items-center" 
                        style={{ backgroundColor: '#10b981', fontSize: '14px' }}
                      >
                        <span className="me-1">+</span> Subir asesoría
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* SECCIÓN DE LISTADO */}
            <div className="card shadow-sm border-0 rounded-4 bg-white p-2 flex-grow-1">
              <div className="card-body">
                
                {/* Título de la sección en Mayúsculas */}
                <h3 className="fw-bold mb-4" style={{ color: '#000000', fontSize: '28px', fontFamily: '"Afacad Flux", Helvetica' }}>
                  Anuncios Recientes
                </h3>
                
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border" role="status" style={{ color: '#10b981' }}>
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-2 text-muted">Cargando anuncios...</p>
                  </div>
                ) : anuncios.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <p className="mt-2">Por el momento no hay anuncios</p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {anuncios.map((anuncio) => (
                      <div 
                        key={anuncio.id} 
                        className="p-4 rounded-3 bg-white border shadow-sm"
                        style={{ borderColor: '#e2e8f0' }}
                      >
                        {/* Cabecera interna del Anuncio */}
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
                          <span 
                            className="badge text-white px-3 py-2 rounded-2 fw-semibold" 
                            style={{ backgroundColor: '#10b981', letterSpacing: '1px', fontSize: '14px' }}
                          >
                            {anuncio.materia || "General"}
                          </span>
                          
                          <small className="text-secondary fw-medium" style={{ fontSize: '14px' }}>
                            {anuncio.fecha || "Sin fecha"}
                          </small>
                        </div>
                        
                        {/* Contenido */}
                        <h4 className="fw-bold mb-2 text-dark" style={{ fontSize: '22px' }}>{anuncio.titulo}</h4>
                        <p className="text-secondary mb-3" style={{ fontSize: '16px', lineHeight: '1.5' }}>{anuncio.descripcion}</p>
                        
                        {/* Pie del Anuncio y Botones de Control */}
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 pt-2 border-top" style={{ borderColor: '#f1f5f9' }}>
                          <small className="text-secondary fw-medium" style={{ fontSize: '14px' }}>
                            Publicado por: {anuncio.autor || "Admin"}
                          </small>
                          
                          {/* Botones*/}
                          {esAdminOAsesor && (
                            <div className="d-flex gap-2">
                              <button
                                onClick={() => handleEditar(anuncio.id)}
                                className="btn btn-sm fw-medium px-3 rounded-2"
                                style={{
                              '--bs-btn-color': '#10b981',
                              '--bs-btn-border-color': '#10b981',
                              '--bs-btn-hover-bg': '#11676A',
                              '--bs-btn-hover-color': '#ffffff', 
                                }}>
                                Editar
                              </button>


                              <button
                                onClick={() => handleEliminar(anuncio.id)}
                                className="btn btn-sm fw-medium px-3 rounded-2"
                                disabled={eliminando === anuncio.id}
                                style={{ 
                                  '--bs-btn-color': '#ef4444',
                                  '--bs-btn-border-color': '#ef4444',
                                  '--bs-btn-hover-bg': '#ef4444',
                                  '--bs-btn-hover-color': '#ffffff', 
                                }}
                              >
                                {eliminando === anuncio.id ? (
                                  <span className="spinner-border spinner-border-sm"></span>
                                ) : (
                                  "Eliminar"
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* RELOJ */}
          <div className="col-12 col-md-7 col-lg-4">
            <div className="position-sticky" style={{ top: "20px" }}>
              <Reloj />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Asesoria;
