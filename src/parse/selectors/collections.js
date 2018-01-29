import { createSelector } from 'reselect';
import { Map } from 'immutable';

const MAP = Map();

const getTargetName = (state, targetName) => targetName;
// --- Collections ---/
// -- Get all collections
export const getCollections = state => state.parse.collections;

const getImmutableCollection = createSelector(
  [getCollections, getTargetName],
  (collections, targetName) => collections.get(targetName) || MAP,
);
// -- Get specific collections
export const getCollectionData = createSelector(
  getImmutableCollection,
  dataImmutable =>
    dataImmutable.get('data') && dataImmutable.get('data').toJS(),
);
export const getCollectionStatus = createSelector(
  getImmutableCollection,
  dataImmutable => dataImmutable.get('status'),
);
export const getCollectionInfo = createSelector(
  getImmutableCollection,
  dataImmutable => dataImmutable.get('info'),
);
