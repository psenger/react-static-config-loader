import React from 'react'

import { StaticConfigWrapper } from 'react-static-config-loader'
import ExampleFunctionalDiv from "./components/ExampleFunctionalDiv";
import { ExampleClass } from "./components/ExampleClass";

const later = function later(delay, fnLater) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  }).then(fnLater);
}

const App = () => {
  const fn = ()=> Promise.resolve({msg:'go',version:1234,selection:['no','yes'], buttonName:'go go button'})
  return  <StaticConfigWrapper loader={async () => later(2000, fn)}>
            <ExampleFunctionalDiv someValue={'You made it in ExampleFunctionalDiv'}/>
            <ExampleClass someValue={'You made it in ExampleClass'}/>
          </StaticConfigWrapper>
}

export default App
