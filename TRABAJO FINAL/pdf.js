import jsPDF from "jspdf";
import { obtenerAsesorias } from "./asesoriaService";

export const generarReportePDF = async () => {
  const datos = await obtenerAsesorias();

  // 📄 VERTICAL
  const doc = new jsPDF({ orientation: "portrait" });

  // 🎨 COLORES
  const verde = [24, 135, 84];
  const grisClaro = [245, 245, 245];
  const negro = [0, 0, 0];

  // ========== HEADER ==========
  doc.setFillColor(...verde);
  doc.rect(0, 0, 210, 20, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("UNIVERSIDAD TECNOLÓGICA DE NAYARIT", 105, 10, { align: "center" });

  doc.setFontSize(10);
  doc.text("Registro de Asesorías", 105, 16, { align: "center" });

  // reset color
  doc.setTextColor(...negro);

  // ========== FECHA ==========
  const fecha = new Date().toLocaleDateString();
  doc.setFontSize(8);
  doc.text(`Fecha: ${fecha}`, 195, 25, { align: "right" });

  // ========== INFO ==========
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);

  doc.text("CARRERA:", 15, 30);
  doc.text("ASIGNATURA:", 15, 36);
  doc.text("DOCENTE:", 15, 42);

  doc.setFont("helvetica", "normal");

  // ========== TABLA ==========
  let startY = 55;

  // columnas adaptadas a vertical
  const colX = [15, 25, 90, 115, 135, 155, 175, 190];

  // encabezado
  doc.setFillColor(...verde);
  doc.rect(10, startY - 5, 190, 8, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);

  doc.text("N°", colX[0], startY);
  doc.text("ALUMNO", colX[1], startY);
  doc.text("GRUPO", colX[2], startY);
  doc.text("IND", colX[3], startY);
  doc.text("HORA", colX[4], startY);
  doc.text("GRUP", colX[5], startY);
  doc.text("H", colX[6], startY);
  doc.text("M", colX[7], startY);

  doc.setTextColor(...negro);

  // ========== FILAS ==========
  let y = startY + 8;

  datos.forEach((a, i) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    // zebra
    if (i % 2 === 0) {
      doc.setFillColor(...grisClaro);
      doc.rect(10, y - 4, 190, 6, "F");
    }

    doc.text(`${i + 1}`, colX[0], y);

    let nombre = a.alumno || "";
    if (nombre.length > 20) nombre = nombre.substring(0, 18) + "...";

    doc.text(nombre, colX[1], y);
    doc.text(a.grupo || "-", colX[2], y);
    doc.text(a.tipo === "individual" ? "X" : "", colX[3], y);
    doc.text(a.hora || "-", colX[4], y);
    doc.text(a.tipo === "grupal" ? "X" : "", colX[5], y);
    doc.text(a.sexo === "H" ? "X" : "", colX[6], y);
    doc.text(a.sexo === "M" ? "X" : "", colX[7], y);

    y += 6;

    // salto de página
    if (y > 270 && i < datos.length - 1) {
      doc.addPage();
      y = 30;
    }
  });

  // ========== FOOTER ==========
  let finalY = y + 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(`Total de registros: ${datos.length}`, 15, finalY);

  // línea firma
  doc.setLineWidth(0.3);
  doc.line(60, finalY + 10, 150, finalY + 10);

  doc.setFontSize(8);
  doc.text("Firma del alumno", 105, finalY + 15, { align: "center" });

  // ========== GUARDAR ==========
  doc.save(`Reporte_asesorias_${new Date().toISOString().slice(0, 10)}.pdf`);
};