import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Pregunta = ({suma, actualizarPregunta, guardarPresupuesto, guardarRestante, presupuesto}) => {

    //Defino los states a utilizar
    const [cantidad, guardarCantidad] = useState(0); //State que acumula el valor tipeado por el usuario sumado al saldo preexistente
    const [cantidadAux, actualizarAux] = useState(0); //State que acumula SOLO el valor tipeado por el usuario
    const [error, guardarError] = useState(false); //State para denegar un ingreso invalido de datos
    
    //Funcion que lee el presupuesto a medida que se tipea
    const definirPresupuesto = (e) => {
        actualizarAux(parseInt(e.target.value));
        guardarCantidad(presupuesto + parseInt(e.target.value));
    }

    //Submit para definir el presupuesto
    const agregarPresupuesto = e => {
        e.preventDefault();

        /*
        Validacion: 
        Necesito saber si el valor tipeado sumado al saldo preexistente es positivo,
        pero tambien me interesa saber si el valor tipeado en si mismo es positivo, 
        ya que sino se restaría al presupuesto preexistente. 
        */
        if(cantidad <= 0 || isNaN(cantidad) || cantidadAux <= 0 ){
            guardarError(true); //Actualizo el state de error para mostrar un componente condicional <Error />
            return;//Para que no continue ejecutando instrucciones
        }
        
        //Si se pasa la validación, seteo en false el error (ya puede quedar en true de un error anterior).
        guardarError(false);
        
        /*
        Guardo en localStorage la cantidad actualizada ingresada por el usuario 
        y su correspondiente saldo restante.
        */
        localStorage.setItem('presupuesto',JSON.stringify(cantidad));
        localStorage.setItem('restante',JSON.stringify(cantidad-suma));
        
        // Actualizo el State "presupuesto" con lo que se haya seteado en localStorage
        guardarPresupuesto( JSON.parse(localStorage.getItem('presupuesto')));
        guardarRestante( JSON.parse(localStorage.getItem('restante')));
        
        /*
        Seteo en false el valor logico de "mostrarpregunta"
        ya que luego de guardar/actualizar el presupuesto, necesito mostrar el componente <Formulario />
        */ 
        actualizarPregunta(false);
        
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
                    onChange={definirPresupuesto}
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

Pregunta.propTypes = {
    suma: PropTypes.number.isRequired,
    actualizarPregunta: PropTypes.func.isRequired,
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    presupuesto: PropTypes.number.isRequired
}
 
export default Pregunta;