function PreviewTable({ datos }) {

    if (!datos || datos.length === 0) {
        return null;
    }

    const columnas = Object.keys(datos[0]);

    return (

        <div className="card mt-4">

            <div className="card-header">

                <h5>👀 Vista previa del Excel</h5>

            </div>

            <div className="card-body">

                <div className="table-responsive">

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                {columnas.map((columna) => (

                                    <th key={columna}>{columna}</th>

                                ))}

                            </tr>

                        </thead>

                        <tbody>

                            {datos.map((fila, index) => (

                                <tr key={index}>

                                    {columnas.map((columna) => (

                                        <td key={columna}>

                                            {fila[columna]}

                                        </td>

                                    ))}

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default PreviewTable;