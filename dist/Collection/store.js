(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react-redux', 'redux', './actions', './selectors'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react-redux'), require('redux'), require('./actions'), require('./selectors'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.reactRedux, global.redux, global.actions, global.selectors);
    global.store = mod.exports;
  }
})(this, function (exports, _reactRedux, _redux, _actions, _selectors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  function mapStateToProps(state, props) {
    var keyForData = props.targetName || props.schemaName;
    return {
      fetchData: (0, _selectors.getData)(state, keyForData),
      fetchStatus: (0, _selectors.getStatus)(state, keyForData),
      fetchInfo: (0, _selectors.getInfo)(state, keyForData),
      fetchError: (0, _selectors.getError)(state, keyForData),
      fetchCount: (0, _selectors.getCount)(state, keyForData),
      fetchDispatchId: (0, _selectors.getDispatchId)(state, keyForData),
      fetchBoomerang: (0, _selectors.getBoomerang)(state, keyForData)
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      fetchActions: (0, _redux.bindActionCreators)({
        fetchData: _actions.fetchData,
        deleteDoc: _actions.deleteDoc,
        putDoc: _actions.putDoc,
        postDoc: _actions.postDoc,
        cleanData: _actions.cleanData
      }, dispatch)
    };
  }

  exports.default = function (comp) {
    return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(comp);
  };
});