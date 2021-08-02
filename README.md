# react-static-config-loader

> React Static Config Loader, a convenience tag providing a widely used pattern of loading a static configuration from a server and using ReactJS Context, providing the cofnig to the context of components within the hiearchy in a clean and consistent manner.

[![NPM](https://img.shields.io/npm/v/react-static-config-loader.svg)](https://www.npmjs.com/package/react-static-config-loader) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-static-config-loader
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-static-config-loader'
import 'react-static-config-loader/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## License

MIT © [psenger](https://github.com/psenger)
