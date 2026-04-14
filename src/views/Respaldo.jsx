import { useEffect } from "react";
import { getUsuarios } from "../services/firestoreServices";
import { getLogs } from "../services/logService"; // 👈 ya lo hicimos antes
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";


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

    // 🔥 AQUÍ ESTÁ LA CLAVE
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

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      
      <div className="card shadow p-4 text-center" style={{ width: "400px" }}>
        
        <h3 className="mb-4">📦 Respaldo</h3>

        {/* BOTÓN JSON */}
        <button 
          className="btn btn-success mb-3"
          onClick={generarRespaldo}
        >
          Respaldo Local (JSON)
        </button>

        {/* BOTÓN PDF */}
        <button 
          className="btn btn-primary"
          onClick={generarPDF}
        >
          Generar PDF de Logs
        </button>

      </div>

    </div>
  );
}

export default Respaldo;