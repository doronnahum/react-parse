(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react-redux', 'redux', './selectors', './actions'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react-redux'), require('redux'), require('./selectors'), require('./actions'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.reactRedux, global.redux, global.selectors, global.actions);
    global.store = mod.exports;
  }
})(this, function (exports, _reactRedux, _redux, _selectors, _actions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  function mapStateToProps(state, props) {
    var targetName = props.targetName,
        objectId = props.objectId,
        uniqueId = props.uniqueId;

    var target = targetName || objectId || uniqueId;
    return {
      fetchData: (0, _selectors.getData)(state, target),
      fetchStatus: (0, _selectors.getStatus)(state, target),
      fetchInfo: (0, _selectors.getInfo)(state, target),
      fetchError: (0, _selectors.getError)(state, target),
      fetchDispatchId: (0, _selectors.getDispatchId)(state, target),
      fetchBoomerang: (0, _selectors.getBoomerang)(state, target)

    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      fetchActions: (0, _redux.bindActionCreators)({
        fetchData: _actions.fetchData,
        deleteDoc: _actions.deleteDoc,
        putDoc: _actions.putDoc,
        postDoc: _actions.postDoc,
        cleanData: _actions.cleanData,
        updateField: _actions.updateField,
        updateFields: _actions.updateFields
      }, dispatch)
    };
  }

  exports.default = function (comp) {
    return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(comp);
  };
});