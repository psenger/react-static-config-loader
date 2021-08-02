import React from 'react';
import { Context } from 'react-static-config-loader';

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
