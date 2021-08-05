import React from 'react';
import { StaticConfigWrapper, Context } from '@psenger/react-static-config-loader';

export class ExampleClass extends React.Component {
  static contextType = Context;
  render() {
    const {someValue} = this.props;
    const config = this.context;
    return <React.Fragment>
      <code>{JSON.stringify(config,null,4)}</code>
      <div>{someValue}</div>
    </React.Fragment>
  }
}

const later = async function later(delay, fnLater) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  }).then(fnLater);
}

const App = () => {
  const fn = ()=> Promise.resolve({msg:'go',version:1234,selection:['no','yes'], buttonName:'go go button'})
  return (
    <React.Fragment>
      <StaticConfigWrapper loader={async () => later(2000, fn)} loadingMsg={()=><div>Loading</div>}>
        <ExampleClass someValue={'You made it in ExampleClass'}/>
      </StaticConfigWrapper>
    </React.Fragment>
  )
}

export default App
