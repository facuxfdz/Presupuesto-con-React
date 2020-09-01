import React, {Fragment} from 'react';

const Gasto = ({ gasto, gastos, guardarGastos, guardarRestante, restante }) => {
    
    const sumaGastos = (cantidad, id) =>{
        const nuevosGastos = gastos.filter(gasto => gasto.id !== id);
        guardarGastos(nuevosGastos);
        guardarRestante(cantidad + restante);
    }
    return(
        <Fragment> 
            <li className="gastos">
                <p>
                    {gasto.nombre}

                    <span className="gasto">$ {gasto.cantidad}</span>
                </p>
                <button 
                    onClick={ e => sumaGastos(gasto.cantidad, gasto.id)}
                    className="boton-eliminar"
                >Eliminar</button>
            </li>
        </Fragment>
    );
}
 
export default Gasto;