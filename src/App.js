import React, { useState, useEffect }from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {


  //Defino los valores iniciales del presupuesto, restante y los gastos almacenados en el localStorage
  let gastosIniciales = JSON.parse(localStorage.getItem('gastos'));
  let presupuestoInicial = JSON.parse(localStorage.getItem('presupuesto'));
  let restanteInicial = JSON.parse(localStorage.getItem('restante'));
  if(!presupuestoInicial){
    presupuestoInicial = 0;
  }
  if(!restanteInicial){
    restanteInicial = 0;
  }
  if(!gastosIniciales){
    gastosIniciales = [];
  }
  
  //Definiendo los distintos States
  
  const [ presupuesto, guardarPresupuesto ] = useState(presupuestoInicial); //State con el presupuesto actual
  const [ restante, guardarRestante ] = useState(restanteInicial); //State con el saldo restante actualizado
  const [ mostrarpregunta, actualizarPregunta ] = useState(false); //State que determina el valor logico del State "mostrar"
  const [ mostrar, actMostrar ] = useState(true); //State que muestra <Pregunta /> si no hay nada en localStorage
  const [ gastos, guardarGastos ] = useState(gastosIniciales); //State que contiene todos los gastos
  const [ gasto, guardarGasto ] = useState({}); //State Auxiliar para guardar un gasto especifico
  const [ creargasto, guardarCrearGasto ] = useState(false); //State que permite añadir un gasto al State de gastos
  
  //Declaro una variable que tiene la suma de todos los gastos
  let suma = 0;
  gastos.map( gasto => {
    suma += gasto.cantidad;
    return suma;
  });

  //useEffect que actualiza y revisa el localStorage, actualiza el saldo restante al añadir gastos
  useEffect( () => {
    
    //Determinando si existen elementos en localStorage y seteando los valores logicos para mostrar los componentes
    if(gastosIniciales){
      localStorage.setItem('gastos', JSON.stringify(gastos));
    }else{
      localStorage.setItem('gastos', JSON.stringify([]));
    }

    if(JSON.parse(localStorage.getItem('presupuesto')) !== 0 || JSON.parse(localStorage.getItem('gastos')).length !== 0 ){
      actMostrar(false);
    }else {
      actMostrar(true);
    }
    
    if(mostrarpregunta){
      actMostrar(true);
    }

    //Actualizando saldo restante
    if(creargasto){
      
      //Agrega el presupuesto
      guardarGastos([
        ...gastos,
        gasto
      ]);

      //Resta del presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      guardarRestante(presupuestoRestante);

      //Resetear el booleano
      guardarCrearGasto(false);
    }

  },[gasto,creargasto,gastos,restante, gastosIniciales,mostrarpregunta]);
  
  
  return (
    <div className="container">
      <header>
        <h1>Control de gastos</h1>
        <div className="contenido-principal contenido">
      
          {  mostrar
          ?(
            <Pregunta 
              guardarPresupuesto={guardarPresupuesto} //Para guardar/actualizar el presupuesto
              guardarRestante={guardarRestante} //Para guardar/actualizar el saldo restante
              actualizarPregunta={actualizarPregunta} //Para pasar al siguiente componente necesito cambiar el valor logico de "mostrar"
              presupuesto={presupuesto} //Para realizar operaciones y actualizar correctamente los saldos
              suma={suma} //Para realizar operaciones con los saldos en caso de que existan gastos
              
            />
          )
          
          : (
            <div className="row">
              <div className="one-half column">
                <Formulario 
                  guardarGasto={guardarGasto} //Para guardar el objeto de gasto que se eventualmente se cree
                  guardarGastos={guardarGastos} //En caso de resetear el form
                  guardarCrearGasto={guardarCrearGasto} //Para informar que se creo correctamente el gasto
                  restante={restante} //Para evaluar si hay fondos para seguir gastando o no
                  guardarRestante={guardarRestante} //En caso de resetear el form
                  guardarPresupuesto={guardarPresupuesto} //En caso de resetear el form
                  actualizarPregunta={actualizarPregunta} //Para hacer un switch entre componentes
                  
            
                />
              </div>
              <div className="one-half column">
                <Listado 
                  gastos={gastos} //Para iterar entre todos los gastos
                  guardarGastos={guardarGastos} //Para pasar despues al componente <Gasto />
                  guardarRestante={guardarRestante} //Para pasar despues al componente <Gasto />
                  restante={restante} //Para pasar despues al componente <Gasto />
                />

                <ControlPresupuesto 
                  presupuesto={presupuesto}
                  suma={suma}
                />
              </div>
            </div>
          )
          }
      
        </div>
      </header>
    </div>
  );
}

export default App;
