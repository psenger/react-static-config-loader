import React from 'react'
import { ConfigPropExtenderHoc } from 'react-static-config-loader'

const ExampleFunctionalDiv = ({ config, someValue }) => <React.Fragment>
  <code>{JSON.stringify(config, null, 4)}</code>
  <div>{someValue}</div>
</React.Fragment>

const HOCExampleFunctionalDiv = (props) => {
  return (
    <React.Fragment>
      <ConfigPropExtenderHoc>
        <ExampleFunctionalDiv {...props} />
      </ConfigPropExtenderHoc>
    </React.Fragment>
  );
}

export default HOCExampleFunctionalDiv
