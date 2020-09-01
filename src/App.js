import React, { useState, useEffect }from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {

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
  
  //Definiendo el State
  const [presupuesto, guardarPresupuesto] = useState(presupuestoInicial);
  const [restante, guardarRestante] = useState(restanteInicial);
  const [mostrarpregunta, actualizarPregunta ] = useState(true);
  const [gastos, guardarGastos] = useState(gastosIniciales);
  const [ gasto, guardarGasto] = useState({});
  const [ creargasto, guardarCrearGasto ] = useState(false);
  const [mostrarpregunta2, actualizarMostrar] = useState(false);
  const [mostrar, actMostrar] = useState(true);
  //useEffect que actualiza el presupuesto restante
  useEffect( () => {
    
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
    
    if(mostrarpregunta2){
      actMostrar(true);
    }
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

  },[gasto,creargasto,gastos,restante, presupuesto, gastosIniciales,mostrarpregunta2]);

  let suma = 0;
  gastos.map( gasto => {
      suma += gasto.cantidad;
      return suma;
  });

  
  
  
  return (
    <div className="container">
      <header>
        <h1>Control de gastos</h1>
        <div className="contenido-principal contenido">
      
          { ( mostrarpregunta || mostrarpregunta2) && mostrar
          ?(
            <Pregunta 
              guardarPresupuesto={guardarPresupuesto}
              guardarRestante={guardarRestante}
              actualizarPregunta={actualizarPregunta}
              actualizarMostrar={actualizarMostrar}
              mostrarpregunta2={mostrarpregunta2}
              restante={restante}
              presupuesto={presupuesto}
              suma={suma}
              
            />
          )
          
          : (
            <div className="row">
              <div className="one-half column">
                <Formulario 
                  guardarGasto={guardarGasto}
                  guardarGastos={guardarGastos}
                  guardarCrearGasto={guardarCrearGasto}
                  restante={restante}
                  guardarRestante={guardarRestante}
                  guardarPresupuesto={guardarPresupuesto}
                  actualizarMostrar={actualizarMostrar}
            
                />
              </div>
              <div className="one-half column">
                <Listado 
                  gastos={gastos}
                  guardarGastos={guardarGastos}
                  guardarRestante={guardarRestante}
                  restante={restante}
                />

                <ControlPresupuesto 
                  presupuesto={presupuesto}
                  gastos={gastos}
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
