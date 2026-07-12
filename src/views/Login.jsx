import { useEffect, useState } from "react";
import { loginUser } from "../services/authService";
import { crearLog } from "../services/logService";
import { useNavigate } from "react-router-dom";

import fondo_login from "./Imagenes/background_blur.png";
import logoGobierno from "./Imagenes/logo-gobierno.png";

function Login() {

  useEffect(() => {
    document.title = "Login | Asesorías UTN";
  }, []);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      await crearLog({
        usuario: email,
        accion: "LOGIN_EXITOSO",
        descripcion: "Inicio de sesión correcto"
      });
    } catch (err) {
      setError("Correo o contraseña incorrectos");
      await crearLog({
        usuario: email,
        accion: "LOGIN_FALLIDO",
        descripcion: "Credenciales incorrectas"
      });
    }
  };

  return (
    // FONDO 
    <section 
      className="vh-100 w-100 overflow-hidden" 
      style={{
        backgroundImage: `url(${fondo_login})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >

      <div className="container-fluid h-100 p-0">
        <div className="row h-100 g-0 align-items-center">
          
          {/* BIENVENIDA */}
          <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5 text-center">
            <h1 className="display-3 fw-bold mb-3" style={{ 
              fontFamily: "'Jaro Local', Helvetica", 
              letterSpacing: '5px',
              fontSize: '85px', /* Ajustado para que combine con la escala de la imagen */
            }}>
              ¡BIENVENIDO!
            </h1>
            
            <p className="lead" style={{ 
              fontSize: '24px', /* Reducido levemente para ajustarse a las dos líneas del diseño */
              fontFamily: '"Afacad Flux", Helvetica',
              letterSpacing: '0',
              lineHeight: '1.2',
              fontWeight: '600',
              textAlign: 'center',
              maxWidth: '75%' 
            }}> 
              Gestiona el registro y control de tus asesorías académicas 
            </p>
          </div>
            
          {/* FORMULARIO - CUADRO BLANCO */}
          <div className="col-12 col-lg-6 d-flex align-items-stretch justify-content-end h-100 p-0 m-0">
            <div 
              className="card shadow-lg border-0 bg-white w-100" 
              style={{ 
                width: '100%',       
                height: '100%',       
                borderRadius: '0px',  
                margin: '0'
              }}
            >
              <div className="card-body p-4 p-lg-5 d-flex flex-column justify-content-between h-100">

                {/* Contenido del formulario */}
                <div className="w-100 mx-auto my-auto" style={{ maxWidth: '600px' }}> 
                  <form className="pt-2"> 
                    
                    {/* ASESORIAS UTN */}
                    <div className="text-center text-black mb-3">
                      <span 
                        className="fw-bold text-black" 
                        style={{ 
                          fontSize: '56px', /* Tamaño ideal para que ocupe todo el ancho horizontal del cuadro blanco */
                          fontFamily: "'Jaro Local', Helvetica", 
                          letterSpacing: '1px',
                          lineHeight: '1', 
                          display: 'block', 
                          maxWidth: '100%', 
                          whiteSpace: 'nowrap'
                        }}
                      >
                        ASESORIAS UTN
                      </span>
                    </div>

                    {/* Subtítulo */}
                    <p 
                      className="text-center text-black mb-4" 
                      style={{ 
                        fontSize: '20px', 
                        fontFamily: '"Afacad Flux", Helvetica', 
                        letterSpacing: '0',
                        fontWeight: 'bold', 
                        whiteSpace: 'nowrap'
                      }}
                    > 
                      Inicia sesión con tu cuenta 
                    </p>

                    {/* Input Email */}
                    <div className="mb-3">
                      <input 
                        type="email" 
                        className="form-control form-control-lg border-0 px-4" 
                        placeholder="Correo@gmail.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ 
                          fontFamily: '"Afacad Flux", Helvetica',
                          borderRadius: '12px', 
                          backgroundColor: '#c2f0d5', /* Verde pastel menta idéntico a tu mockup */     
                          height: '46px',            
                          fontSize: '16px' /* Tamaño de letra interno de los inputs */          
                        }} 
                      />
                    </div>

                    {/* Input Password */}
                    <div className="mb-3">
                      <input 
                        type="password" 
                        className="form-control form-control-lg border-0 px-4" 
                        placeholder="Contraseña" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ 
                          fontFamily: '"Afacad Flux", Helvetica',
                          borderRadius: '12px', 
                          backgroundColor: '#c2f0d5',     
                          height: '46px',            
                          fontSize: '16px',
                          margin: '0'
                        }} 
                      />
                    </div>

                    {/* MENSAJE DE ERROR */}
                    {error && (
                      <p 
                        className="text-center mb-1 fw-semibold" 
                        style={{ 
                          color: "#dc3545", 
                          fontFamily: '"Afacad Flux", Helvetica', 
                          fontSize: '15px'
                        }}
                      >
                        {error}
                      </p>
                    )}

                    {/* Olvidé mi contraseña */}
                    <p 
                      className="text-center link-olvide mt-2 mb-0" 
                      style={{ 
                        cursor: "pointer", 
                        fontFamily: '"Afacad Flux", Helvetica', 
                        fontSize: '15px', 
                        color: '#2d3748', 
                        fontWeight: '500',
                        textDecoration: 'underline',
                      }} 
                      onClick={() => navigate("/forgot-password")}
                    > 
                      Olvidé mi contraseña 
                    </p>
                  </form>

                  {/* Botón Iniciar Sesión */}
                  <div className="text-center mt-4">
                    <button 
                      className="btn text-white fw-bold" 
                      type="button" 
                      onClick={handleLogin}
                      style={{ 
                        backgroundColor: '#00b159', 
                        borderRadius: '25px',      
                        fontSize: '20px',         
                        fontFamily: '"Afacad Flux", Helvetica',
                        padding: '10px 10px',
                        marginBottom: '50px', 
                        marginTop: '20px',     
                        minWidth: '200px'
                      }}
                    > 
                      Iniciar Sesion 
                    </button>
                  </div>

                  {/* LOGOS INSTITUCIONALES */}
                  <div className="d-flex justify-content-center align-items-center mt-5 pt-3 border-top">
                    <img 
                      src={logoGobierno} 
                      alt="Logo Gobierno y UTN"
                      style={{ height: '80px', objectFit: 'contain', marginTop: '20px' }} 
                    />
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Login;
