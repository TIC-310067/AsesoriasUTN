import { obtenerAsesorias } from "../services/asesoriaService";

export const descargarBackup = async () => {
  const datos = await obtenerAsesorias();

  const blob = new Blob(
    [JSON.stringify(datos, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "backup_asesorias.json";
  a.click();

  URL.revokeObjectURL(url); // 🔥 limpiar memoria
};