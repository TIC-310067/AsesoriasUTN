import { useEffect } from "react";
import { getUsuarios } from "../services/firestoreServices";
import { getLogs } from "../services/logService"; 
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Reloj from '../routes/Reloj';


function Respaldo() {

  useEffect(() => {
    document.title = "Respaldo";
  }, []);

  // 🔹 GENERAR JSON
  const generarRespaldo = async () => {
    try {
      const usuarios = await getUsuarios();

      const dataStr = JSON.stringify(usuarios, null, 2);

      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "respaldo_usuarios.json";
      a.click();

      URL.revokeObjectURL(url);

      alert("Respaldo generado correctamente 🔥");

    } catch (error) {
      console.error(error);
      alert("Error al generar respaldo");
    }
  };

  // 🔹 GENERAR PDF
const generarPDF = async () => {
  try {
    const logs = await getLogs();

    if (!logs || logs.length === 0) {
      alert("No hay logs para generar el PDF");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Reporte de Logs del Sistema", 14, 15);

    const rows = logs.map((log, index) => {
      let fecha = "Sin fecha";

      if (log.fecha && typeof log.fecha.toDate === "function") {
        const f = log.fecha.toDate();
        fecha = f.toLocaleDateString() + " " + f.toLocaleTimeString();
      }

      return [
        index + 1,
        log.usuario || "N/A",
        log.descripcion || "N/A",
        fecha
      ];
    });

    
    autoTable(doc, {
      startY: 25,
      head: [["#", "Usuario", "Descripción", "Fecha y Hora"]],
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [40, 167, 69] }
    });

    doc.save("reporte_logs.pdf");

  } catch (error) {
    console.error("ERROR PDF:", error);
    alert("Error al generar PDF");
  }
};

//DISEÑO INICIA AQUÍ
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
                      Generación de respaldos
                    </h2>
                    <small className="text-success fw-semibold">
                      ● Portal Informativo Universitario
                    </small>
                  </div>

                </div>
              </div>
            </div>

            {/* SECCIÓN DE LISTADO */}
            <div className="card shadow-sm border-0 rounded-4 bg-white p-2 flex-grow-1">
              <div className="card-body">
                
                {/* Título de la sección en Mayúsculas */}
                <h3 className="fw-bold mb-4" style={{ color: '#000000', fontSize: '28px', fontFamily: '"Afacad Flux", Helvetica' }}>
                  ¡Descarga el respaldo que más te sea útil!
                </h3>

                <div className="container d-flex justify-content-center align-items-center" style={{ height: "20vh" }}>
                  
                <div className="d-flex flex-column gap-2" style={{ zIndex: 1 }}>
  
                  {/* BOTÓN JSON */}
                  <button 
                    className="btn w-100" 
                    onClick={generarRespaldo}
                    style={{ 
                        '--bs-btn-color': '#00b159',
                        '--bs-btn-border-color': '#00b159',
                        '--bs-btn-hover-bg': '#00b159',
                        '--bs-btn-hover-color': '#ffffff', 
                        marginTop: '15px',
                        fontSize: '24px',
                        padding: '20px, 20px',
                        fontFamily: '"Afacad Flux", Helvetica', 
                        letterSpacing: '0.5px', 
                        fontWeight: '800', 
                        whiteSpace: 'nowrap'
                      }}
                  >
                    Respaldo Local (JSON)
                  </button>

                  {/* BOTÓN PDF */}
                  <button 
                    className="btn w-100"
                    onClick={generarPDF}
                    style={{ 
                        '--bs-btn-color': '#11676A',
                        '--bs-btn-border-color': '#11676A',
                        '--bs-btn-hover-bg': '#11676A',
                        '--bs-btn-hover-color': '#ffffff', 
                        marginTop: '15px',
                        fontSize: '24px',
                        padding: '20px, 20px',
                        fontFamily: '"Afacad Flux", Helvetica', 
                        letterSpacing: '0.5px', 
                        fontWeight: '800', 
                        whiteSpace: 'nowrap'
                      }}
                  >
                    Generar PDF de Logs
                  </button>
                  
                </div> 
              </div> 
            </div> 
          </div> 
          </div> 
          {/* RELOJ */}
          <div className="col-12 col-md-5 col-lg-4">
            <div className="position-sticky" style={{ top: "20px" }}>
              <Reloj />
            </div>
          </div>

        </div> 
      </div> 
    </div> 
    
  );
};


export default Respaldo;
