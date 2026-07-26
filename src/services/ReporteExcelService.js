import * as XLSX from "xlsx";

export const generarReporteExcel = (datos) => {

    const reporte = [
        {
            Nombre: datos.nombre,
            Matrícula: datos.matricula,
            Carrera: datos.carrera,
            Grupo: datos.grupo,
            Correo: datos.correo,
            Teléfono: datos.telefono,
            "Motivo de asesoría": datos.motivo,
            "Número de asesoría": datos.numeroAsesoria,
            Detalle: datos.detalle
        }
    ];

    const hoja = XLSX.utils.json_to_sheet(reporte);

    const libro = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(libro, hoja, "Reporte");

    XLSX.writeFile(
        libro,
        `Asesoria_${datos.nombre}_${datos.matricula}.xlsx`
    );

};