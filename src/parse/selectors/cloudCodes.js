import { createSelector } from 'reselect';
import { Map } from 'immutable';

const MAP = Map();

const getTargetName = (state, targetName) => targetName;

// --- Cloud codes ---/
export const getCloudCodes = state => state.parse.cloudCodes;
// -- Get specific collections
const getImmutableCloudCodes = createSelector(
  [getCloudCodes, getTargetName],
  (cloudCodes, targetName) => cloudCodes.get(targetName) || MAP,
);
export const getDataFromCloudCode = createSelector(
  getImmutableCloudCodes,
  dataImmutable =>
    dataImmutable.get('data') && dataImmutable.get('data').toJS(),
);
export const getStatusFromCloudCode = createSelector(
  getImmutableCloudCodes,
  dataImmutable => dataImmutable.get('status'),
);
export const getInfoFromCloudCode = createSelector(
  getImmutableCloudCodes,
  dataImmutable => dataImmutable.get('info'),
);
