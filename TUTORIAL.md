## Usage

In the simplest example, we want to fetch a config json from the server and send the `config`
into the context. The function `fn` is passed to the `loader` prop.

While loading, any JSX passed to `loadingMsg` will be called.

```jsx

import React from 'react';
import { StaticConfigWrapper, Context } from 'react-static-config-loader';

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
      <StaticConfigWrapper loader={async () => later(2000, fn)}>
        <ExampleClass someValue={'You made it in ExampleClass'}/>
      </StaticConfigWrapper>
    </React.Fragment>
  )
}

export default App

```
