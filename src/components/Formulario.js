import React, {useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Error from './Error';


const Formulario = ( { guardarRestante, guardarPresupuesto, guardarGastos, guardarGasto, guardarCrearGasto, restante, actualizarPregunta } ) => {

    //Defino los States que voy a utilizar
    const [nombre, guardarNombre] = useState(''); //State para verificar que el nombre del gasto no sea una cadena vacia
    const [cantidad, guardarCantidad] = useState(0); //State para corroborar que la cantidad sea valida
    const [error, guardarError] = useState(false); //State para lanzar un error en caso de que las entradas no sean validas
    const [errorPresupuestoRestante, guardarErrorPresupuestoRestante] = useState(false); //State En caso de que los gastos excedan al presupuesto restante
    
    //Cuando el usuario agregue un gasto
    const agregarGasto = e =>{
        e.preventDefault(); //Detengo el procedimiento por default (enviar los datos por la URL).

        /* 
            Primera Validacion:
            Necesito corroborar que la cantidad sea valida (no menor a uno), que no sea un numero,
            y también que el nombre del gasto no sea una cadena vacía.
            Si esto sucede, se actualizará el State "error" y se lanzará un error.
        */

        if(cantidad < 1 || isNaN(cantidad) || nombre === ''){
            guardarError(true); //Actualizo el state de "error" para lanzar un Error
            return; //Detengo las ejecuciones posteriores
        }

        //Paso la primera validacion, entonces "error" vuelve a ser false (no hay error).
        guardarError(false);

        /* 
            Segunda Validación:
            Necesito comprobar que el importe del gasto a ingresar 
            (que se actualiza gracias al onChange del input correspondiente) no supere al saldo restante.
            Si esto sucede, se actualizara el State "errorPresupuestoRestante" y se lanzará un error.

        */

        if(cantidad > restante){
            guardarCrearGasto(false); //No se llegó a crear el gasto, no se entra en la condición del App.js
            guardarErrorPresupuestoRestante(true); //Actualizo el state "errorPresupuestoRestante" para lanzar un error
            return; //Detengo las ejecuciones posteriores
        }

        //Pasó la segunda validación
        guardarErrorPresupuestoRestante(false);

        //Construccion del objeto gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate() 
        }
        guardarGasto(gasto); //Actualizo el state "gasto"
        guardarCrearGasto(true); //Se pudo crear el gasto correctamente asi que se actualizan los presupuestos
        

        //Reset del form
        guardarNombre('');
        guardarCantidad(0);
    }
    return (  
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos</h2>

            {error
            ? <Error msg="Los datos ingresados no son correctos" /> 
            
            : (errorPresupuestoRestante ? (<Error msg="Fondos insuficientes!" /> ) :null)
            }

            
            
            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />

                <label>Importe Gasto</label>
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value))}
                /> 
                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Agregar Gasto"
                    
                />
                <input
                type="button"
                className="button-primary u-full-width"
                value="Añadir presupuesto"
                onClick={e => {
                    actualizarPregunta(true);
                    //Se actualiza el state de "mostrarpregunta" para volver al componente <Pregunta />
                }}
                />
                <button
                    className="boton-resetear u-full-width"
                    onClick={e => {
                        e.preventDefault();
                        guardarGastos([]);
                        guardarRestante(0);
                        guardarPresupuesto(0);
                        actualizarPregunta(true);
                        localStorage.setItem('presupuesto',JSON.stringify(0));
                        //Reset de todas las propiedades y vuelta al componente <Pregunta />
                    }}
                >Resetear Gastos</button>

            </div>
        </form>
    );
}
 

Formulario.propTypes = {
    guardarRestante: PropTypes.func.isRequired,
    guardarPresupuesto: PropTypes.func.isRequired, 
    guardarGastos: PropTypes.func.isRequired, 
    guardarGasto: PropTypes.func.isRequired, 
    guardarCrearGasto: PropTypes.func.isRequired, 
    restante: PropTypes.number.isRequired, 
    actualizarPregunta: PropTypes.func.isRequired
}

export default Formulario;