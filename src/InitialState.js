const { Record, Map } = require('immutable');

const InitialState = Record({
  collections: Map(),
  cloudCodes: Map(),
  documents: Map()
});

export default InitialState;
