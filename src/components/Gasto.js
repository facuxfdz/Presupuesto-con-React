import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const Gasto = ({ gasto, gastos, guardarGastos, guardarRestante, restante }) => {
    
    //Funcion que elimina un gasto
    const eliminar = (cantidad, id) =>{
        const nuevosGastos = gastos.filter(gasto => gasto.id !== id);
        guardarGastos(nuevosGastos); //Actualizo el State de gastos
        guardarRestante(cantidad + restante); //Actualizo el saldo restante (le sumo el gasto que habia restado)
    }
    return(
        <Fragment> 
            <li className="gastos">
                <p>
                    {gasto.nombre}

                    <span className="gasto">$ {gasto.cantidad}</span>
                </p>
                <button 
                    onClick={ e => eliminar(gasto.cantidad, gasto.id)}
                    className="boton-eliminar"
                >Eliminar</button>
            </li>
        </Fragment>
    );
}

Gasto.propTypes = {
    gastos: PropTypes.array.isRequired,
    gasto: PropTypes.object.isRequired,
    guardarGastos: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    restante: PropTypes.number.isRequired
}
 
export default Gasto;