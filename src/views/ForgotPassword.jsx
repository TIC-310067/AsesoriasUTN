import { useState } from "react";
import { resetPassword } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import fondo_login from "./Imagenes/background_blur.png";

function ForgotPassword() {


        useEffect(() => {
        document.title = "Olvide mi Contraseña";
      }, []);

  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email) {
    setError("El correo es obligatorio");
    return;
  }

  try {
    await resetPassword(email);

    setMensaje("Se envió el correo 🔥");

    // ⏳ Espera 2 segundos y redirige
    setTimeout(() => {
      navigate("/Login"); // 👈 aquí decides a dónde
    }, 2000);

  } catch (err) {
    setError("Error al enviar correo");
  }
};

//INICIA EL DISEÑO
  return (
    <>
      <section 
        className="vh-100 w-100 position-fixed top-0 start-0" 
        style={{ backgroundImage: `url(${fondo_login})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1 }}
      />

      <div className="container h-100" style= {{fontFamily: '"Afacad Flux", Helvetica'}}>
      <div className="row justify-content-center mb-5">
         <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
        <div className="card shadow-lg border-0 bg-white p-4" style={{ borderRadius: '2rem' }}>
          <div className="d-table-cell align-middle">

            <div className="text-center mt-4">
                <h2 className="text-center fw-bold text-dark text-uppercase tracking-wide mb-1" style={{ fontSize: '28px' }}>
                  RESTABLECER CONTRASEÑA
                </h2>
              <p className="lead">
               Ingresa el correo para restablecer contraseña
              </p>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="m-sm-4">

                  <form onSubmit={handleSubmit}>

                    <div className="form-group">
                      <label className="form-label fw-bold text-secondary text-uppercase tracking-wider mb-1" style={{ fontSize: '15px' }}
                      >Email</label>
                      <input
                        className="form-control border-0 px-4 py-2 rounded-pill"
                        type="email"
                        placeholder="Ingresa Tu Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ backgroundColor: '#c2f0d5', color: '#11676A', fontWeight: '500' }}
                      />
                    </div>

                    {/* MENSAJES */}
                    {error && (
                      <p style={{ color: "red", marginTop: "10px" }}>
                        {error}
                      </p>
                    )}

                    {mensaje && (
                      <p style={{ color: "green", marginTop: "10px" }}>
                        {mensaje}
                      </p>
                    )}

                  {/* BOTON DE REINICIO */}
                    <div className="text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-lg"
                         style={{
                        '--bs-btn-color': '#11676A',
                        '--bs-btn-border-color': '#10b981',
                        '--bs-btn-hover-bg': '#11676A',
                        '--bs-btn-hover-color': '#ffffff', 
                        marginTop: '10px',
                        fontSize: '18px',
                      }}>

                        Reiniciar Contraseña
                      </button>
                    </div>

                  </form>
            </div>

          </div>
        </div>
        </div>

      </div> </div> </div> </div> 
    </>
  );
}
export default ForgotPassword;
