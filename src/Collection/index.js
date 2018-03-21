import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, deleteDoc, putDoc, postDoc, cleanData } from './actions';
import { getData, getStatus, getInfo, getError } from './selectors';

import {
  isTargetChanged,
  isFetchFinish,
  isLoading,
  isDeleteFinish,
  isUpdateFinish,
  isCreateFinish,
  isCollectionParamsChanged
} from '../helpers';

import { defaultProps, propTypes } from './prop-types';

class FetchCollection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onPut = this.onPut.bind(this);
    this.onPost = this.onPost.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentWillMount() {
    const { schemaName, localFirst, data } = this.props;
    if (schemaName && (!localFirst || (localFirst && !data))) {
      this.fetchData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (isCollectionParamsChanged(this.props, nextProps)) {
      if (isTargetChanged(this.props, nextProps)) {
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

  onDelete(objectId) {
    const { actions, schemaName, targetName } = this.props;
    if (!objectId) {
      console.warn('onDelete: missing objectId ');
      return;
    }
    actions.deleteDoc({ schemaName, targetName, objectId });
  }

  onPut(objectId, data) {
    const { actions, schemaName, targetName } = this.props;
    if (!objectId) {
      console.warn('onUpdateDoc: missing objectId ');
      return;
    }
    if (!data || typeof data !== 'object') {
      console.warn('onUpdateDoc: missing data object ');
      return;
    }
    actions.putDoc({ schemaName, targetName, objectId, data });
  }
  onPost(data) {
    const { actions, schemaName, targetName } = this.props;
    if (!data || typeof data !== 'object') {
      console.warn('onPost: missing data object ');
      return;
    }
    actions.postDoc({ schemaName, targetName, data });
  }

  onRefresh() {
    debugger;
    this.fetchData(this.props, false);
  }

  fetchData(props = this.props, localOnly = this.props.localOnly) {
    const {
      targetName,
      schemaName,
      query,
      limit,
      skip,
      enableCount,
      keys,
      include,
      order
    } = props;
    if (localOnly || !props.schemaName) {
      return;
    }
    props.actions.fetchData({
      targetName,
      schemaName,
      query,
      limit,
      skip,
      enableCount,
      keys,
      include,
      order
    });
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
    const targetName = this.props.targetName || this.props.schemaName;
    this.props.actions.cleanData({ targetName });
  }

  render() {
    const { data, queryStatus, info, error } = this.props;
    return this.props.render(error, {
      data,
      isLoading: isLoading(queryStatus),
      queryStatus,
      info,
      refresh: this.onRefresh,
      delete: this.onDelete,
      put: this.onPut,
      post: this.onPost
    });
  }
}

function mapStateToProps(state, props) {
  const keyForData = props.targetName || props.schemaName;
  return {
    data: getData(state, keyForData),
    queryStatus: getStatus(state, keyForData),
    info: getInfo(state, keyForData),
    error: getError(state, keyForData)
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
        cleanData
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchCollection);
FetchCollection.propTypes = propTypes;

FetchCollection.defaultProps = defaultProps;
