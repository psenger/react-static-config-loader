import React from "react";
import { ConfigPropExtenderHoc, StaticConfigWrapper } from "@psenger/react-static-config-loader";

const PureFunction = ({ config, someValue }) => <React.Fragment>
  <code>{JSON.stringify(config, null, 4)}</code>
  <div>{someValue}</div>
</React.Fragment>

const HOC = ({someValue}) => {
  return (
    <ConfigPropExtenderHoc>
      <PureFunction someValue={someValue} />
    </ConfigPropExtenderHoc>
  );
}

const later = (delay, fnLater) => Promise.resolve()
  .then(()=>{
    let id;
    return new Promise(function(resolve) {
        if (id) { // this is PURELY a safety precaution
          clearTimeout(id);
          id = undefined;
        }
        id = setTimeout(resolve, delay);
      })
      .then(() => {
        // We need to cut down the possibility of a memory leak. It is
        // assumed some one will copy-cut-and paste this code, and do
        // something really bad. :grin:
        clearTimeout(id);
      })
  })
  .then(fnLater)

const App = () => {
  const fn = ()=> Promise.resolve({msg:'go',version:1234,selection:['no','yes'], buttonName:'go go button'})
  return (
    <React.Fragment>
      <StaticConfigWrapper loader={ later(2000, fn) } loadingMsg={<div>Loading</div>}>
        <HOC someValue={'You made it in ExampleClass'}/>
      </StaticConfigWrapper>
    </React.Fragment>
  )
}

export default App
