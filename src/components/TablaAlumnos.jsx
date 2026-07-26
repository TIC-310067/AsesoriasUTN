import { useNavigate } from "react-router-dom";

function TablaAlumnos({

    alumnos,

    onEditar,

    onEliminar

}) {

    const navigate = useNavigate();

    if (!alumnos || alumnos.length === 0) {
        return (
            <div className="alert alert-info mt-4">
                No hay alumnos registrados.
            </div>
        );
    }

    return (

        <div className="table-responsive">

            <table className="table table-striped table-hover mt-4">

                <thead className="table-dark">

                    <tr>
                        <th>Nombre</th>
                        <th>Matrícula</th>
                        <th>Carrera</th>
                        <th>Grupo</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th style={{ width: "170px" }}>Acciones</th>
                    </tr>

                </thead>

                <tbody>

                    {alumnos.map((alumno) => (

                        <tr key={alumno.id}>

                            <td>{alumno.nombre}</td>

                            <td>{alumno.matricula}</td>

                            <td>{alumno.carrera}</td>

                            <td>{alumno.grupo}</td>

                            <td>{alumno.correo}</td>

                            <td>{alumno.telefono}</td>

                            <td>

                               {/* 1. BOTÓN VER INFORMACIÓN (Ojo de color azul de Bootstrap) */}
<button 
  className="btn btn-sm me-2" 
  title="Ver información" 
  onClick={() => navigate(`/alumnos/${alumno.id}`)} 
    style={{ 
    '--bs-btn-border-color': '#10b981', 
    '--bs-btn-hover-bg': '#10b981', 
    '--bs-btn-hover-color': '#ffffff' 
  }} 
> 
  👁 
</button> 

{/* 2. BOTÓN EDITAR (Lápiz con tus colores personalizados verde/azul - ¡CORREGIDO!) */}
<button 
  className="btn btn-sm me-2" 
  title="Editar" 
  onClick={() => onEditar(alumno)} 
  style={{ 
    '--bs-btn-border-color': '#11676A', 
    '--bs-btn-hover-bg': '#11676A', 
    '--bs-btn-hover-color': '#ffffff' 
  }} 
> 
  ✏️ 
</button> 

{/* 3. BOTÓN ELIMINAR (Bote de basura rojo de Bootstrap) */}
<button 
  className="btn btn-sm" 
  title="Eliminar" 
  onClick={() => onEliminar(alumno)} 
    style={{ 
    '--bs-btn-color': '#ef4444',
    '--bs-btn-border-color': '#ef4444',
    '--bs-btn-hover-bg': '#ef4444',
    '--bs-btn-hover-color': '#ffffff',  
  }} 
> 
  🗑️ 
</button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default TablaAlumnos;