import React, { useState, useEffect } from 'react';

const Reloj = () => {
  const [fechaHora, setFechaHora] = useState({
    diaSemana: '',
    dia: '',
    mes: '',
    year: '',
    horas: '',
    minutos: '',
    segundos: '',
    ampm: ''
  });

  useEffect(() => {
    const actualizarReloj = () => {
      const fecha = new Date();
      const diasSemana = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
      const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      
      let horas = fecha.getHours();
      let ampm = horas >= 12 ? 'PM' : 'AM';
      horas = horas % 12 || 12;
      
      setFechaHora({
        diaSemana: diasSemana[fecha.getDay()],
        dia: fecha.getDate(),
        mes: meses[fecha.getMonth()],
        year: fecha.getFullYear(),
        horas: horas.toString().padStart(2, '0'),
        minutos: fecha.getMinutes().toString().padStart(2, '0'),
        segundos: fecha.getSeconds().toString().padStart(2, '0'),
        ampm: ampm
      });
    };

    actualizarReloj();
    const intervalo = setInterval(actualizarReloj, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="card shadow-lg border-0 overflow-hidden" style={{ 
      backgroundColor: '#1a1a1a', 
      borderRadius: '2rem',
      color: 'white'
    }}>
      <div className="card-body text-center py-5 position-relative">
        {/* Decoración de fondo */}
        <div className="position-absolute top-0 end-0" style={{ 
          width: '150px', 
          height: '150px', 
          backgroundColor: 'rgba(0, 191, 99, 0.1)', 
          filter: 'blur(50px)',
          borderRadius: '50%'
        }}></div>
        
        {/* Día */}
        <div className="mb-4">
          <div className="d-inline-block px-3 py-1 rounded-pill fw-bold text-uppercase mb-2" style={{ 
            backgroundColor: 'rgba(0, 191, 99, 0.1)', 
            color: '#00BF63',
            border: '1px solid rgba(0, 191, 99, 0.3)',
            fontSize: '0.75rem',
            letterSpacing: '2px'
          }}>
            {fechaHora.diaSemana}
          </div>
          <p className="text-white h5 mt-2 fw-medium">
            {fechaHora.dia} {fechaHora.mes}, {fechaHora.year}
          </p>
        </div>

        {/* Hora grande */}
        <div className="d-flex align-items-center justify-content-center mb-4" style={{ fontFamily: "'Oswald', sans-serif" }}>
          <span className="display-1 fw-bold text-white">{fechaHora.horas}</span>
          <span className="display-3 fw-bold text-success mx-2" style={{ animation: 'pulse 1s infinite' }}>:</span>
          <span className="display-1 fw-bold text-white">{fechaHora.minutos}</span>
          
          <div className="d-flex flex-column ms-2">
            <span className="h4 fw-bold text-success mb-0">{fechaHora.ampm}</span>
            <span className="h5 fw-bold text-secondary">{fechaHora.segundos}</span>
          </div>
        </div>
        
        {/* Línea decorativa */}
        <div className="w-100 mx-auto my-4" style={{ 
          height: '1px', 
          background: 'linear-gradient(90deg, transparent, #4a4a4a, transparent)' 
        }}></div>
        
        <p className="text-secondary text-uppercase small mb-0" style={{ letterSpacing: '3px' }}>
          Tiempo Oficial Local
        </p>
      </div>

      {/* Animación del pulso */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Reloj;