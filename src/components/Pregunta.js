import React, { Fragment, useState } from 'react';
import Error from './Error';
const Pregunta = () => {

    //Defino el state
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    //Funcion que lea el presupuesto
    const definirPresupuesto = (e) => {
        guardarCantidad(parseInt(e.target.value));
    }

    //Submit para definir el presupuesto
    const agregarPresupuesto = e => {
        e.preventDefault();

        //Validando
        if(cantidad < 1 || isNaN(cantidad)){
            guardarError(true);
            return;//Para que no continue ejecutando instrucciones
        }
        
        //Si es valido puede ser que error sea true, pero pasó la validacion asi que lo pongo en false de nuevo
        guardarError(false);
    }
    
    return ( 
        <Fragment>
            <h2>Coloca tu presupuesto</h2>

            { error ? <Error msg = "El Presupuesto es incorrecto" /> :null}

            <form
                onSubmit={agregarPresupuesto}
            >
                <input
                type="number"
                className="u-full-width"
                placeholder="Coloca tu presupuesto"
                onChange={definirPresupuesto} //La defino mas arriba
                />
                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir presupuesto"
                />
            </form>
        </Fragment>
    );
}
 
export default Pregunta;