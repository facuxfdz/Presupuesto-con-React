import React, {useState} from 'react';
import Error from './Error';
import shortid from 'shortid';

const Formulario = ( { guardarGasto, guardarCrearGasto } ) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);
    
    //Cuando el usuario agregue un gasto
    const agregarGasto = e =>{
        e.preventDefault();

        //Validar
        if(cantidad < 1 || isNaN(cantidad) || nombre === ''){
            guardarError(true);
            return; 
        }

        //Paso la validacion
        guardarError(false);

        //Construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        
        //Pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true); //Lo actualizamos cuando se crea el gasto

        //Resetear el form
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
            
            : null
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
                    className="button-primary u-full width"
                    value="Agregar Gasto"
                />

            </div>
        </form>
    );
}
 
export default Formulario;