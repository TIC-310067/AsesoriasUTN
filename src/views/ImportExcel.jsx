import { useState } from "react";
import UploadExcel from "../components/UploadExcel";
import PreviewTable from "../components/PreviewTable";
import ChartSelector from "../components/ChartSelector";
import { generarReporteExcel } from "../services/ReporteExcelService";
import { analizarDatos } from "../services/Statistics";
import { leerExcel } from "../services/ExcelService";
import Dashboard from "../components/Dashboard";
import ColumnSelector from "../components/ColumnSelector";
import { importarRegistros } from "../services/FirestoreImportService";
import DashboardBuilder from "../components/DashboardBuilder";
import { recomendarGraficas } from "../services/ChartRecommendationService";
import fondo_login from "./Imagenes/background_blur.png";

function ImportExcel() {
  const [graficas, setGraficas] = useState({
    promedio: true,
    maxmin: true,
    conteo: true,
    barras: false,
    pastel: false
  });
  const [archivo, setArchivo] = useState(null);
  const [orientacion, setOrientacion] = useState("vertical");
  const [datosExcel, setDatosExcel] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [configuracion, setConfiguracion] = useState([]);
  const [columnasSeleccionadas, setColumnasSeleccionadas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const recibirArchivo = async (file) => {
    setCargando(true);
    setMensaje("Cargando archivo...");
    try {
      setArchivo(file);
      const datos = await leerExcel(file, orientacion);
      setDatosExcel(datos);
      
      if (datos && datos.length > 0) {
        const sugerencias = recomendarGraficas(datos);
        setConfiguracion(sugerencias);
        setMensaje(`✅ Archivo cargado correctamente. ${datos.length} registros encontrados.`);
      } else {
        setMensaje("⚠️ El archivo no contiene datos válidos.");
      }
    } catch (error) {
      console.error("Error al leer el archivo:", error);
      setMensaje("❌ Error al leer el archivo. Verifica el formato.");
    } finally {
      setCargando(false);
    }
  };

  const analizar = () => {
    if (!datosExcel.length) {
      setMensaje("⚠️ No hay datos para analizar. Carga un archivo primero.");
      return;
    }
    setCargando(true);
    try {
      const resultado = analizarDatos(datosExcel);
      setEstadisticas(resultado);
      setMensaje("✅ Análisis completado exitosamente.");
    } catch (error) {
      console.error("Error al analizar datos:", error);
      setMensaje("❌ Error al analizar los datos.");
    } finally {
      setCargando(false);
    }
  };

  const handleImportar = async () => {
    if (!estadisticas) {
      setMensaje("⚠️ Primero debes analizar los datos.");
      return;
    }
    if (columnasSeleccionadas.length === 0) {
      setMensaje("⚠️ Selecciona al menos una columna para importar.");
      return;
    }
    setCargando(true);
    try {
      await importarRegistros(datosExcel, columnasSeleccionadas);
      setMensaje("✅ Importación realizada correctamente");
    } catch (error) {
      console.error("Error al importar:", error);
      setMensaje("❌ Error al importar los datos a Firestore.");
    } finally {
      setCargando(false);
    }
  };

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
      
      <div className="container min-vh-100 py-4" style={{ fontFamily: '"Afacad Flux", Helvetica' }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            
            {/* CABECERA */}
            <div className="card shadow-lg border-0 bg-white p-3 mb-4" style={{ borderRadius: '2rem' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <div>
                    <h2 className="fw-bold mb-1 text-uppercase tracking-wide" style={{ color: '#000000', fontSize: '30px' }}>
                      📥 Importar Excel
                    </h2>
                    <small className="text-success fw-semibold"> ● Portal Informativo Universitario </small>
                  </div>
                </div>
              </div>
            </div>

            {/* MENSAJES DE ESTADO */}
            {mensaje && (
              <div className={`alert ${mensaje.includes("✅") ? "alert-success" : mensaje.includes("❌") ? "alert-danger" : "alert-warning"} rounded-4 shadow-sm mb-4`} role="alert">
                {mensaje}
                <button type="button" className="btn-close" onClick={() => setMensaje("")}></button>
              </div>
            )}

            <div className="row g-4">
              {/* COLUMNA PRINCIPAL */}
              <div className="col-12 col-lg-7">
                
                {/* CARD: SUBIR ARCHIVO */}
                <div className="card shadow-lg border-0 bg-white p-3 mb-4" style={{ borderRadius: '2rem' }}>
                  <div className="card-body">
                    <h4 className="fw-bold mb-3 text-uppercase tracking-wide" style={{ fontSize: '18px' }}>
                      📂 Subir Archivo
                    </h4>
                    <UploadExcel onArchivoSeleccionado={recibirArchivo} />
                  </div>
                </div>

                {/* CARD: ORIENTACIÓN */}
                <div className="card shadow-lg border-0 bg-white p-3 mb-4" style={{ borderRadius: '2rem' }}>
                  <div className="card-body">
                    <h4 className="fw-bold mb-3 text-uppercase tracking-wide" style={{ fontSize: '18px' }}>
                      🔄 Orientación del archivo
                    </h4>
                    <div className="d-flex flex-wrap gap-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="orientacion"
                          value="vertical"
                          checked={orientacion === "vertical"}
                          onChange={(e) => setOrientacion(e.target.value)}
                          style={{ borderColor: '#10b981' }}
                        />
                        <label className="form-check-label fw-medium">
                          Vertical (cada fila es un registro)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="orientacion"
                          value="horizontal"
                          checked={orientacion === "horizontal"}
                          onChange={(e) => setOrientacion(e.target.value)}
                          style={{ borderColor: '#10b981' }}
                        />
                        <label className="form-check-label fw-medium">
                          Horizontal (cada columna es un registro)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* VISTA PREVIA */}
                {datosExcel.length > 0 && (
                  <div className="card shadow-lg border-0 bg-white p-3 mb-4" style={{ borderRadius: '2rem' }}>
                    <div className="card-body">
                      <h4 className="fw-bold mb-3 text-uppercase tracking-wide" style={{ fontSize: '18px' }}>
                        📊 Vista Previa
                      </h4>
                      <PreviewTable datos={datosExcel} />
                    </div>
                  </div>
                )}

                {/* SELECTOR DE COLUMNAS */}
                {datosExcel.length > 0 && (
                  <div className="card shadow-lg border-0 bg-white p-3 mb-4" style={{ borderRadius: '2rem' }}>
                    <div className="card-body">
                      <ColumnSelector
                        datos={datosExcel}
                        onSeleccionCambios={setColumnasSeleccionadas}
                      />
                    </div>
                  </div>
                )}

                {/* DASHBOARD BUILDER */}
                {datosExcel.length > 0 && (
                  <div className="card shadow-lg border-0 bg-white p-3 mb-4" style={{ borderRadius: '2rem' }}>
                    <div className="card-body">
                      <DashboardBuilder
                        datos={datosExcel}
                        onCambios={setConfiguracion}
                      />
                    </div>
                  </div>
                )}

                {/* SELECTOR DE GRÁFICAS */}
                {datosExcel.length > 0 && (
                  <div className="card shadow-lg border-0 bg-white p-3 mb-4" style={{ borderRadius: '2rem' }}>
                    <div className="card-body">
                      <ChartSelector
                        seleccion={graficas}
                        setSeleccion={setGraficas}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* COLUMNA DERECHA - ACCIONES */}
              <div className="col-12 col-lg-5">
                <div className="position-sticky" style={{ top: "20px" }}>
                  <div className="card shadow-lg border-0 bg-white p-3" style={{ borderRadius: '2rem' }}>
                    <div className="card-body">
                      <h4 className="fw-bold mb-4 text-uppercase tracking-wide text-center" style={{ fontSize: '18px' }}>
                        ⚡ Acciones
                      </h4>

                      <div className="d-grid gap-3">
                        <button
                          className="btn text-white fw-bold rounded-pill border-0 py-2"
                          disabled={!archivo || cargando}
                          onClick={analizar}
                          style={{ 
                            backgroundColor: cargando ? '#6c757d' : '#00b159',
                            fontSize: '16px',
                            letterSpacing: '0.5px'
                          }}
                        >
                          {cargando ? "Analizando..." : "🔍 Analizar Archivo"}
                        </button>
                        
                        <button
                          className="btn text-white fw-bold rounded-pill border-0 py-2"
                          disabled={!estadisticas || cargando}
                          onClick={handleImportar}
                          style={{ 
                            backgroundColor: cargando ? '#6c757d' : '#0d6efd',
                            fontSize: '16px',
                            letterSpacing: '0.5px'
                          }}
                        >
                          {cargando ? "Importando..." : "💾 Importar a Firestore"}
                        </button>

                        <button
                          className="btn btn-outline-secondary fw-bold rounded-pill border-2 py-2"
                          disabled={!datosExcel.length || cargando}
                          onClick={() => {
                            setDatosExcel([]);
                            setEstadisticas(null);
                            setArchivo(null);
                            setConfiguracion([]);
                            setColumnasSeleccionadas([]);
                            setMensaje("🗑️ Datos limpiados correctamente");
                          }}
                          style={{ fontSize: '16px' }}
                        >
                          🗑️ Limpiar Todo
                        </button>
                      </div>

                      {/* INFO ADICIONAL */}
                      {archivo && (
                        <div className="mt-4 p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                          <small className="text-muted d-block">
                            <strong>Archivo cargado:</strong> {archivo.name}
                          </small>
                          <small className="text-muted d-block">
                            <strong>Registros:</strong> {datosExcel.length}
                          </small>
                          {estadisticas && (
                            <small className="text-success d-block">
                              <strong>Estado:</strong> Análisis completado ✅
                            </small>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DASHBOARD */}
            {estadisticas && (
              <div className="mt-4">
                <div className="card shadow-lg border-0 bg-white p-3" style={{ borderRadius: '2rem' }}>
                  <div className="card-body">
                    <h4 className="fw-bold mb-3 text-uppercase tracking-wide" style={{ fontSize: '18px' }}>
                      📈 Dashboard
                    </h4>
                    <Dashboard
                      estadisticas={estadisticas}
                      configuracion={configuracion}
                      datos={datosExcel}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ImportExcel;