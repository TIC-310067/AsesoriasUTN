import { useEffect, useState } from "react";
import { getUsuarios, createUsuario, deleteUsuario } from "../services/firestoreServices.js";
import UserCard from "../components/UserCard";
import { registerUser } from "../services/authService";
import { serverTimestamp } from "firebase/firestore";
import { crearLog } from "../services/logService";
import fondo_login from "./Imagenes/background_blur.png";

function Usuarios() {
  useEffect(() => {
    document.title = "Usuarios";
  }, []);

  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter((user) =>
    user?.Nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    user?.Correo?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmacion = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmacion) return;
    try {
      await deleteUsuario(id);
      alert("Usuario eliminado 🔥");
      await crearLog({
        usuario: "Admin",
        accion: "ELIMINAR_USUARIO",
        descripcion: `Se eliminó un usuario`
      });
      setUsuarios((prev) => prev.filter(user => user.id !== id));
    } catch (error) {
      console.error(error);
      alert("Error al eliminar usuario");
    }
  };

  const validarPassword = (pass) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(pass);
  };

  const validarEmail = (correo) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  };

  const validarFormulario = () => {
    let nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!email.trim()) {
      nuevosErrores.email = "El correo es obligatorio";
    } else if (!validarEmail(email)) {
      nuevosErrores.email = "Correo inválido";
    }
    if (!password) {
      nuevosErrores.password = "La contraseña es obligatoria";
    } else if (!validarPassword(password)) {
      nuevosErrores.password = "Mínimo 8 caracteres, 1 mayúscula y 1 número";
    }
    if (!confirmPassword) {
      nuevosErrores.confirmPassword = "Confirma la contraseña";
    } else if (password !== confirmPassword) {
      nuevosErrores.confirmPassword = "No coinciden";
    }
    if (!rol) nuevosErrores.rol = "Selecciona un rol";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    const confirmacion = window.confirm("¿Deseas crear este usuario?");
    if (!confirmacion) return;
    setLoading(true);
    try {
      const userCredential = await registerUser(email, password);
      const uid = userCredential.user.uid;
      const nuevoUsuario = {
        idUsuario: uid,
        Nombre: nombre,
        Correo: email,
        Rol: rol,
        FechaCreacion: serverTimestamp()
      };
      await createUsuario(nuevoUsuario);
      await crearLog({
        usuario: "Admin",
        accion: "CREAR_USUARIO",
        descripcion: `Se creó el usuario ${nombre}`
      });
      alert("Usuario creado correctamente 🔥");
      setUsuarios((prev) => [...prev, { ...nuevoUsuario, id: uid }]);
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
      } else {
        alert("Error al crear usuario");
      }
    } finally {
      setLoading(false);
    }
  };
  //FORMULARIO
  return (
    <>
      <section 
        className="vh-100 w-100 position-fixed top-0 start-0" 
        style={{ backgroundImage: `url(${fondo_login})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1 }}
      />

      <div className="container min-vh-100 py-5" style={{ fontFamily: '"Afacad Flux", Helvetica' }}>
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card shadow-lg border-0 bg-white p-4" style={{ borderRadius: '2rem' }}>
              <div className="card-body">

                <h2 className="text-center fw-bold text-dark text-uppercase tracking-wide mb-1" style={{ fontSize: '24px' }}>
                  CREAR UN NUEVO USUARIO
                </h2>
                <p className="text-center text-secondary mb-4 mx-auto" style={{ fontSize: '14px' }}>
                  Por favor ingrese los datos solicitados.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}>
                      Nombre del Usuario
                    </label>
                    <input 
                      type="text" 
                      className="form-control border-0 px-3 py-2 rounded-pill"
                      style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }}
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Escribe el nombre del usuario"
                    />
                    {errores.nombre && <small className="text-danger ps-2 mt-1 d-block fw-semibold" style={{ fontSize: '12px' }}>{errores.nombre}</small>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}>
                      Correo Electrónico
                    </label>
                    <input 
                      type="email" 
                      className="form-control border-0 px-3 py-2 rounded-pill"
                      style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="usuario@utn.edu.mx"
                    />
                    <small className="form-text text-success ps-2 mt-1 d-block fw-semibold" style={{ fontSize: '12px' }}>
                      Con este correo se iniciara la sesión del usuario
                    </small>
                    {errores.email && <small className="text-danger ps-2 mt-1 d-block fw-semibold" style={{ fontSize: '12px' }}>{errores.email}</small>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}>
                      Rol del Usuario
                    </label>
                    <div className="d-flex gap-4 ps-2 py-1">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="rol" id="rolAdmin" value="Admin" checked={rol === "Admin"} onChange={(e) => setRol(e.target.value)} style={{ accentColor: '#00b96b' }} />
                        <label className="form-check-label fw-semibold text-secondary" htmlFor="rolAdmin">Admin</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="rol" id="rolAsesor" value="Asesor" checked={rol === "Asesor"} onChange={(e) => setRol(e.target.value)} style={{ accentColor: '#00b96b' }} />
                        <label className="form-check-label fw-semibold text-secondary" htmlFor="rolAsesor">Asesor</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="rol" id="rolAsesorado" value="Asesorado" checked={rol === "Asesorado"} onChange={(e) => setRol(e.target.value)} style={{ accentColor: '#00b96b' }} />
                        <label className="form-check-label fw-semibold text-secondary" htmlFor="rolAsesorado">Asesorado</label>
                      </div>
                    </div>
                    {errores.rol && <small className="text-danger ps-2 d-block fw-semibold" style={{ fontSize: '12px' }}>{errores.rol}</small>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}>
                      Crear Contraseña
                    </label>
                       <div className="input-group rounded-pill overflow-hidden" style={{ backgroundColor: '#c2f0d5' }}>
      <input 
        type={mostrarPassword ? "text" : "password"} 
        className="form-control border-0 px-3 py-2 bg-transparent"
        style={{ color: '#11676A', fontWeight: '500', boxShadow: 'none' }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />
      <button type="button" className="input-group-text bg-transparent border-0 pe-3 text-secondary" onClick={() => setMostrarPassword(!mostrarPassword)}>
        {mostrarPassword ? (
          /* Icono de Ojo con diagonal (Ocultar) */
          <svg xmlns="http://w3.org" width="20" height="20" fill="#11676A" className="bi bi-eye-slash" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.516.486z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
          </svg>
        ) : (
          /* Icono de Ojo abierto (Mostrar) */
          <svg xmlns="http://w3.org" width="20" height="20" fill="#11676A" className="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
          </svg>
        )}
      </button>
    </div>
    {errores.password && <small className="text-danger ps-2 mt-1 d-block fw-semibold" style={{ fontSize: '12px' }}>{errores.password}</small>}
  </div>

 <div className="mb-4">
    <label className="form-label fw-bold text-dark text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}>
      Confirmar Contraseña
    </label>
    <div className="input-group rounded-pill overflow-hidden" style={{ backgroundColor: '#c2f0d5' }}>
      <input 
        type={mostrarConfirmPassword ? "text" : "password"} 
        className="form-control border-0 px-3 py-2 bg-transparent"
        style={{ color: '#11676A', fontWeight: '500', boxShadow: 'none' }}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="••••••••"
      />
      <button type="button" className="input-group-text bg-transparent border-0 pe-3 text-secondary" onClick={() => setMostrarConfirmPassword(!mostrarConfirmPassword)}>
        {mostrarConfirmPassword ? (
          /* Icono de Ojo con diagonal (Ocultar) */
          <svg xmlns="http://w3.org" width="20" height="20" fill="#11676A" className="bi bi-eye-slash" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.516.486z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
          </svg>
        ) : (
          /* Icono de Ojo abierto (Mostrar) */
          <svg xmlns="http://w3.org" width="20" height="20" fill="#11676A" className="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
          </svg>
        )}
      </button>
    </div>
    {errores.confirmPassword && <small className="text-danger ps-2 mt-1 d-block fw-semibold" style={{ fontSize: '12px' }}>{errores.confirmPassword}</small>}
  </div>

                  <div className="d-grid pt-2">
                    <button type="submit" className="btn text-white fw-semibold rounded-pill border-0 py-2" style={{ backgroundColor: '#00b96b', fontSize: '16px', letterSpacing: '0.5px' }} disabled={loading}>
                      {loading ? "Procesando..." : "Crear Usuario"}
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>


        <hr className="my-5 border-light opacity-50" />
        
        {/* Nuevo contenedor general para toda la sección de usuarios registrados */}
        <div className="card shadow-lg border-0 bg-white p-4" style={{ borderRadius: '2rem' }}>
          <div className="card-body">
            
            {/* TÍTULO DE LA SECCIÓN (Puedes cambiar el color aquí en 'color') */}
            <h3 className="fw-bold mb-4 text-uppercase tracking-wide" style={{ color: '#000000', fontSize: '24px' }}>
              Usuarios Registrados
            </h3>

            {/* BUSCADOR INTERNO */}
            <div className="row mb-4">
              <div className="col-12 col-md-6">
                <label className="form-label fw-bold text-secondary text-uppercase tracking-wider mb-1" style={{ fontSize: '13px' }}>
                  Filtrar lista
                </label>
                <input
                  type="search"
                  className="form-control border-0 px-4 py-2 rounded-pill"
                  style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }}
                  placeholder="Buscar por nombre o correo..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>

            {/* CUADRÍCULA DE TARJETAS */}
            <div className="row g-4">
              {loading ? (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border" role="status" style={{ color: '#10b981' }}></div>

                  <p className="mt-2 text-secondary fw-semibold">Cargando usuarios...</p>
                </div>
              ) : usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map((u) => (
                  <div className="col-12 col-md-6 col-lg-4" key={u.id}>
                    <UserCard usuario={u} onDelete={handleDelete} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5 text-secondary fs-5 fw-semibold">
                  No hay usuarios encontrados que coincidan con la búsqueda.
                </div>
              )}
            </div>

          </div>
        </div>

      </div> 
    </>
  );
}

export default Usuarios;
