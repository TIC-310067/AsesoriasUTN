import * as XLSX from "xlsx";

export const leerExcel = (archivo, orientacion = "vertical") => {

    return new Promise((resolve, reject) => {

        const lector = new FileReader();

        lector.onload = (e) => {

            try {

                const datos = e.target.result;

                const workbook = XLSX.read(datos, {
                    type: "array"
                });

                const hoja = workbook.Sheets[workbook.SheetNames[0]];

                // ===== LECTURA VERTICAL =====

                if (orientacion === "vertical") {

                    const json = XLSX.utils.sheet_to_json(hoja);

                    resolve(json);

                    return;

                }

                // ===== LECTURA HORIZONTAL =====

                const matriz = XLSX.utils.sheet_to_json(hoja, {
                    header: 1
                });

                if (matriz.length === 0) {

                    resolve([]);

                    return;

                }

                const encabezados = matriz.map(fila => fila[0]);

                const registros = [];

                for (let col = 1; col < matriz[0].length; col++) {

                    const objeto = {};

                    for (let fila = 0; fila < encabezados.length; fila++) {

                        objeto[encabezados[fila]] = matriz[fila][col];

                    }

                    registros.push(objeto);

                }

                resolve(registros);

            }

            catch (error) {

                reject(error);

            }

        };

        lector.onerror = reject;

        lector.readAsArrayBuffer(archivo);

    });

};