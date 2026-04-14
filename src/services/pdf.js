import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import { obtenerAsesorias } from "./asesoriaService";
import { getAnuncios } from "./anunciosService";
import { getUsuarios } from "./firestoreServices";

// ========== CONFIGURACIÓN GENERAL ==========
const getFechaHora = () => {
  const ahora = new Date();
  return {
    fecha: ahora.toLocaleDateString(),
    hora: ahora.toLocaleTimeString(),
    timestamp: ahora.toISOString()
  };
};

const headerInstitucional = (doc, titulo) => {
  const verde = [24, 135, 84];
  
  doc.setFillColor(...verde);
  doc.rect(0, 0, 210, 20, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("UNIVERSIDAD TECNOLÓGICA DE NAYARIT", 105, 10, { align: "center" });
  
  doc.setFontSize(10);
  doc.text(titulo, 105, 16, { align: "center" });
  
  doc.setTextColor(0, 0, 0);
};

const footerPagina = (doc) => {
  const pageNumber = doc.internal.getNumberOfPages();
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text(`Página ${pageNumber}`, 105, doc.internal.pageSize.height - 10, { align: "center" });
};

// ========== REPORTE DE ASESORÍAS ==========
export const generarReporteAsesoriasPDF = async () => {
  try {
    const datos = await obtenerAsesorias();
    const { fecha, hora } = getFechaHora();
    
    const doc = new jsPDF({ orientation: "portrait" });
    
    headerInstitucional(doc, "Registro de Asesorías");
    
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Fecha: ${fecha}`, 195, 25, { align: "right" });
    doc.text(`Hora: ${hora}`, 195, 30, { align: "right" });
    
    const tableData = datos.map((a, i) => [
      i + 1,
      a.alumno || "Sin nombre",
      a.grupo || "-",
      a.tipo === "individual" ? "Individual" : "Grupal",
      a.hora || "-",
      a.sexo === "H" ? "✓" : "",
      a.sexo === "M" ? "✓" : ""
    ]);
    
    // 👈 Usar autoTable directamente
    autoTable(doc, {
      startY: 40,
      head: [["N°", "NOMBRE DEL ALUMNO", "GRUPO", "TIPO", "HORARIO", "H", "M"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [24, 135, 84], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 10, right: 10 }
    });
    
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setLineWidth(0.3);
    doc.line(60, finalY, 150, finalY);
    doc.setFontSize(8);
  doc.text("Firma del alumno", 105, finalY + 5, { align: "center" });
    
    footerPagina(doc);
    doc.save(`Reporte_asesorias_${fecha.replace(/\//g, '-')}.pdf`);
    
    return { success: true, mensaje: "Reporte de asesorías generado" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, mensaje: error.message };
  }
};

// ========== REPORTE DE ANUNCIOS ==========
export const generarReporteAnunciosPDF = async () => {
  try {
    const anuncios = await getAnuncios();
    const { fecha, hora } = getFechaHora();
    
    const doc = new jsPDF({ orientation: "portrait" });
    
    headerInstitucional(doc, "Reporte de Anuncios");
    
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Fecha: ${fecha}`, 195, 25, { align: "right" });
    doc.text(`Hora: ${hora}`, 195, 30, { align: "right" });
    
    const tableData = anuncios.map((a, i) => [
      i + 1,
      a.titulo || "Sin título",
      a.materia || "General",
      a.descripcion?.substring(0, 50) || "Sin descripción",
      a.fecha || "Sin fecha",
      a.autor || "Admin"
    ]);
    
    autoTable(doc, {
      startY: 40,
      head: [["N°", "TÍTULO", "MATERIA", "DESCRIPCIÓN", "FECHA", "AUTOR"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [24, 135, 84], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 10, right: 10 }
    });
    
    footerPagina(doc);
    doc.save(`Reporte_anuncios_${fecha.replace(/\//g, '-')}.pdf`);
    
    return { success: true, mensaje: "Reporte de anuncios generado" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, mensaje: error.message };
  }
};

// ========== REPORTE DE USUARIOS (SOLO ADMIN) ==========
export const generarReporteUsuariosPDF = async () => {
  try {
    const usuarios = await getUsuarios();
    const { fecha, hora } = getFechaHora();
    
    const doc = new jsPDF({ orientation: "landscape" });
    
    headerInstitucional(doc, "Reporte de Usuarios");
    
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Fecha: ${fecha}`, 280, 25, { align: "right" });
    doc.text(`Hora: ${hora}`, 280, 30, { align: "right" });
    
    const tableData = usuarios.map((u, i) => [
      i + 1,
      u.Nombre || "Sin nombre",
      u.Correo || "Sin correo",
      u.Rol || "Sin rol"
    ]);
    
    autoTable(doc, {
      startY: 40,
      head: [["N°", "NOMBRE", "CORREO", "ROL"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [24, 135, 84], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 10, right: 10 }
    });
    
    footerPagina(doc);
    doc.save(`Reporte_usuarios_${fecha.replace(/\//g, '-')}.pdf`);
    
    return { success: true, mensaje: "Reporte de usuarios generado" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, mensaje: error.message };
  }
};

// ========== REPORTE COMPLETO (SOLO ADMIN) ==========
export const generarReporteCompletoPDF = async () => {
  try {
    const [anuncios, asesorias, usuarios] = await Promise.all([
      getAnuncios(),
      obtenerAsesorias(),
      getUsuarios()
    ]);
    const { fecha, hora } = getFechaHora();
    
    const doc = new jsPDF({ orientation: "portrait" });
    
    headerInstitucional(doc, "Reporte General del Sistema");
    
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Fecha: ${fecha}`, 195, 25, { align: "right" });
    doc.text(`Hora: ${hora}`, 195, 30, { align: "right" });
    
    let startY = 40;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text("ANUNCIOS", 14, startY);
    startY += 5;
    
    autoTable(doc, {
      startY: startY,
      head: [["TÍTULO", "MATERIA", "AUTOR", "FECHA"]],
      body: anuncios.map(a => [a.titulo, a.materia, a.autor, a.fecha]),
      theme: "striped",
      headStyles: { fillColor: [24, 135, 84] }
    });
    
    startY = doc.lastAutoTable.finalY + 15;
    doc.text("📚 ASESORÍAS", 14, startY);
    startY += 5;
    
    autoTable(doc, {
      startY: startY,
      head: [["ALUMNO", "GRUPO", "TIPO", "HORARIO"]],
      body: asesorias.map(a => [a.alumno, a.grupo, a.tipo, a.hora]),
      theme: "striped",
      headStyles: { fillColor: [24, 135, 84] }
    });
    
    startY = doc.lastAutoTable.finalY + 15;
    doc.text("👥 USUARIOS", 14, startY);
    startY += 5;
    
    autoTable(doc, {
      startY: startY,
      head: [["NOMBRE", "CORREO", "ROL"]],
      body: usuarios.map(u => [u.Nombre, u.Correo, u.Rol]),
      theme: "striped",
      headStyles: { fillColor: [24, 135, 84] }
    });
    
    footerPagina(doc);
    doc.save(`Reporte_completo_${fecha.replace(/\//g, '-')}.pdf`);
    
    return { success: true, mensaje: "Reporte completo generado" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, mensaje: error.message };
  }
};