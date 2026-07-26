function ChartSelector({ seleccion, setSeleccion }) {

    const opciones = [
        { id: "promedio", nombre: "Promedios" },
        { id: "maxmin", nombre: "Máximos y mínimos" },
        { id: "conteo", nombre: "Conteo de categorías" },
        { id: "barras", nombre: "Gráfica de barras" },
        { id: "pastel", nombre: "Gráfica de pastel" }
    ];

    const cambiar = (id) => {

        setSeleccion((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));

    };

    return (

        <div className="card mt-4">

            <div className="card-header">
                <h5>📊 Selecciona las gráficas</h5>
            </div>

            <div className="card-body">

                {
                    opciones.map(op => (

                        <div className="form-check" key={op.id}>

                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={seleccion[op.id] || false}
                                onChange={() => cambiar(op.id)}
                            />

                            <label className="form-check-label">
                                {op.nombre}
                            </label>

                        </div>

                    ))
                }

            </div>

        </div>

    );

}

export default ChartSelector;