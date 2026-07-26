import { useEffect, useState } from "react";

function ColumnSelector({ datos, onSeleccionCambios }) {

    const [columnas, setColumnas] = useState([]);

    useEffect(() => {

if (!datos.length) return;
        const cols = Object.keys(datos[0]).map(nombre => ({
            nombre,
            seleccionado: true
        }));

        setColumnas(cols);

    }, [datos]);

    const cambiarEstado = (nombre) => {

        const nuevas = columnas.map(col =>

            col.nombre === nombre
                ? { ...col, seleccionado: !col.seleccionado }
                : col

        );

        setColumnas(nuevas);

        onSeleccionCambios(
            nuevas.filter(c => c.seleccionado).map(c => c.nombre)
        );

    };

if (!datos || datos.length === 0) return null;
    return (

        <div className="card mt-4">

            <div className="card-header">

                <h5>Selecciona las columnas a importar</h5>

            </div>

            <div className="card-body">

                {

                    columnas.map(col => (

                        <div className="form-check" key={col.nombre}>

                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={col.seleccionado}
                                onChange={() => cambiarEstado(col.nombre)}
                            />

                            <label className="form-check-label">

                                {col.nombre}

                            </label>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default ColumnSelector;