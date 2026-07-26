import {
    Pie
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function AlumnoCharts({ asesorias }) {

    const remedial = asesorias.filter(
        a => a.motivo === "Remedial"
    ).length;

    const extraordinario = asesorias.filter(
        a => a.motivo === "Extraordinario"
    ).length;

    const ordinaria = asesorias.filter(
        a => a.motivo === "Asesoría Ordinaria"
    ).length;

    const total = asesorias.length;

    const data = {

        labels: [

            "Remedial",

            "Extraordinario",

            "Ordinaria"

        ],

        datasets: [

            {

                data: [

                    remedial,

                    extraordinario,

                    ordinaria

                ],

                backgroundColor: [

                    "#ffc107",

                    "#dc3545",

                    "#198754"

                ],

                borderWidth: 2

            }

        ]

    };

    const options = {

        responsive: true,

        maintainAspectRatio: true,

        plugins: {

            legend: {

                position: "bottom"

            }

        }

    };

    return (

        <div className="card shadow-sm mt-4">

            <div className="card-header">

                <h5>

                    📊 Distribución de Asesorías

                </h5>

            </div>

            <div className="card-body">

                <div className="row align-items-center">

                    {/* Gráfica */}

                    <div className="col-md-6 text-center">

                        <div
                            style={{
                                width: "280px",
                                margin: "auto"
                            }}
                        >

                            <Pie

                                data={data}

                                options={options}

                            />

                        </div>

                    </div>

                    {/* Resumen */}

                    <div className="col-md-6">

                        <div className="card border-0">

                            <div className="card-body">

                                <h5 className="mb-4">

                                    Resumen

                                </h5>

                                <div className="d-flex justify-content-between mb-3">

                                    <span>

                                        🟢 Ordinarias

                                    </span>

                                    <strong>

                                        {ordinaria}

                                    </strong>

                                </div>

                                <div className="d-flex justify-content-between mb-3">

                                    <span>

                                        🟡 Remediales

                                    </span>

                                    <strong>

                                        {remedial}

                                    </strong>

                                </div>

                                <div className="d-flex justify-content-between mb-3">

                                    <span>

                                        🔴 Extraordinarios

                                    </span>

                                    <strong>

                                        {extraordinario}

                                    </strong>

                                </div>

                                <hr/>

                                <div className="d-flex justify-content-between">

                                    <h5>

                                        Total

                                    </h5>

                                    <h4 className="text-primary">

                                        {total}

                                    </h4>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AlumnoCharts;