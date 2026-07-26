import { useState } from "react";

function UploadExcel({ onArchivoSeleccionado }) {

    const [archivo, setArchivo] = useState(null);
    const [error, setError] = useState("");

    const seleccionarArchivo = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const extensiones = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel"
        ];

        if (!extensiones.includes(file.type)) {

            setError("Solo se permiten archivos Excel (.xlsx o .xls)");

            setArchivo(null);

            return;
        }

        setError("");

        setArchivo(file);

        onArchivoSeleccionado(file);

    };

    return (

        <>

            <input
                type="file"
                accept=".xlsx,.xls"
                onChange={seleccionarArchivo}
            />

            {archivo && (

                <div className="mt-3">

                    <strong>Archivo:</strong> {archivo.name}

                    <br />

                    <strong>Tamaño:</strong> {(archivo.size / 1024).toFixed(2)} KB

                </div>

            )}

            {error && (

                <div className="alert alert-danger mt-3">

                    {error}

                </div>

            )}

        </>

    );

}

export default UploadExcel;