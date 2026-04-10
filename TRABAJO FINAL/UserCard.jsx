function UserCard({ usuario }) {
  return (
    <div className="inbox-message">
      
      {/* 🔹 Lista contenedora */}
      <ul className="list-unstyled">

        <li className="d-flex align-items-center justify-content-between p-2 border-bottom">

          {/* 🔹 Contenido principal */}
          <div className="d-flex align-items-center">

            {/* 👤 Avatar */}
            <div className="me-3">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt="avatar"
                className="rounded-circle"
                width="50"
                height="50"
              />
            </div>

            {/* 📄 Info usuario */}
            <div>
              <h6 className="mb-1">{usuario?.Nombre || "Sin nombre"}</h6>
              <p className="mb-0">Correo: {usuario?.Correo || "N/A"}</p>
              <p className="mb-0">Rol: {usuario?.Rol || "N/A"}</p>
            </div>

          </div>

          {/* 🗑️ Botón eliminar (visual por ahora) */}
          <button className="btn btn-sm btn-danger">
            🗑️
          </button>

        </li>

      </ul>

    </div>
  );
}

export default UserCard;