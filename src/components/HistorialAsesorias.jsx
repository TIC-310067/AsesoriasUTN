import { useState } from "react";

function HistorialAsesorias({ asesorias }) {

    const [detalle, setDetalle] = useState(null);

    if (!asesorias.length) {

        return (

            <div className="alert alert-warning mt-4">

                Este alumno aún no tiene asesorías registradas.

            </div>

        );

    }

    return (

        <>

            <div className="card mt-4 shadow-sm">

                <div className="card-header">

                    <h5>

                        📚 Historial de Asesorías

                    </h5>

                </div>

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>

                            <tr>

                                <th>No.</th>

                                <th>Motivo</th>

                                <th>Detalle</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                asesorias.map((asesoria,index)=>(

                                    <tr key={asesoria.id}>

                                        <td>

                                            {index+1}

                                        </td>

                                        <td>

                                            {asesoria.motivo}

                                        </td>

                                        <td>

                                            <button

                                                className="btn btn-primary btn-sm"

                                                onClick={()=>setDetalle(asesoria)}

                                            >

                                                Ver

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            {

                detalle &&

                <div

                    className="modal fade show"

                    style={{

                        display:"block",

                        background:"rgba(0,0,0,.5)"

                    }}

                >

                    <div className="modal-dialog">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5>

                                    Detalle de Asesoría

                                </h5>

                                <button

                                    className="btn-close"

                                    onClick={()=>setDetalle(null)}

                                />

                            </div>

                            <div className="modal-body">

                                <p>

                                    <b>Motivo:</b>

                                    {detalle.motivo}

                                </p>

                                <p>

                                    <b>No. Asesoría:</b>

                                    {detalle.numeroAsesoria}

                                </p>

                                <p>

                                    <b>Detalle:</b>

                                </p>

                                <div className="border rounded p-3">

                                    {detalle.detalle}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            }

        </>

    );

}

export default HistorialAsesorias;