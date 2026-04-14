import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { crearAnuncio, actualizarAnuncio, getAnuncioPorId } from '../services/anunciosService';

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

  // Verificar si el usuario es Admin o Asesor, si no, redirigir
  const esAdminOAsesor = datos?.Rol === "Admin" || datos?.Rol === "asesor";

  useEffect(() => {
    // Si no es Admin ni Asesor, redirigir al tablón
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
        console.log("Anuncio actualizado:", editId);
      } else {
        await crearAnuncio(formData, usuario, datos);
        console.log("Nuevo anuncio creado");
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

  // Si no es Admin/Asesor, mostrar mensaje de carga mientras redirige
  if (!esAdminOAsesor) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="text-center">
          <div className="spinner-border text-success" role="status"></div>
          <p className="mt-2 text-muted">Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4" style={{ backgroundColor: '#f1f5f9' }}>
      <div className="w-100" style={{ maxWidth: '700px' }}>
        <Link to="/tablon" className="text-decoration-none text-muted small fw-bold mb-3 d-inline-block">
          <i className="bi bi-arrow-left me-1"></i> VOLVER AL TABLÓN
        </Link>

        <div className="card shadow-lg border-0 overflow-hidden" style={{ borderTop: '6px solid #00BF63', borderRadius: '1.5rem' }}>
          <div className="card-body p-4 p-md-5">
            <h1 className="h2 fw-bold text-black mb-1">{isEditing ? "Editar Anuncio" : "Nuevo Anuncio"}</h1>
            <p className="text-muted mb-4">
              {isEditing 
                ? "¿Desea modificar algo?" 
                : "Por favor complete los campos para poder publicar el anuncio en el tablón."}
            </p>

            {error && (
              <div className="alert alert-danger mb-4" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
              </div>
            )}

            {showSuccess && (
              <div className="alert alert-success mb-4" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                ¡Anuncio {isEditing ? "actualizado" : "guardado"} con éxito! Redirigiendo...
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold text-black text-uppercase small tracking-wider">Asunto del Aviso</label>
                <input 
                  type="text" 
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="form-control form-control-lg rounded-3"
                  style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
                  placeholder="Ej: Examen Extraordinario"
                  disabled={loading}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold text-black text-uppercase small tracking-wider">Materia / Área</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 rounded-start-3" style={{ backgroundColor: '#f8fafc' }}>
                    <i className="bi bi-journal-bookmark text-muted"></i>
                  </span>
                  <input 
                    type="text" 
                    name="materia"
                    value={formData.materia}
                    onChange={handleChange}
                    className="form-control form-control-lg rounded-end-3"
                    style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
                    placeholder="Ej: Administración de Base de Datos"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold text-black text-uppercase small tracking-wider">Descripción Detallada</label>
                <textarea 
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="form-control rounded-3"
                  style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0', minHeight: '150px' }}
                  placeholder="Escribe aquí los detalles del anuncio..."
                  disabled={loading}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn w-100 text-white fw-bold py-3 rounded-3 mt-2"
                style={{ backgroundColor: loading ? '#6c757d' : '#00BF63', border: 'none' }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Procesando envío...
                  </>
                ) : (
                  <>
                    <i className={`bi ${isEditing ? 'bi-pencil-fill' : 'bi-send-fill'} me-2`}></i>
                    {isEditing ? "Actualizar Anuncio" : "Publicar Anuncio"}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Formulario;