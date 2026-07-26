export const recomendarGraficas = (datos) => {

    if (!datos.length) return [];

    const recomendaciones = [];

    Object.keys(datos[0]).forEach(columna => {

        const valores = datos
            .map(f => f[columna])
            .filter(Boolean);

        const unicos = [...new Set(valores)];

        const esNumero = valores.every(v => !isNaN(v));

        let tipo = "";

        if (columna.toLowerCase().includes("nombre")) {

            tipo = "tabla";

        }

        else if (columna.toLowerCase().includes("matricula")) {

            tipo = "tabla";

        }

        else if (columna.toLowerCase().includes("correo")) {

            tipo = "tabla";

        }

        else if (esNumero) {

            tipo = "lineas";

        }

        else if (unicos.length <= 8) {

            tipo = "pastel";

        }

        else {

            tipo = "barras";

        }

        recomendaciones.push({

            columna,

            tipo

        });

    });

    return recomendaciones;

};