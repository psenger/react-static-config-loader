import React, { createContext, useEffect, useState } from 'react'

/**
 * Context
 * @see https://reactjs.org/docs/context.html
 * @type {React.Context<*>}
 */
export const Context = createContext(null)

/**
 * Provider
 * @see https://reactjs.org/docs/context.html#contextconsumer
 * @type {Context.Provider<*>}
 */
export const Provider = Context.Provider

/**
 * Consumer
 * @see https://reactjs.org/docs/context.html#contextprovider
 * @type {Context.Provider<*>}
 */
export const Consumer = Context.Consumer

const useComponentDidMount = (onMountHandler) => {
  useEffect(() => {
    async function asyncOnMountHandler() {
      await onMountHandler()
    }
    asyncOnMountHandler()
  }, [])
}

/**
 * Use this Wrapper or HOC, Higher Order Component, to copy the `config` object found in context
 * onto the properties of the first level of children it encapsulates. Because `contextType` can
 * not be added to JSX functions, you will need to wrap or extend the function to inject the
 * config value. This HOC, simple clones the JSX element, and copies the context's 'config'
 * values as properties.
 *
 * @param {JSX} [children] - Optional JSX Children, keep in mind this only attaches the property
 * to all the first level children ( shallow )
 * @return {JSX}
 * @example
 * import React from 'react'
 * import { ConfigPropExtenderHoc } from 'react-static-config-loader'
 *
 * const ExampleFunctionalDiv = ({ config, someValue }) => <React.Fragment>
 *  <code>{JSON.stringify(config, null, 4)}</code>
 *  <div>{someValue}</div>
 *  </React.Fragment>
 *
 * const HOCExampleFunctionalDiv = (props) => {
 *   return (
 *     <React.Fragment>
 *       <ConfigPropExtenderHoc>
 *         <ExampleFunctionalDiv {...props} />
 *       </ConfigPropExtenderHoc>
 *     </React.Fragment>
 *   );
 * }
 *
 *  export default HOCExampleFunctionalDiv
 */
export class ConfigPropExtenderHoc extends React.Component {
  static contextType = Context
  render() {
    return React.cloneElement(this.props.children, { config: this.context })
  }
}

/**
 * Callback responsible for fetching the external configuration. Because it is a promise, the
 * user can add a 'then' or even use async/await to transform the payload.
 *
 * @callback loaderCall
 * @return {Promise<any>}
 */

/**
 * StaticConfigWrapper - is everything wrapped up in one JSX tag. I
 * expect this will satisfy the majority of scenarios. However, for those that
 * it does not, the [Provider](#Provider), [Consumer](#Consumer), and [Context](#Context) are all broken out. If you
 * find you really need them, this might not be a good solution for your project.
 * [redux Action object](http://redux.js.org/docs/basics/Actions.html)
 *
 * @param {Object} [props] - props the JSX props.
 * @param {JSX.Element} [props.children=null] - All the JSX children, or null. the default value
 * is null.
 * @param {loaderCall} props.loader - Required function that will "load" the static
 * configuration returning a promise. It is assumed the function will return a Promise, that can
 * resolve a value or a proper rejection.
 * @param {JSX.Element} [props.loadingMsg=null] - The optional JSX that will be displayed while the
 * loader is running.
 * @return {JSX.Element}
 * @example
 *  import React from 'react';
 *  import { StaticConfigWrapper, Context } from 'react-static-config-loader';
 *  export class ExampleClass extends React.Component {
 *   static contextType = Context;
 *   render() {
 *     const {someValue} = this.props;
 *     const config = this.context;
 *     return <React.Fragment>
 *       <code>{JSON.stringify(config,null,4)}</code>
 *       <div>{someValue}</div>
 *     </React.Fragment>
 *   }
 *  }
 *  const later = async function later(delay, fnLater) {
 *   return new Promise(function(resolve) {
 *     setTimeout(resolve, delay);
 *   }).then(fnLater);
 *  }
 *  const App = () => {
 *   const fn = ()=> Promise.resolve({msg:'go',version:1234,selection:['no','yes'], buttonName:'go go button'})
 *   return (
 *     <React.Fragment>
 *       <StaticConfigWrapper loader={async () => later(2000, fn)}>
 *         <ExampleClass someValue={'You made it in ExampleClass'}/>
 *       </StaticConfigWrapper>
 *     </React.Fragment>
 *   )
 *  }
 *  export default App
 */
export const StaticConfigWrapper = ({ children, loader, loadingMsg }) => {
  const [config, setConfig] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  useComponentDidMount(async () => {
    try {
      setIsLoading(true)
      const data = await loader()
      setConfig(data)
    } finally {
      setIsLoading(false)
    }
  })
  return (
    <React.Fragment>
      <Provider value={config}>
        <Consumer>{(config) => (isLoading ? loadingMsg : children)}</Consumer>
      </Provider>
    </React.Fragment>
  )
}
