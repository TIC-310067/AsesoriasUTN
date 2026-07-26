export const analizarDatos = (datos) => {

    if (!datos.length) {

        return {

            resumen: {

                totalRegistros: 0,

                columnas: 0

            },

            columnas: {}

        };

    }

    const columnas = Object.keys(datos[0]);

    const resultado = {};

    columnas.forEach(columna => {

        const valores = datos
            .map(fila => fila[columna])
            .filter(v => v !== undefined && v !== null && v !== "");

        if (!valores.length) return;

        const esNumero = valores.every(v => !isNaN(v));

        if (esNumero) {

            const numeros = valores.map(Number);

            resultado[columna] = {

                tipo: "numero",

                promedio:
                    numeros.reduce((a, b) => a + b, 0) / numeros.length,

                maximo: Math.max(...numeros),

                minimo: Math.min(...numeros)

            };

        } else {

            const conteo = {};

            valores.forEach(v => {

                conteo[v] = (conteo[v] || 0) + 1;

            });

            resultado[columna] = {

                tipo: "texto",

                conteo

            };

        }

    });

    const resumen = {

        totalRegistros: datos.length,

        columnas: columnas.length

    };

    return {

        resumen,

        columnas: resultado

    };

};