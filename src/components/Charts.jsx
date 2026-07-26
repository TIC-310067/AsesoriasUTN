import {
    Bar,
    Pie,
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title
);

function Charts({

    datos,

    columna,

    etiqueta,

    tipo

}) {

    if (!datos || datos.length === 0) {

        return null;

    }

    const valores = datos
        .map(fila => fila[columna])
        .filter(v => v !== undefined && v !== null && v !== "");

    if (valores.length === 0) {

        return (

            <div className="alert alert-warning">

                No existen datos para la columna <b>{columna}</b>

            </div>

        );

    }

    const esNumero = valores.every(v => !isNaN(v));

    let labels = [];
    let data = [];

    if (esNumero) {

    if (etiqueta) {

        labels = datos.map(fila => fila[etiqueta]);

    } else {

        labels = valores.map((_, i) => `Registro ${i + 1}`);

    }

    data = valores.map(Number);

} else {

        const conteo = {};

        valores.forEach(v => {

            conteo[v] = (conteo[v] || 0) + 1;

        });

        labels = Object.keys(conteo);

        data = Object.values(conteo);

    }

    const colores = [

    "#4e79a7",
    "#f28e2b",
    "#e15759",
    "#76b7b2",
    "#59a14f",
    "#edc948",
    "#b07aa1",
    "#ff9da7",
    "#9c755f",
    "#bab0ab",
    "#3b82f6",
    "#10b981",
    "#ef4444",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4"

];

const chartData = {

    labels,

    datasets: [

        {

            label: columna,

            data,

            backgroundColor: labels.map(

                (_, i) => colores[i % colores.length]

            ),

            borderColor: labels.map(

                (_, i) => colores[i % colores.length]

            ),

            borderWidth: 2

        }

    ]

};
const options = {

    responsive: true,

    plugins: {

        legend: {

            position: "bottom"

        },

        title: {

            display: true,

            text: columna

        }

    }

};
    switch (tipo) {

    case "pastel":

        return (

            <Pie
                data={chartData}
                options={options}
            />

        );

    case "lineas":

        return (

            <Line
                data={chartData}
                options={options}
            />

        );

    case "barras":

    default:

        return (

            <Bar
                data={chartData}
                options={options}
            />

        );

}

}

export default Charts;