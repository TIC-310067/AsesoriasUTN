import { useState } from "react";
import { resetPassword } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ForgotPassword() {


        useEffect(() => {
        document.title = "Olvide Contraseña"; {/* Determina el Titulo de la Pagina */}
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

  return (
    <div className="container h-100">
      <div className="row h-100">
        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
          <div className="d-table-cell align-middle">

            <div className="text-center mt-4">
              <h1 className="h2">Restablecer Contraseña</h1>
              <p className="lead">
               Ingresa el correo para restablecer contraseña
              </p>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="m-sm-4">

                  <form onSubmit={handleSubmit}>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Ingresa Tu Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                    <div className="text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary"
                      >
                        Reiniciar Contraseña
                      </button>
                    </div>

                  </form>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;