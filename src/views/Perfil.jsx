import { useEffect, useState } from "react";
import { getUserData } from "../services/userService";
import { logoutUser } from "../services/authService";
import { descargarBackup } from "../services/respaldo"; 
import { generarReporteAsesoriasPDF } from "../services/pdf";

function Perfil({ usuario }) {
  const [datos, setDatos] = useState(null);

  // LOGOUT
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

  // BACKUP (ADMIN)
  const handleBackup = async () => {
    try {
      await descargarBackup();
    } catch (error) {
      console.error("Error en crear el respaldo:", error);
    }
  };

  const handlePDF = async () => {
    try {
      await generarReporteAsesoriasPDF();
    } catch (error) {
      console.error("Error en PDF:", error);
    }
  };

  // TÍTULO
  useEffect(() => {
    document.title = "Perfil";
  }, []);

  // CARGAR DATOS
  useEffect(() => {
    const cargarDatos = async () => {
      if (usuario) {
        const data = await getUserData(usuario.uid);
        setDatos(data);
      }
    };

    cargarDatos();
  }, [usuario]);

  // Verificar si es Admin
  const esAdmin = datos?.Rol === "Admin" || datos?.Rol === "admin";

  return (
    <div className="max-vh-100 w-100 overflow-hidden" style={{ backgroundColor: '#c2f0d5', fontFamily: '"Afacad Flux", Helvetica' }}>

      
      
      {/* CONTENEDOR PRINCIPAL */}
      <div className="container-fluid px-0 w-100 min-vh-100 d-flex flex-column" style={{ backgroundColor: '#c2f0d5' }}>

           <div 
            className="row g-4 p-4 flex-grow-1" 
            style={{ 
              width: '100%',       
              margin: '0',
              borderRadius: '0px'
            }}
          >
          
          {/* COLUMNA IZQUIERDA*/}
          <div className="col-12 col-md-5 d-flex flex-column gap-4">
            
            
            <div className="bg-white rounded-4 overflow-hidden shadow-sm pb-4 position-relative ">
              
              {/* BANNER */}
                <img
                    src="https://i.pinimg.com/736x/ea/10/24/ea1024be13f32aa3bbccfe3e1f235f52.jpg"
                    alt="banner"
                    className="img-fluid img-thumbnail"
                    style={{ height: '150px', width: '100%', objectFit: 'cover', zIndex: 1, }}
                    />
              
              <div className="px-4 position-relative" style={{ marginTop: '-40px' }}>
                
                <div className="d-flex align-items-center flex-wrap gap-3 mb-3">
  
                      {/* Avatar circular */}
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="avatar"
                    className="img-fluid img-thumbnail rounded-circle border border-4 border-white"
                    style={{ width: '150px', height: '150px', objectFit: 'cover', zIndex: 1 }}
                    />

                    <div className="d-flex" style={{ zIndex: 1 }}>
                      
  
                    <button
                      type="button"
                      className="btn text-start" 
                      style={{ 
                        '--bs-btn-color': '#10b981',
                        '--bs-btn-border-color': '#10b981',
                        '--bs-btn-hover-bg': '#11676A',
                        '--bs-btn-hover-color': '#ffffff', 
                        marginTop: '15px',
                        marginRight: '10px'
                      }}
                    >
                      Editar Perfil
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm text-start"
                      onClick={handleLogout}
                      style={{ marginTop: '15px' }}
                    >
                      Cerrar sesión
                    </button>
  

                    </div>
                    </div>

                {/* INFO DE PERFIL */}
                <h3 className="mb-0 fw-bold text-dark text-uppercase tracking-wide" style={{ fontSize: '30px' }}>
                  {datos?.Nombre || "NOMBRE DE USUARIO"}
                </h3>
                <p className="text-secondary fw-medium mb-0 mt-1" style={{ fontSize: '20px' }}>
                  [{datos?.Rol || "ROL"}]
                </p>
              </div>
            </div>

            {/* Sobre Mí */}
            <div className="bg-white rounded-4 p-4 shadow-sm">
              <p className="fw-bold text-dark mb-3 tracking-wide" style={{ fontSize: '30px' }}>SOBRE MÍ</p>

              <p className="text-dark fw-semibold mb-2" style={{ fontSize: '20px' }}>
                Correo: <span className="fw-normal">{datos?.Correo || "[correo]"}</span>
              </p>
              <p className="fw-bold mb-0 mt-3" style={{ color: '#10b981', fontSize: '20px', fontFamily: '"Afacad Flux", Helvetica' }}>
                Universidad Tecnológica de Nayarit
              </p>
            </div>

          </div>

          {/* COLUMNA DERECHA*/}
          <div className="col-12 col-md-7">
            <div className="bg-white rounded-4 p-4 shadow-sm w-10 d-flex flex-column justify-content-between">
              
              <div>
                <h5 className="fw-bold text-dark text-center mb-3 tracking-wide" style={{ fontSize: '30px' }}>
                  ACTIVIDAD RECIENTE
                </h5>
                
                {/*Contadores Verdes */}

              <div className="d-flex justify-content-center gap-2 mb-4">
                  <div className="text-white text-center p-1 px-2 rounded-pill" style={{ backgroundColor: '#10b981', minWidth: '85px', fontSize: '15px',  }}>
                    <div className="fw-bold">0</div>
                    <div>Asesorías</div>
                  </div>
                  <div className="text-white text-center p-1 px-2 rounded-pill" style={{ backgroundColor: '#10b981', minWidth: '85px', fontSize: '15px' }}>
                    <div className="fw-bold">0</div>
                    <div>Reportes</div>
                  </div>
                  <div className="text-white text-center p-1 px-2 rounded-pill" style={{ backgroundColor: '#10b981', minWidth: '85px', fontSize: '15px' }}>
                    <div className="fw-bold">0</div>
                    <div>Seguimiento</div>
                  </div>
                </div>


                {/* ACTIVIDAD RECIENTE */}
                <div className="d-flex flex-column gap-3 mb-4">
                  <div className="rounded-3" style={{ backgroundColor: '#5c5c5c', height: '110px', width: '100%' }}></div>
                  <div className="rounded-3" style={{ backgroundColor: '#5c5c5c', height: '110px', width: '100%' }}></div>
                </div>
              </div>

              {/* BOTONES PRF Y JSON */}
              <div className="d-flex justify-content-between gap-3 align-items-center pt-2">
                <button 
                  onClick={handlePDF} 
                  className="btn text-white fw-semibold rounded-2 px-3 py-2 border-0" 
                  style={{ backgroundColor: '#0f766e', fontSize: '12px',      
                        fontSize: '15px',         
                        padding: '8px 10px',     
                        minWidth: '100px'
                   }} >
                  Generar reporte PDF
                </button>

                {esAdmin && (
                  <button 
                    onClick={handleBackup} 
                    className="btn text-white fw-semibold rounded-2 px-3 py-2 border-0" 
                        style={{ backgroundColor: '#10b981', fontSize: '12px',      
                        fontSize: '15px',         
                        padding: '8px 10px',     
                        minWidth: '100px'
                   }} >
                    Descargar Backup
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>
      </div></div>
  );
}

export default Perfil;
