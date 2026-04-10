import { useEffect } from "react";
import { loginUser } from "../services/authService";
import { useState } from "react";




function Login() {

    useEffect(() => {
    document.title = "Login"; {/* Determina el Titulo de la Pagina */}
  }, []);
    

    // 📥 Estados para guardar lo que escribe el usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ❌ Estado para mostrar errores
  const [error, setError] = useState("");

  // 🔐 FUNCIÓN DE LOGIN
  const handleLogin = async () => {
    try {
      // 👉 Llama al servicio de login
      await loginUser(email, password);

      // 👉 Si funciona, AuthContext detecta el usuario automáticamente

    } catch (err) {
      // ❌ Si falla, mostramos error
      setError("Correo o contraseña incorrectos");
    }
  };


  {/* Con esta estructura se comenta */}

  return (
    <div> {/* Inicio HTML */}
       {/* Sección principal (pantalla completa)*/}
    <section className="vh-100" style={{ backgroundColor: '#619a64' }}>

      {/* Contenedor principal */}
      <div className="container py-5 h-100">

        {/* Centrado vertical y horizontal */}
        <div className="row d-flex justify-content-center align-items-center h-100">

          <div className="col col-xl-10">

            {/* Card principal */}
            <div className="card" style={{ borderRadius: '1rem' }}>

              <div className="row g-0">

                {/* Imagen lado izquierdo */}
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>

                {/* Formulario lado derecho */}
                <div className="col-md-6 col-lg-7 d-flex align-items-center">

                  <div className="card-body p-4 p-lg-5 text-black">

                    <form>

                      {/* Logo / título */}
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#00BF63' }}></i>
                        <span className="h1 fw-bold mb-0">Asesorias UTN</span>
                      </div>

                      {/* Título */}
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Inicia sesion con tu cuenta
                      </h5>

                      {/* Input Email */}
                      <div className="mb-4">
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Correo@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)} // 👉 guarda el valor
                        />
                      </div>

                      {/* Input Password */}
                      <div className="mb-4">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          placeholder="Contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} // 👉 guarda el valor
                        />
                      </div>

                      {/* Botón */}
                      <div className="pt-1 mb-4">
                        <button className="btn btn-dark btn-lg w-100" type="button" onClick={handleLogin}>
                          Iniciar Sesion
                        </button>
                      </div>

                      {/* Links */}
                      <a href="#!" className="small text-muted">Olvide mi contraseña</a>

                    </form>

                     {/* ❌ MENSAJE DE ERROR */}
                     {error && <p style={{ color: "red" }}>{error}</p>}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
    
    
    
    
    </div>

  )
}

export default Login