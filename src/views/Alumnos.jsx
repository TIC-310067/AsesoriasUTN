import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom"; // 🌟 1. IMPORTAR UNAVEGATE
import BuscadorAlumnos from "../components/BuscadorAlumnos"; 
import TablaAlumnos from "../components/TablaAlumnos"; 
import EliminarAlumnoModal from "../components/EliminarAlumnoModal"; 
import Reloj from '../routes/Reloj'; 
import { escucharAlumnos } from "../services/AlumnoService"; 

function Alumnos() { 
  const navigate = useNavigate(); // 🌟 2. INSTANCIAR EL NAVEGADOR
  const [alumnos, setAlumnos] = useState([]); 
  const [busqueda, setBusqueda] = useState(""); 
  const [mostrarEliminar, setMostrarEliminar] = useState(false); 
  const [alumnoEliminar, setAlumnoEliminar] = useState(null); 

  useEffect(() => { 
    const unsubscribe = escucharAlumnos((datos) => { 
      setAlumnos(datos); 
    }); 
    return () => unsubscribe(); 
  }, []); 

  const alumnosFiltrados = alumnos.filter((alumno) => { 
    const texto = busqueda.toLowerCase(); 
    return ( 
      (alumno.nombre || "").toLowerCase().includes(texto) || 
      (alumno.matricula || "").toLowerCase().includes(texto) || 
      (alumno.carrera || "").toLowerCase().includes(texto) || 
      (alumno.grupo || "").toLowerCase().includes(texto) 
    ); 
  }); 

  return ( 
    <div className="min-vh-100" style={{ backgroundColor: '#c2f0d5', fontFamily: '"Afacad Flux", Helvetica' }}> 
      <div className="container py-4"> 
        <div className="row g-4"> 
          {/* COLUMNA PRINCIPAL DE CONTENIDO */} 
          <div className="col-12 col-md-7 col-lg-8 d-flex flex-column gap-4"> 
            
            {/* CABECERA DE LA VISTA */} 
            <div className="card shadow-sm border-0 rounded-4 bg-white p-2"> 
              <div className="card-body"> 
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3"> 
                  <div> 
                    <h2 className="fw-bold mb-1 text-uppercase tracking-wide" style={{ color: '#000000', fontSize: '32px' }}> 
                      Gestión de Asesorados 
                    </h2> 
                    <small className="text-success fw-semibold"> ● Portal Informativo Universitario </small> 
                  </div> 
                  
                  {/* 3. BOTÓN NUEVO ASESORADO REDIRECCIONANDO AL FORMULARIO */} 
                  <button 
                    className="btn px-4 py-2" 
                    onClick={() => {
                      localStorage.removeItem("editarAlumnoId"); 
                      navigate("/alumnos/nuevo");
                    }} 
                    style={{ backgroundColor: '#00b159', color: '#ffffff', fontFamily: '"Afacad Flux", Helvetica', fontWeight: '700', borderRadius: '12px', border: 'none' }} 
                  > 
                    + Nuevo Asesorado 
                  </button> 
                </div> 
              </div> 
            </div> 

            {/* SECCIÓN DE LISTADO Y BUSCADOR */} 
            <div className="card shadow-sm border-0 rounded-4 bg-white p-4 flex-grow-1"> 
              <div className="card-body p-0"> 
                <div className="mb-4"> 
                  <BuscadorAlumnos busqueda={busqueda} setBusqueda={setBusqueda} /> 
                </div> 

                {/* 4. CONTROL DE EDICIÓN EN LA TABLA REDIRECCIONANDO AL FORMULARIO */} 
                <div className="table-responsive"> 
                  <TablaAlumnos 
                    alumnos={alumnosFiltrados} 
                    onEditar={(alumno) => { 
                      localStorage.setItem("editarAlumnoId", alumno.id); 
                      navigate("/alumnos/nuevo"); 
                    }} 
                    onEliminar={(alumno) => { 
                      setAlumnoEliminar(alumno); 
                      setMostrarEliminar(true); 
                    }} 
                  /> 
                </div> 
              </div> 
            </div> 
          </div> 

          {/* COLUMNA DEL RELOJ DERECHO */} 
          <div className="col-12 col-md-5 col-lg-4"> 
            <div className="position-sticky" style={{ top: "20px" }}> 
              <Reloj /> 
            </div> 
          </div> 
        </div> 
      </div> 

      {/* MODAL DE ELIMINAR (El de agregar AlumnoModal se quitó porque ahora es una pantalla independiente) */} 
      <EliminarAlumnoModal 
        mostrar={mostrarEliminar} 
        alumno={alumnoEliminar} 
        cerrar={() => { 
          setMostrarEliminar(false); 
          setAlumnoEliminar(null); 
        }} 
      /> 
    </div> 
  ); 
} 

export default Alumnos;