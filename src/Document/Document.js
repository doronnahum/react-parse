import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  fetchData,
  deleteDoc,
  putDoc,
  postDoc,
  cleanData,
  updateField,
} from './actions';
import { propTypes, defaultProps } from './prop-types';
import { getData, getStatus, getInfo, getError } from './selectors';

import {
  isDocTargetChanged,
  isFetchFinish,
  isLoading,
  isDeleteFinish,
  isUpdateFinish,
  isCreateFinish,
  isDocumentParamsChanged,
} from '../helpers';

class FetchDocument extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.updateField = this.updateField.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onPostDoc = this.onPostDoc.bind(this);
    this.onPutDoc = this.onPutDoc.bind(this);
    this.cleanData = this.cleanData.bind(this);
  }

  componentWillMount() {
    const { localFirst, data, objectId } = this.props;
    if (objectId && (!localFirst || (localFirst && !data))) {
      this.fetchData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isDocumentParamsChanged(this.props, nextProps)) {
      if (isDocTargetChanged(this.props, nextProps)) {
        this.cleanData();
      }
      this.fetchData(nextProps);
    }
    this.handleCallBacks(this.props, nextProps);
  }

  componentWillUnmount() {
    if (this.props.leaveClean) {
      this.cleanData();
    }
  }

  onDelete() {
    const { objectId, schemaName, targetName } = this.props;
    this.props.actions.deleteDocument(targetName, schemaName, objectId);
  }

  onRefresh() {
    this.fetchData(null, false);
  }

  onPutDoc() {
    const {
      actions,
      targetName,
      schemaName,
      data,
      objectId,
      parseDataBeforeSubmit,
    } = this.props;
    const target = targetName || objectId;
    const dataToSend = parseDataBeforeSubmit
      ? parseDataBeforeSubmit(data)
      : data;
    actions.putDoc({
      targetName: target,
      schemaName,
      data: dataToSend,
      objectId,
    });
  }

  onPostDoc() {
    const {
      actions,
      targetName,
      schemaName,
      data,
      uniqueId,
      parseDataBeforeSubmit,
    } = this.props;
    const target = targetName || uniqueId;
    const dataToSend = parseDataBeforeSubmit
      ? parseDataBeforeSubmit(data)
      : data;
    actions.postDoc({ targetName: target, schemaName, data: dataToSend });
  }

  fetchData(props = this.props, localOnly = this.props.localOnly) {
    const { targetName, schemaName, objectId, include, keys } = props;
    if (localOnly || !objectId || !schemaName) {
      return;
    }
    this.props.actions.fetchData({
      targetName,
      schemaName,
      objectId,
      include,
      keys,
    });
  }

  updateField(key, value) {
    const { objectId, uniqueId } = this.props;
    if (objectId) {
      this.props.actions.updateDocumentOnStore(objectId, key, value);
    } else {
      this.props.actions.updateNewDocument(uniqueId, key, value);
    }
  }

  handleCallBacks(props, nextProps) {
    const { queryStatus, data, info, error, autoRefresh } = nextProps;
    if (isFetchFinish(props, nextProps)) {
      props.onFetchEnd(error, { queryStatus, data, info });
    } else if (isDeleteFinish(props, nextProps)) {
      if (autoRefresh) this.fetchData(nextProps);
      props.onDeleteEnd(error, { queryStatus, data, info });
    } else if (isUpdateFinish(props, nextProps)) {
      if (autoRefresh) this.fetchData(nextProps);
      props.onPutEnd(error, { queryStatus, data, info });
    } else if (isCreateFinish(props, nextProps)) {
      if (autoRefresh) this.fetchData(nextProps);
      props.onPostEnd(error, { queryStatus, data, info });
    }
  }

  cleanData() {
    const { targetName, objectId, uniqueId } = this.props;
    const target = targetName || (objectId || uniqueId);
    this.props.actions.cleanData(target);
  }

  render() {
    const { data, queryStatus, info, error, objectId } = this.props;
    return this.props.render(error, {
      data,
      isLoading,
      queryStatus,
      info,
      refreshData: this.onRefreshData,
      deleteDoc: objectId && this.onDeleteDoc,
      cleanData: objectId || this.cleanStore,
      putDoc: objectId && this.onPutDoc,
      postDoc: objectId || this.onPostDoc,
    });
  }
}

function mapStateToProps(state, props) {
  const { targetName, objectId, uniqueId } = props;
  const target = targetName || (objectId || uniqueId);
  return {
    data: getData(state, target),
    queryStatus: getStatus(state, target),
    info: getInfo(state, target),
    error: getError(state, target),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        fetchData,
        deleteDoc,
        putDoc,
        postDoc,
        cleanData,
        updateField,
      },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchDocument);
FetchDocument.propTypes = propTypes;
FetchDocument.defaultProps = defaultProps;
