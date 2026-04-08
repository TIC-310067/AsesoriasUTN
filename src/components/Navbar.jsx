import { logoutUser } from "../services/authService";
import { Link } from "react-router-dom";

function Navbar({ usuario, datos }) {

  // 🔓 LOGOUT CON CONFIRMACIÓN
  const handleLogout = async () => {
    const confirmar = window.confirm("¿Estás seguro de cerrar sesión?");
    if (confirmar) {
      try {
        await logoutUser();
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }
  };

  return (
    <div>
      <header>

        {/* 🔥 NAVBAR SUPERIOR */}
        <nav className="navbar navbar-expand-lg bg-white fixed-top shadow">

          <div className="container-fluid">

            {/* ☰ BOTÓN HAMBURGUESA */}
            <button
              className="btn btn-dark me-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#menuLateral"
            >
              ☰
            </button>

            <span className="navbar-brand">Asesorías UTN</span>

            

            {/* 👤 INFO USUARIO */}
            <ul className="navbar-nav ms-auto d-flex flex-row">

              <li className="nav-item">
                <span className="nav-link">
                  {datos?.Nombre || "Usuario"}
                </span>
              </li>

              {/* 🔽 DROPDOWN */}
              <li className="nav-item dropdown">

                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  ⚙️
                </a>

                <ul className="dropdown-menu dropdown-menu-end">

                  <li>
                    <a className="dropdown-item">Perfil</a>
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </li>

                </ul>

              </li>

            </ul>

          </div>
        </nav>

        {/* 🔥 MENÚ LATERAL (OFFCANVAS REAL) */}
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="menuLateral"
        >

          <div className="offcanvas-header">
            <h5 className="offcanvas-title">Menú</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>

          <div className="offcanvas-body">

            <ul className="list-group">

              {/* 👤 PERFIL */}
              <li className="list-group-item">
                <Link to="/perfil" className="sidenav-link">
                Perfil
                </Link>
              </li>

              {/* 📢 TABLÓN */}
              
                <li className="list-group-item">Tablón de anuncios</li>
              

              {/* 📚 ASESORÍAS */}
              {(datos?.Rol === "asesor" || datos?.Rol === "Admin") && (
                <li className="list-group-item">Asesorías</li>
              )}

              {/* 👥 USUARIOS */}
              {datos?.Rol === "Admin" && (
                <li className="list-group-item">
                <Link to="/usuarios" className="sidenav-link">
                Usuarios
                </Link>
                </li>
              )}

            </ul>

            <hr />

            {/* 🔴 LOGOUT */}
            <button
              className="btn btn-danger w-100"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>

          </div>

        </div>

      </header>
    </div>
  );
}

export default Navbar;