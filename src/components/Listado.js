import React from 'react';
import PropTypes from 'prop-types';
import Gasto from './Gasto';

const Listado = ({ gastos, guardarGastos, guardarRestante, restante}) => {


    return( 
        <div className="gastos-realizados">
            <h2>Listado</h2>
            {gastos.map(gasto=>{
            
                return( //Devuelvo un componente por iteracion
                    <Gasto
                        key={gasto.id}
                        gasto={gasto}
                        gastos={gastos}
                        guardarGastos={guardarGastos}
                        guardarRestante={guardarRestante}
                        restante={restante}
                    />
            )})}
        </div>
    );
}

Listado.propTypes = {
    gastos: PropTypes.array.isRequired,
    guardarGastos: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    restante: PropTypes.number.isRequired
}
 
export default Listado;