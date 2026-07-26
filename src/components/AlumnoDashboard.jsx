function AlumnoDashboard({ alumno, asesorias}) {

    return (

        <div className="row mt-4">

            

            

            <div className="col-md-3">

                <div className="card text-center shadow-sm">

                    <div className="card-body">

                        <h6>📝 Asesorías</h6>

                        <h2>

                            {asesorias.length}

                        </h2>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

               

            </div>

        </div>

    );

}

export default AlumnoDashboard;