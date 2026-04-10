import { useState } from "react";
import { createAnuncio } from "../services/firestoreServices";
import { serverTimestamp } from "firebase/firestore";
import { crearLog } from "../services/logService";

function CrearAnuncio({ usuario, datos }) {

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ VALIDACIÓN
    if (!titulo || !descripcion) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // 🔥 CONFIRMACIÓN
    const confirmacion = window.confirm("¿Publicar anuncio?");
    if (!confirmacion) return;

    try {
      const nuevoAnuncio = {
        titulo,
        descripcion,
        autor: datos?.Nombre || "Anónimo",
        idUsuario: usuario?.uid,
        fecha: serverTimestamp()
      };

      await createAnuncio(nuevoAnuncio);

      alert("Anuncio publicado 🔥");

      // 🔥 LOG
        await crearLog({
          usuario: "Admin",
          accion: "CREAR_ANUNCIO",
          descripcion: `Se publicó el anuncio: ${titulo}`
        });
      // 🧹 LIMPIAR
      setTitulo("");
      setDescripcion("");
      setError("");

    } catch (err) {
      console.error(err);
      setError("Error al crear anuncio");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4 text-center">➕ Crear Anuncio</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow-sm">
            <div className="card-body">

              <form onSubmit={handleSubmit}>

                {/* TITULO */}
                <div className="mb-3">
                  <label className="form-label">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </div>

                {/* DESCRIPCIÓN */}
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  ></textarea>
                </div>

                {/* ERROR */}
                {error && (
                  <p style={{ color: "red" }}>{error}</p>
                )}

                {/* BOTÓN */}
                <div className="d-grid">
                  <button className="btn btn-primary">
                    Publicar
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default CrearAnuncio;