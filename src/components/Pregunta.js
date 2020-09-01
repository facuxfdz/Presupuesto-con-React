import React, { Fragment, useState } from 'react';
import Error from './Error';

const Pregunta = ({suma, guardarPresupuesto, guardarRestante, actualizarPregunta, actualizarMostrar, presupuesto}) => {

    //Defino el state
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);
    const [cantidadAux, actualizarAux] = useState(0);
    
    //Funcion que lea el presupuesto
    const definirPresupuesto = (e) => {
        actualizarAux(parseInt(e.target.value));
        guardarCantidad(presupuesto + parseInt(e.target.value));
    }

    //Submit para definir el presupuesto
    const agregarPresupuesto = e => {
        e.preventDefault();

        //Validando
        
        if(cantidad < 0 || isNaN(cantidad) || cantidadAux === 0){
            guardarError(true);
            actualizarMostrar(true);
            return;//Para que no continue ejecutando instrucciones
        }
        
        //Si es valido puede ser que error sea true, pero pasó la validacion asi que lo pongo en false de nuevo
        guardarError(false);
        
        localStorage.setItem('presupuesto',JSON.stringify(cantidad));
        localStorage.setItem('restante',JSON.stringify(cantidad-suma));

        guardarPresupuesto( JSON.parse(localStorage.getItem('presupuesto')));
        guardarRestante( JSON.parse(localStorage.getItem('restante')));
        
        
        
        actualizarPregunta(false);
        actualizarMostrar(false);
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
                    value="Añadir presupuesto"
                />

            </form>
               
            
        </Fragment>
    );
}
 
export default Pregunta;