import { createSelector } from 'reselect';
import { Map } from 'immutable';
import {
  isLoading,
} from '../helpers';
const MAP = Map();

const getTargetName = (state, targetName) => targetName;

export const getDocuments = state => state.parse.documents;

const getImmutableDoc = createSelector(
  [getDocuments, getTargetName],
  (documents, targetName) => documents.get(targetName) || MAP
);

export const getDocument = createSelector(
  getImmutableDoc,
  dataImmutable => dataImmutable.toJS()
);
export const getData = createSelector(
  getImmutableDoc,
  dataImmutable => dataImmutable.get('data') && dataImmutable.get('data').toJS()
);

export const getStatus = createSelector(getImmutableDoc, dataImmutable =>
  dataImmutable.get('status')
);
export const getDispatchId = createSelector(getImmutableDoc, dataImmutable =>
  dataImmutable.get('dispatchId')
);
export const getBoomerang = createSelector(getImmutableDoc, dataImmutable =>
  dataImmutable.get('boomerang')
);
export const getLoading = createSelector(getImmutableDoc, dataImmutable =>
  isLoading(dataImmutable.get('status'))
);

export const getInfo = createSelector(getImmutableDoc, dataImmutable =>
  dataImmutable.get('info')
);

export const getError = createSelector(getImmutableDoc, dataImmutable =>
  dataImmutable.get('error')
);
