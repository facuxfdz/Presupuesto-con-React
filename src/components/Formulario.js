import React, {useState} from 'react';
import Error from './Error';
import shortid from 'shortid';

const Formulario = ( { guardarRestante, guardarPresupuesto, guardarGastos, guardarGasto, guardarCrearGasto, restante, actualizarMostrar } ) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);
    const [errorPresupuestoRestante, guardarErrorPresupuestoRestante] = useState(false);
    
    //Cuando el usuario agregue un gasto
    const agregarGasto = e =>{
        e.preventDefault();

        //Validar

        if(cantidad < 1 || isNaN(cantidad) || nombre === ''){
            guardarError(true);
            return; 
        }

        //Paso la primera validacion
        guardarError(false);


        
        if(cantidad > restante){
            guardarCrearGasto(false);
            guardarErrorPresupuestoRestante(true);
            return;
        }
        guardarErrorPresupuestoRestante(false);

        //Construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }
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
                    actualizarMostrar(true);
                }}
                />
                <button
                    className="boton-resetear u-full-width"
                    onClick={e => {
                        guardarGastos([]);
                        guardarRestante(0);
                        guardarPresupuesto(0);
                        actualizarMostrar(true);
                        localStorage.setItem('presupuesto',JSON.stringify(0));
                    }}
                >Resetear Gastos</button>

            </div>
        </form>
    );
}
 
export default Formulario;