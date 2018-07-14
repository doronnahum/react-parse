import { createSelector } from 'reselect';
import { Map } from 'immutable';
import {
  isLoading,
} from '../helpers';

const MAP = Map();

const getTargetName = (state, targetName) => targetName;

// --- Cloud codes ---/
export const getCloudCodes = state => state.parse.cloudCodes;
// -- Get specific collections
const getImmutableCloudCodes = createSelector(
  [getCloudCodes, getTargetName],
  (cloudCodes, targetName) => cloudCodes.get(targetName) || MAP
);
export const getCloudCode = createSelector(
  getImmutableCloudCodes,
  dataImmutable => dataImmutable.toJS()
);
export const getData = createSelector(
  getImmutableCloudCodes,
  dataImmutable => dataImmutable.get('data') && dataImmutable.get('data').toJS()
);
export const getStatus = createSelector(getImmutableCloudCodes, dataImmutable =>
  dataImmutable.get('status')
);
export const getDispatchId = createSelector(getImmutableCloudCodes, dataImmutable =>
  dataImmutable.get('dispatchId')
);
export const getLoading = createSelector(getImmutableCloudCodes, dataImmutable =>
  isLoading(dataImmutable.get('status'))
);
export const getInfo = createSelector(getImmutableCloudCodes, dataImmutable =>
  dataImmutable.get('info')
);
export const getError = createSelector(getImmutableCloudCodes, dataImmutable =>
  dataImmutable.get('error')
);
