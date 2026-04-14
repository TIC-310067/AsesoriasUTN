import { useEffect, useState } from "react";
import { getAnuncios } from "../services/firestoreServices";

function Tablon() {

  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Tablón de Anuncios";

    const cargarAnuncios = async () => {
      try {
        const data = await getAnuncios();
        setAnuncios(data);
      } catch (error) {
        console.error("Error al cargar anuncios:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarAnuncios();
  }, []);

  return (
    <div className="container mt-4">

      <h2 className="mb-4 text-center">📢 Tablón de Anuncios</h2>

      {/* ⏳ LOADING */}
      {loading ? (
        <p>Cargando anuncios...</p>
      ) : anuncios.length > 0 ? (

        <div className="row">
          {anuncios.map((anuncio) => (
            <div className="col-md-6 col-lg-4 mb-3" key={anuncio.id}>
              
              <div className="card shadow-sm h-100">
                <div className="card-body">

                  <h5 className="card-title">
                    {anuncio.titulo || "Sin título"}
                  </h5>

                  <p className="card-text">
                    {anuncio.descripcion || "Sin descripción"}
                  </p>

                  <small className="text-muted">
                    👤 {anuncio.autor || "Anónimo"}
                  </small>

                  <br />

                  <small className="text-muted">
                    🕒 {anuncio.fecha?.toDate?.().toLocaleString() || "Sin fecha"}
                  </small>

                </div>
              </div>

            </div>
          ))}
        </div>

      ) : (
        <p>No hay anuncios disponibles</p>
      )}

    </div>
  );
}

export default Tablon;
