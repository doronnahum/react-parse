import { createSelector } from 'reselect';
import {
  isLoading,
} from '../helpers';
import { Map } from 'immutable';

const MAP = Map();

const getTargetName = (state, targetName) => targetName;

export const getCollections = state => state.parse.collections;

const getImmutableCollection = createSelector(
  [getCollections, getTargetName],
  (collections, targetName) => collections.get(targetName) || MAP
);

export const getData = createSelector(
  getImmutableCollection,
  dataImmutable => dataImmutable.get('data') && dataImmutable.get('data').toJS()
);

export const getStatus = createSelector(getImmutableCollection, dataImmutable =>
  dataImmutable.get('status')
);
export const getLoading = createSelector(getImmutableCollection, dataImmutable =>
  isLoading(dataImmutable.get('status'))
);

export const getInfo = createSelector(getImmutableCollection, dataImmutable =>
  dataImmutable.get('info')
);
export const getCount = createSelector(getImmutableCollection, dataImmutable =>
  dataImmutable.get('info').count
);

export const getError = createSelector(getImmutableCollection, dataImmutable =>
  dataImmutable.get('error')
);
