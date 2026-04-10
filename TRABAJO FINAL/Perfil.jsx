import { useEffect, useState } from "react";
import { getUserData } from "../services/userService";
import { logoutUser } from "../services/authService";

// 🔥 NUEVOS IMPORTS
import { descargarBackup } from "../services/respaldo"; 
import { generarReportePDF } from "../services/pdf";

function Perfil({ usuario }) {

  const [datos, setDatos] = useState(null);

  // 🔐 LOGOUT
  const handleLogout = async () => {
    const confirmar = window.confirm("¿Estás seguro de cerrar sesión?");
    if (confirmar) {
      try {
        await logoutUser();
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }
  };

  // 💾 BACKUP (ADMIN)
  const handleBackup = async () => {
    try {
      await descargarBackup();
    } catch (error) {
      console.error("Error en crear el respaldo:", error);
    }
  };

  // 📄 PDF (TODOS)
  const handlePDF = async () => {
    try {
      await generarReportePDF();
    } catch (error) {
      console.error("Error en PDF:", error);
    }
  };

  // 🧠 TÍTULO
  useEffect(() => {
    document.title = "Mi Perfil";
  }, []);

  // 👤 CARGAR DATOS
  useEffect(() => {
    const cargarDatos = async () => {
      if (usuario) {
        const data = await getUserData(usuario.uid);
        setDatos(data);
      }
    };

    cargarDatos();
  }, [usuario]);

  return (
    <div>
      <section className="h-100" style={{ backgroundColor: '#619a64' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center">
            <div className="col col-lg-9 col-xl-8">

              <div className="card">

                {/* HEADER */}
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: '#000', height: '200px' }}
                >

                  {/* FOTO + BOTONES */}
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: '150px' }}
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="avatar"
                      className="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: '150px', zIndex: 1 }}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-dark text-body"
                      style={{ zIndex: 1 }}
                    >
                      Editar Perfil
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger text-body"
                      style={{ zIndex: 1 }}
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>

                  {/* NOMBRE */}
                  <div className="ms-3" style={{ marginTop: '130px' }}>
                    <h5>{datos?.Nombre}</h5>
                    <p>{datos?.Rol}</p>
                  </div>

                </div>

                {/* ESTADÍSTICAS + BOTONES */}
                <div className="p-4 text-black bg-light">

                  <div className="d-flex justify-content-end text-center py-1 text-body">
                    <div>
                      <p className="mb-1 h5">0</p>
                      <p className="small text-muted mb-0">Asesorías</p>
                    </div>

                    <div className="px-3">
                      <p className="mb-1 h5">0</p>
                      <p className="small text-muted mb-0">Reportes</p>
                    </div>

                    <div>
                      <p className="mb-1 h5">0</p>
                      <p className="small text-muted mb-0">Seguimiento</p>
                    </div>
                  </div>

                  {/* 🔥 BOTONES NUEVOS */}
                  <div className="mt-3 d-flex gap-2">

                    {/* TODOS */}
                    <button
                      className="btn btn-primary"
                      onClick={handlePDF}
                    >
                      Generar Reporte PDF
                    </button>

                    {/* SOLO ADMIN */}
                    {datos?.Rol === "admin" && (
                      <button
                        className="btn btn-success"
                        onClick={handleBackup}
                      >
                        Descargar Backup
                      </button>
                    )}

                  </div>

                </div>

                {/* INFO */}
                <div className="card-body p-4 text-black">

                  <div className="mb-5 text-body">
                    <p className="lead fw-normal mb-1">Sobre mí</p>

                    <div className="p-4 bg-light">
                      <p className="mb-1">Rol: {datos?.Rol}</p>
                      <p className="mb-1">Correo: {datos?.Correo}</p>
                      <p className="mb-0">Universidad Tecnológica de Nayarit</p>
                    </div>
                  </div>

                  {/* ACTIVIDAD */}
                  <div className="d-flex justify-content-between align-items-center mb-4 text-body">
                    <p className="lead fw-normal mb-0">Actividad reciente</p>
                  </div>

                  <div className="row g-2">
                    <div className="col mb-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                        alt="img1"
                        className="w-100 rounded-3"
                      />
                    </div>
                    <div className="col mb-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                        alt="img2"
                        className="w-100 rounded-3"
                      />
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Perfil;