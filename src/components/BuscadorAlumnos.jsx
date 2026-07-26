function BuscadorAlumnos({ busqueda, setBusqueda }) {

    return (

        <div className="my-3">

            <input
                className="form-control"
                placeholder="🔍 Buscar por nombre, matrícula, carrera o grupo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

        </div>

    );

}

export default BuscadorAlumnos;