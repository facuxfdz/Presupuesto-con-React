import React, { Fragment } from 'react';
import { revisarPresupuesto } from '../helpers';

const ControlPresupuesto = ( { presupuesto, gastos } ) => {

    let suma = 0;
    gastos.map( gasto => {
        suma += gasto.cantidad;
        return suma;
    });

    localStorage.setItem('restante',JSON.stringify(presupuesto-suma));

    return ( 
        <Fragment>
            <div className="alert alert-primary">
                Presupuesto: ${presupuesto}
            </div>
            
            <div className="alert alert-gastos"> 
                Gasto Total: ${suma}
            </div>
            <div className={revisarPresupuesto(presupuesto,presupuesto-suma)}>
                Restante:${presupuesto-suma}
            </div>
        </Fragment>
     );
}
 
export default ControlPresupuesto;