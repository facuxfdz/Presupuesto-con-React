import React from 'react';
import PropTypes from 'prop-types';

const Error = ({msg}) => (  //Se le pasa un mensaje personalizado para mostrar distintos errores
    <p className="alert alert-danger error">{msg}</p>
);

Error.propTypes = {
    msg: PropTypes.string.isRequired
}

export default Error;