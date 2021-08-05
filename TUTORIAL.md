## Usage

In the simplest example, we want to fetch a configuration json file from the server and send the
`config` into the context. The async function ( `fn` in this example ) is passed as a proprty
called `loader`.

While loading ( and defaulted behavior ), any JSX passed to `loadingMsg` will be called.

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

Things get a little complicated if you have "Pure" JSX functions. In this case, the
`contextType` is simply not available. You can bypass this by creating a Higher Order Component (HOC)
and pass the value down via the properties or use the built in `ConfigPropExtenderHoc` which
extends the component and copies the `config` into the component as properties.

```jsx
import React from 'react';
import { ConfigPropExtenderHoc, StaticConfigWrapper } from '@psenger/react-static-config-loader';

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

const later = async function later(delay, fnLater) {
  return new Promise(function(resolve) {
    setTimeout(resolve, delay);
  }).then(fnLater);
}

const App = () => {
  const fn = ()=> Promise.resolve({msg:'go',version:1234,selection:['no','yes'], buttonName:'go go button'})
  return (
    <React.Fragment>
      <StaticConfigWrapper loader={async () => later(2000, fn)} loadingMsg={<div>Loading</div>}>
        <HOC someValue={'You made it in ExampleClass'}/>
      </StaticConfigWrapper>
    </React.Fragment>
  )
}

export default App
```
