import React, { createContext, useEffect, useState } from 'react';
export const Context = createContext(null)
export const { Provider, Consumer } = Context;
const useComponentDidMount = onMountHandler => {
  useEffect(() => {
    onMountHandler();
  }, []);
};

/**
 * Use this Wrapper ( HOC ) to copy the `config` onto the properties of the first level
 * of children it encapsulates. Because `contextType` can not be added to JSX functions, you
 * will need to wrap or extend the function to inject the config value. This HOC, simple clones
 * the JSX element, and copies the context's 'config' values as properties.
 */
export class ConfigPropExtenderHoc extends React.Component {
  static contextType = Context;
  render() {
    return React.cloneElement(
      this.props.children,
      {config:this.context}
    )
  }
}

/**
 * Callback responsible for fetching the external configuration. Becuase it is a promise, the
 * user can add a 'then' to transform the payload.
 *
 * @callback loaderCall
 * @return {Promise<any>}
 */

/**
 * StaticConfigWrapper - is everything wrapped up in one call. I
 * expect this will satisfy the majority of scenarios. However, for those that
 * it does not, the Provider, Consumer, and Context are all broken out. If you
 * find you really need them, this might not be a good solution for your project.
 *
 * @param {JSX.Element} [children=null] - All the JSX children, or null. the default value is null.
 * @param {loaderCall} loader - Required function that will "load" the static configuration, it is
 * assumed the call will return a Promise, that can include a value of rejection.
 * @param {JSX.Element} [loadingMsg=null] - The optional JSX that will be displayed while the
 * loader is running.
 * @return {JSX.Element}
 * @constructor
 */
export const StaticConfigWrapper = ({ children, loader, loadingMsg }) => {
  const [config, setConfig] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  useComponentDidMount(async () => {
    try {
      setIsLoading(true);
      const data = await loader();
      setConfig(data);
    } catch (e) {
    } finally {
      setIsLoading(false)
    }
  });
  return <React.Fragment>
    <Provider value={config}>
      <Consumer>{ config => (isLoading) ? loadingMsg : children }</Consumer>
    </Provider>
  </React.Fragment>
};

