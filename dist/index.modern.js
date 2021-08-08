import React, { createContext, useState, useEffect } from 'react';

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

// Asynchronously await a promise and pass the result to a finally continuation
function _finallyRethrows(body, finalizer) {
	try {
		var result = body();
	} catch (e) {
		return finalizer(true, e);
	}
	if (result && result.then) {
		return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
	}
	return finalizer(false, result);
}

var Context = createContext(null);
var Provider = Context.Provider;
var Consumer = Context.Consumer;

var useComponentDidMount = function useComponentDidMount(onMountHandler) {
  useEffect(function () {
    onMountHandler();
  }, []);
};

var ConfigPropExtenderHoc = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ConfigPropExtenderHoc, _React$Component);

  function ConfigPropExtenderHoc() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ConfigPropExtenderHoc.prototype;

  _proto.render = function render() {
    return React.cloneElement(this.props.children, {
      config: this.context
    });
  };

  return ConfigPropExtenderHoc;
}(React.Component);
ConfigPropExtenderHoc.contextType = Context;
var StaticConfigWrapper = function StaticConfigWrapper(_ref) {
  var children = _ref.children,
      loader = _ref.loader,
      loadingMsg = _ref.loadingMsg;

  var _useState = useState(undefined),
      config = _useState[0],
      setConfig = _useState[1];

  var _useState2 = useState(true),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  useComponentDidMount(function () {
    try {
      var _temp2 = _finallyRethrows(function () {
        return _catch(function () {
          setIsLoading(true);
          return Promise.resolve(loader()).then(function (data) {
            setConfig(data);
          });
        }, function () {});
      }, function (_wasThrown, _result) {
        setIsLoading(false);
        if (_wasThrown) throw _result;
        return _result;
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Provider, {
    value: config
  }, /*#__PURE__*/React.createElement(Consumer, null, function (config) {
    return isLoading ? loadingMsg : children;
  })));
};

export { ConfigPropExtenderHoc, Consumer, Context, Provider, StaticConfigWrapper };
//# sourceMappingURL=index.modern.js.map
