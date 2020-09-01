import React from 'react';
import Gasto from './Gasto';

const Listado = ({ gastos, guardarGastos, guardarRestante, restante}) => {


    return( 
        <div className="gastos-realizados">
            <h2>Listado</h2>
            {gastos.map(gasto=>{
            
                return(
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

 
export default Listado;