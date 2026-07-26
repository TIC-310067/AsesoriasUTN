import Charts from "./Charts";

function Dashboard({ estadisticas, configuracion, datos }) {

    if (!estadisticas) return null;

    if (!configuracion || configuracion.length === 0) {

        return (

            <div className="alert alert-warning mt-4">

                Selecciona al menos una gráfica en el Constructor del Dashboard.

            </div>

        );

    }

    return (

        <div className="mt-5">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3>📊 Dashboard de Análisis</h3>

                </div>

                <div className="card-body">

                    <div className="row mb-4">

                        <div className="col-md-6">

                            <div className="card border-success">

                                <div className="card-body text-center">

                                    <h5>Total de registros</h5>

                                    <h2>

                                        {estadisticas.resumen?.totalRegistros||0}

                                    </h2>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className="card border-info">

                                <div className="card-body text-center">

                                    <h5>Total de columnas</h5>

                                    <h2>

                                        {estadisticas.resumen?.columnas||0}

                                    </h2>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="row">

                        {

                            configuracion.map((grafica, index) => {

                                const datosColumna =
                                    estadisticas.columnas[grafica.columna];

                                if (!datosColumna) return null;

                                return (

                                    <div
                                        className="col-md-6 mb-4"
                                        key={index}
                                    >

                                        <div className="card h-100">

                                            <div className="card-header">

                                                <strong>

                                                    {grafica.columna}

                                                </strong>

                                                <span className="float-end">

                                                    {grafica.tipo}

                                                </span>

                                            </div>

                                            <div className="card-body">

                                               <Charts

    datos={datos}

    columna={grafica.columna}

    etiqueta={grafica.etiqueta}

    tipo={grafica.tipo}

/>

                                            </div>

                                        </div>

                                    </div>

                                );

                            })

                        }

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;