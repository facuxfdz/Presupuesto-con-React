import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { revisarPresupuesto } from '../helpers';

const ControlPresupuesto = ( { suma, presupuesto } ) => {


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

ControlPresupuesto.propTypes = {
    suma: PropTypes.number.isRequired,
    presupuesto: PropTypes.number.isRequired
}
 
export default ControlPresupuesto;