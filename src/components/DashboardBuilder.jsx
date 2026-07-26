import { useEffect, useState } from "react";

function DashboardBuilder({ datos, onCambios }) {

    const [graficas, setGraficas] = useState([]);

    const columnas = datos.length
        ? Object.keys(datos[0])
        : [];

    useEffect(() => {

        if (!datos.length) return;

        if (graficas.length === 0) {

            const iniciales = columnas.map(col => ({

                columna: col,

                etiqueta: columnas[0],

                tipo: "barras"

            }));

            setGraficas(iniciales);

        }

    }, [datos]);

    useEffect(() => {

        onCambios(graficas);

    }, [graficas, onCambios]);

    const agregarGrafica = () => {

        setGraficas([
            ...graficas,
            {
                columna: columnas[0],
                etiqueta: columnas[0],
                tipo: "barras"
            }
        ]);

    };

    const actualizar = (index, campo, valor) => {

        setGraficas(prev =>

            prev.map((g, i) =>

                i === index

                    ? {

                        ...g,

                        [campo]: valor

                    }

                    : g

            )

        );

    };

    const eliminar = (index) => {

        setGraficas(

            graficas.filter((_, i) => i !== index)

        );

    };

    return (

        <div className="card mt-4">

            <div className="card-header">

                <h4>

                    📊 Constructor del Dashboard

                </h4>

            </div>

            <div className="card-body">

                {

                    graficas.map((grafica, index) => (

                        <div
                            key={index}
                            className="border rounded p-3 mb-3"
                        >

                            <h5>

                                Gráfica {index + 1}

                            </h5>

                            <div className="row">

                                {/* Columna */}

                                <div className="col-md-4">

                                    <label>

                                        Columna

                                    </label>

                                    <select

                                        className="form-select"

                                        value={grafica.columna}

                                        onChange={(e) =>

                                            actualizar(

                                                index,

                                                "columna",

                                                e.target.value

                                            )

                                        }

                                    >

                                        {

                                            columnas.map(col => (

                                                <option

                                                    key={col}

                                                    value={col}

                                                >

                                                    {col}

                                                </option>

                                            ))

                                        }

                                    </select>

                                </div>

                                {/* Etiqueta */}

                                <div className="col-md-3">

                                    <label>

                                        Etiquetas (Eje X)

                                    </label>

                                    <select

                                        className="form-select"

                                        value={grafica.etiqueta}

                                        onChange={(e) =>

                                            actualizar(

                                                index,

                                                "etiqueta",

                                                e.target.value

                                            )

                                        }

                                    >

                                        {

                                            columnas.map(col => (

                                                <option

                                                    key={col}

                                                    value={col}

                                                >

                                                    {col}

                                                </option>

                                            ))

                                        }

                                    </select>

                                </div>

                                {/* Tipo */}

                                <div className="col-md-4">

                                    <label>

                                        Tipo

                                    </label>

                                    <select

                                        className="form-select"

                                        value={grafica.tipo}

                                        onChange={(e) =>

                                            actualizar(

                                                index,

                                                "tipo",

                                                e.target.value

                                            )

                                        }

                                    >

                                        <option value="barras">

                                            📊 Barras

                                        </option>

                                        <option value="pastel">

                                            🥧 Pastel

                                        </option>

                                        <option value="lineas">

                                            📈 Líneas

                                        </option>

                                    </select>

                                </div>

                                {/* Botón eliminar */}

                                <div className="col-md-1 d-flex align-items-end">

                                    <button

                                        className="btn btn-danger"

                                        onClick={() => eliminar(index)}

                                    >

                                        ✖

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))

                }

                <button

                    className="btn btn-success"

                    onClick={agregarGrafica}

                >

                    + Agregar gráfica

                </button>

            </div>

        </div>

    );

}

export default DashboardBuilder;