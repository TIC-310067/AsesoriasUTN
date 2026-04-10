import { useEffect, useState } from "react";
import { getUsuarios } from "../services/firestoreServices.js";
import UserCard from "../routes/UserCard";
import { registerUser } from "../services/authService";
import { createUsuario } from "../services/firestoreServices";
import { serverTimestamp } from "firebase/firestore";

function Usuarios() {

    useEffect(() => {
    document.title = "Usuarios"; {/* Determina el Titulo de la Pagina */}
  }, []);

  // 🔹 Estado para guardar todos los usuarios
  const [usuarios, setUsuarios] = useState([]);

  // 🔹 Estado para el buscador
  const [busqueda, setBusqueda] = useState("");

  // 🔹 Estado de carga (PRO TIP)
  const [loading, setLoading] = useState(true);

  // 🔥 useEffect → se ejecuta al cargar la vista
  useEffect(() => {

    // 🔹 Función para traer usuarios desde Firestore
    const cargarUsuarios = async () => {
      try {
        const data = await getUsuarios(); // 👉 consulta a la BD
        setUsuarios(data); // 👉 guardamos usuarios en estado
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setLoading(false); // 👉 termina carga (éxito o error)
      }
    };

    cargarUsuarios();

  }, []);

  // 🔍 Filtrado dinámico (nombre o correo)
  const usuariosFiltrados = usuarios.filter((user) =>
    user?.Nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    user?.Correo?.toLowerCase().includes(busqueda.toLowerCase())
  );




  //FORMULARIO 
  const [nombre, setNombre] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [rol, setRol] = useState("");
const [mostrarPassword, setMostrarPassword] = useState(false);
const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
const [errores, setErrores] = useState({});

const validarPassword = (pass) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(pass);
};

const validarEmail = (correo) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
};

