import { useNavigate } from "react-router-dom";
import Reloj from '../routes/Reloj';

function AnalysisHome() {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#c2f0d5', fontFamily: '"Afacad Flux", Helvetica' }}>
      <div className="container py-4">
        <div className="row g-4">
          
          {/* COLUMNA PRINCIPAL DE CONTENIDO */}
          <div className="col-12 col-md-7 col-lg-8 d-flex flex-column gap-4">
            
            {/* CABECERA DEL MÓDULO */}
            <div className="card shadow-sm border-0 rounded-4 bg-white p-2">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h2 className="fw-bold mb-1 text-uppercase tracking-wide" style={{ color: '#000000', fontSize: '32px' }}>
                      Reportes y Análisis
                    </h2>
                    <small className="text-success fw-semibold"> ● Portal Informativo Universitario </small>
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN DE MÓDULOS / TARJETAS */}
            <div className="card shadow-sm border-0 rounded-4 bg-white p-2 flex-grow-1">
              <div className="card-body">
                {/* Título de la sección en Mayúsculas */}
                <h3 className="fw-bold mb-4" style={{ color: '#000000', fontSize: '28px', fontFamily: '"Afacad Flux", Helvetica' }}>
                  ¡Selecciona la herramienta que deseas utilizar!
                </h3>

                {/* Grid Responsivo para las opciones de análisis */}
                <div className="row g-4 mt-2">
                  
                  {/* BOTÓN / TARJETA: ANALIZAR EXCEL */}
                  <div className="col-12 col-sm-6">
                    <div className="d-flex flex-column gap-2" style={{ zIndex: 1 }}>
                      <p className="text-secondary mb-1 fw-medium" style={{ fontSize: '16px' }}>
                        Sube archivos Excel y visualiza gráficas de rendimiento.
                      </p>
                      <button 
                        className="btn w-100" 
                        onClick={() => navigate("/analysis/import")}
                        style={{ 
                          '--bs-btn-color': '#00b159', 
                          '--bs-btn-border-color': '#00b159', 
                          '--bs-btn-hover-bg': '#00b159', 
                          '--bs-btn-hover-color': '#ffffff', 
                          fontSize: '22px', 
                          padding: '15px 10px', 
                          fontFamily: '"Afacad Flux", Helvetica', 
                          letterSpacing: '0.5px', 
                          fontWeight: '800', 
                          whiteSpace: 'nowrap' 
                        }}
                      >
                        Analizar Excel (CSV)
                      </button>
                    </div>
                  </div>

                  {/* BOTÓN / TARJETA: CREAR REPORTE */}
                  <div className="col-12 col-sm-6">
                    <div className="d-flex flex-column gap-2" style={{ zIndex: 1 }}>
                      <p className="text-secondary mb-1 fw-medium" style={{ fontSize: '16px' }}>
                        Captura datos de asesorías y genera descargas manuales.
                      </p>
                      <button 
                        className="btn w-100" 
                        onClick={() => navigate("/alumnos")}
                        style={{ 
                          '--bs-btn-color': '#11676A', 
                          '--bs-btn-border-color': '#11676A', 
                          '--bs-btn-hover-bg': '#11676A', 
                          '--bs-btn-hover-color': '#ffffff', 
                          fontSize: '22px', 
                          padding: '15px 10px', 
                          fontFamily: '"Afacad Flux", Helvetica', 
                          letterSpacing: '0.5px', 
                          fontWeight: '800', 
                          whiteSpace: 'nowrap' 
                        }}
                      >
                        Lista de Alumnos
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* COLUMNA DEL RELOJ */}
          <div className="col-12 col-md-5 col-lg-4">
            <div className="position-sticky" style={{ top: "20px" }}>
              <Reloj />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AnalysisHome;
