import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Context = createContext(null);
const Provider = Context.Provider;
const Consumer = Context.Consumer;

const useComponentDidMount = onMountHandler => {
  useEffect(() => {
    async function asyncOnMountHandler() {
      await onMountHandler();
    }

    asyncOnMountHandler();
  }, []);
};

class ConfigPropExtenderHoc extends React.Component {
  render() {
    var _this$props;

    const propName = ((_this$props = this.props) === null || _this$props === void 0 ? void 0 : _this$props.propName) || 'config';
    return React.cloneElement(this.props.children, {
      [propName]: this.context
    });
  }

}
ConfigPropExtenderHoc.contextType = Context;
ConfigPropExtenderHoc.propTypes = {
  children: PropTypes.element.isRequired,
  propName: PropTypes.string
};
ConfigPropExtenderHoc.defaultProps = {
  propName: 'config'
};
const StaticConfigWrapper = ({
  children,
  loader,
  loadingMsg
}) => {
  const [config, setConfig] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  useComponentDidMount(async () => {
    try {
      setIsLoading(true);
      const data = await loader();
      setConfig(data);
    } finally {
      setIsLoading(false);
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Provider, {
    value: config
  }, /*#__PURE__*/React.createElement(Consumer, null, config => isLoading ? loadingMsg : children)));
};
StaticConfigWrapper.propTypes = {
  children: PropTypes.element,
  loader: PropTypes.func.isRequired,
  loadingMsg: PropTypes.element
};

export { ConfigPropExtenderHoc, Consumer, Context, Provider, StaticConfigWrapper };
//# sourceMappingURL=index.modern.js.map
