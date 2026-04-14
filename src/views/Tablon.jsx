import React, { useState, useEffect } from 'react';
import { getAnuncios, eliminarAnuncio } from '../services/anunciosService';
import { Link, useNavigate } from "react-router-dom";
import Reloj from '../routes/Reloj';

const Tablon = ({ usuario, datos }) => {
  const navigate = useNavigate();
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eliminando, setEliminando] = useState(null);

  // Verificar si el usuario es Admin o Asesor
  const esAdminOAsesor = datos?.Rol === "Admin" || datos?.Rol === "asesor";

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

  // Función EDITAR - Guarda el ID en localStorage y navega al formulario
  const handleEditar = (id) => {
    console.log("Editar anuncio:", id);
    localStorage.setItem("editarAnuncioId", id);
    navigate("/formulario");
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-4">
        <div className="row g-4">
          {/* Anuncios */}
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4 border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h2 className="fw-bold mb-1">Tablón de Anuncios</h2>
                    <small className="text-success fw-semibold">
                      ● Portal Informativo Universitario
                    </small>
                  </div>
                  {/* Botón SUBIR - Solo visible para Admin y Asesor */}
                  {esAdminOAsesor && (
                    <Link to="/formulario">
                      <button className="btn btn-success px-4">
                        <i className="bi bi-plus-circle me-2"></i>
                        Subir Anuncio
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="card shadow border-0">
              <div className="card-body">
                <h5 className="fw-bold mb-4">
                  <i className="bi bi-collection-fill text-success me-2"></i>
                  Anuncios Recientes
                </h5>
                
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-success" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mt-2 text-muted">Cargando anuncios...</p>
                  </div>
                ) : anuncios.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <i className="fa-solid fa-cat fs-1"></i>
                    <p className="mt-2">Por el momento no hay anuncios</p>
                  </div>
                ) : (
                  anuncios.map((anuncio) => (
                    <div 
                      key={anuncio.id} 
                      className="border-start border-4 border-success p-3 mb-3 rounded bg-white shadow-sm"
                    >
                      <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                        <span className="badge bg-success px-3 py-2">
                          {anuncio.materia || "General"}
                        </span>
                        <small className="text-muted">
                          <i className="bi bi-clock me-1"></i>
                          {anuncio.fecha || "Sin fecha"}
                        </small>
                      </div>
                      
                      <h5 className="fw-bold mt-2 mb-2">{anuncio.titulo}</h5>
                      <p className="mb-2 text-secondary">{anuncio.descripcion}</p>
                      
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <small className="text-muted">
                          <i className="bi bi-person me-1"></i>
                          Publicado por: {anuncio.autor || "Admin"}
                        </small>
                        
                        {/* Botones EDITAR y ELIMINAR - Solo visibles para Admin y Asesor */}
                        {esAdminOAsesor && (
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => handleEditar(anuncio.id)}
                              className="btn btn-sm btn-outline-success"
                            >
                              <i className="bi bi-pencil me-1"></i>
                              Editar
                            </button>
                            <button
                              onClick={() => handleEliminar(anuncio.id)}
                              className="btn btn-sm btn-outline-danger"
                              disabled={eliminando === anuncio.id}
                            >
                              {eliminando === anuncio.id ? (
                                <span className="spinner-border spinner-border-sm me-1"></span>
                              ) : (
                                <i className="bi bi-trash3 me-1"></i>
                              )}
                              Eliminar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Reloj */}
          <div className="col-lg-4">
            <div className="position-sticky" style={{ top: "20px" }}>
              <Reloj />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tablon;