const validarFormulario = () => {
  let nuevosErrores = {};

  if (!nombre) {
    nuevosErrores.nombre = "El nombre es obligatorio";
  }

  if (!email) {
    nuevosErrores.email = "El correo es obligatorio";
  } else if (!validarEmail(email)) {
    nuevosErrores.email = "Correo inválido";
  }

  if (!password) {
    nuevosErrores.password = "La contraseña es obligatoria";
  } else if (!validarPassword(password)) {
    nuevosErrores.password =
      "Mínimo 8 caracteres, 1 mayúscula y 1 número";
  }

  if (!confirmPassword) {
    nuevosErrores.confirmPassword = "Confirma la contraseña";
  } else if (password !== confirmPassword) {
    nuevosErrores.confirmPassword = "No coinciden";
  }

  if (!rol) {
    nuevosErrores.rol = "Selecciona un rol";
  }

  setErrores(nuevosErrores);

  return Object.keys(nuevosErrores).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validarFormulario()) return;

    // 🔥 CONFIRMACIÓN
  const confirmacion = window.confirm("¿Deseas crear este usuario?");
  if (!confirmacion) return;

  try {
    // 🔐 Crear usuario en Auth
    const userCredential = await registerUser(email, password);

    const uid = userCredential.user.uid;

    // 📦 Crear objeto usuario
    const nuevoUsuario = {
      idUsuario: uid,
      Nombre: nombre,
      Correo: email,
      Rol: rol,
      FechaCreacion: serverTimestamp()
    };

    // 💾 Guardar en Firestore
    await createUsuario(nuevoUsuario);

    alert("Usuario creado correctamente 🔥");

    // 🧹 Limpiar form
    setNombre("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRol("");
    setErrores({});

  } catch (error) {
    console.error(error);

    if (error.code === "auth/email-already-in-use") {
      setErrores({ email: "Este correo ya está registrado" });
    } else if (error.code === "auth/invalid-email") {
      setErrores({ email: "Correo inválido" });
    } else if (error.code === "auth/weak-password") {
      setErrores({ password: "Contraseña débil" });
    } else {
      alert("Error al crear usuario");
    }
  }
};

  return (
    <div >

      {/* 🧾 Título */}
      <h2 className="mb-4">Gestión de Usuarios</h2>
      
      <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">

            <header className="card-header">
              <h4 className="card-title mt-2">Crear Usuario</h4>
            </header>

            <article className="card-body">


              <form onSubmit={handleSubmit}>

                {/* NOMBRE */}
                <div className="form-row">
                  <div className="col form-group">
                    <label>Nombre de Usuario</label>
                    <input type="text" 
                    className={`form-control ${errores.nombre ? "is-invalid" : ""}`} 
                    value={nombre}
                    onChange={(e) =>setNombre(e.target.value)}/>

                  {errores.nombre && (
                  <div className="invalid-feedback">{errores.nombre}</div>
                    )}
                  
                  </div>

      
                </div>

                {/* EMAIL */}
                <div className="form-group">
                  <label>Correo Electronico</label>
                  <input 
                  type="email" 
                  className={`form-control ${errores.email ? "is-invalid" : ""}`} 
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}/>

                  {errores.email && (
                  <div className="invalid-feedback">{errores.email}</div>
                  )}

                  <small className="form-text text-muted">
                    Con este correo se iniciara la sesion del usuario
                  </small>
                </div>

                {/* RADIO */}
                <label>Rol del Usuario</label>
                <div className={`form-group ${errores.rol ? "text-danger" : ""}`}>
                  <label className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rol"
                      value="Admin"
                      onChange={(e) => setRol(e.target.value)}
                    />
                    <span className="form-check-label">Admin</span>
                  </label>

                  <label className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rol"
                      value="Asesor"
                      onChange={(e) => setRol(e.target.value)}
                    />
                    <span className="form-check-label">Asesor</span>
                  </label>

                  <label className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="rol"
                      value="Asesorado"
                      onChange={(e) => setRol(e.target.value)}
                    />
                    <span className="form-check-label">Asesorado</span>
                  </label>
                  {errores.rol && <small>{errores.rol}</small>}

                </div>

                
                {/* PASSWORD */}
                <div className="form-group">
                  <label>Crear Contraseña</label>
                  <input 
                  className={`form-control ${errores.password ? "is-invalid" : ""}`} 
                  type={mostrarPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  />

                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setMostrarPassword(!mostrarPassword)}
                    >
                      {mostrarPassword ? "🙈" : "👁️"}
                    </button>
                  </div>


                  {errores.password && (
                    <div className="invalid-feedback">{errores.password}</div>
                  )}


                </div>

                <div className="form-group">
                  <label>Confirmar Contraseña</label>
                  <input className={`form-control ${errores.confirmPassword ? "is-invalid" : ""}`}
                  type={mostrarConfirmPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                    <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() =>
                        setMostrarConfirmPassword(!mostrarConfirmPassword)
                      }
                    >
                      {mostrarConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>


                  {errores.confirmPassword && (
                    <div className="invalid-feedback">{errores.confirmPassword}</div>
                  )}
                </div>


                <br></br>
                {/* BOTÓN */}
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Crear Usuario
                  </button>
                </div>

              </form>
            </article>


          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
 
 <hr>
 </hr>



      {/* 🔍 BUSCADOR */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="search"
            className="form-control"
            placeholder="Buscar por nombre o correo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)} // 👉 actualiza el filtro
          />
        </div>
      </div>

      {/* 🔥 CONTENIDO PRINCIPAL */}
      <div className="row">

        {/* ⏳ LOADING */}
        {loading ? (
          <p>Cargando usuarios...</p>

        ) : usuariosFiltrados.length > 0 ? (

          // 🔁 Render dinámico de usuarios
          usuariosFiltrados.map((usuario) => (
            <div className="col-md-6 col-lg-4 mb-3" key={usuario.id}>
              <UserCard usuario={usuario} />
            </div>
          ))

        ) : (

          // ❌ Cuando no hay resultados
          <p>No hay usuarios encontrados</p>

        )}

      </div>

    </div>
  );
}

export default Usuarios;