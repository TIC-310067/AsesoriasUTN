function KPICards({ estadisticas }) {

    if (!estadisticas) return null;

    let totalRegistros = 0;
    let totalColumnas = Object.keys(estadisticas).length;

    const primeraColumnaTexto = Object.values(estadisticas).find(
        item => item.tipo === "texto"
    );

    if (primeraColumnaTexto) {
        totalRegistros = Object.values(primeraColumnaTexto.conteo)
            .reduce((a, b) => a + b, 0);
    }

    const columnasNumericas = Object.values(estadisticas)
        .filter(item => item.tipo === "numero");

    const promedioGeneral =
        columnasNumericas.length > 0
            ? (
                columnasNumericas.reduce((suma, item) => suma + item.promedio, 0)
                / columnasNumericas.length
            ).toFixed(2)
            : "-";

    return (

        <div className="kpi-container">

            <div className="kpi-card">
                <h5>👥 Registros</h5>
                <h2>{totalRegistros}</h2>
            </div>

            <div className="kpi-card">
                <h5>📄 Columnas</h5>
                <h2>{totalColumnas}</h2>
            </div>

            <div className="kpi-card">
                <h5>📊 Promedio General</h5>
                <h2>{promedioGeneral}</h2>
            </div>

        </div>

    );

}

export default KPICards;