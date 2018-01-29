import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import * as parseActions from '../parse/actions/cloudCodes';
import consts from '../types';
import {
  getDataFromCloudCode,
  getStatusFromCloudCode,
  getInfoFromCloudCode,
} from '../parse/selectors/cloudCodes';

const { LOADING } = consts;

class FetchCloudCode extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getDataFromServerIsRun = false;
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.onRefreshData = this.onRefreshData.bind(this);
  }
  componentWillMount() {
    const { localFirst, functionName } = this.props;
    if (functionName && (!localFirst || !this.isDataExistOrQueryIsLoading())) {
      this.getDataFromServer();
    }
  }
  componentWillReceiveProps(nextProps) {
    // Params from parent was changed
    if (this.isPropsFromParentChanged(nextProps)) {
      this.getDataFromServer(nextProps);
    }
    // GET DATA FINISH
    if (this.isGetFinish(nextProps)) {
      this.getDataFromServerIsRun = false;
      this.props.onGetFinish({
        queryStatus: nextProps.queryStatus,
        data: nextProps.data,
      });
    }
  }
  // Clean data on Mount
  componentWillUnmount() {
    if (this.props.cleanDataOnComponentWillUnmount) {
      this.removerDataFromStore();
    }
  }
  onRefreshData() {
    this.getDataFromServer(this.props, false);
  }
  getDataFromServer(props = this.props, localOnly = this.props.localOnly) {
    if (localOnly) return;
    if (!props.functionName) return;
    this.getDataFromServerIsRun = true;
    this.props.onGetStart();
    this.props.actions.getCloudCode(
      props.functionName,
      props.collectionTarget,
      props.params,
      props.filterByMemberId,
      props.memberFieldName,
      props.digToDataString,
    );
  }

  isGetFinish(nextProps) {
    if (
      this.props.queryStatus === LOADING &&
      nextProps.queryStatus !== LOADING &&
      (this.getDataFromServerIsRun || this.isDataChanged(nextProps))
    ) {
      return true;
    }
    return false;
  }

  isDataChanged(nextProps) {
    return this.props.data !== nextProps.data;
  }
  isQueryStatusChanged(nextProps) {
    return this.props.queryStatus !== nextProps.queryStatus;
  }
  isPropsFromParentChanged(nextProps) {
    // filters was change, get data from server
    if (this.isParamsChanged(nextProps)) {
      return true;
    }
    // functionName was change, get data from server
    if (this.props.functionName !== nextProps.functionName) {
      return true;
    }
    return false;
  }
  isDataExistOrQueryIsLoading() {
    const { queryStatus, data } = this.props;
    if (data || queryStatus === LOADING) {
      return true;
    }
    return false;
  }
  removerDataFromStore() {
    const keyForData = this.props.collectionTarget || this.props.functionName;
    this.props.actions.removeCloudCode(keyForData);
  }

  isParamsChanged(nextProps) {
    return !isEqual(this.props.params, nextProps.params);
  }

  render() {
    const { data, queryStatus, info } = this.props;
    const refreshData = this.onRefreshData;
    return this.props.render({
      data,
      queryStatus,
      info,
      refreshData,
    });
  }
}

function mapStateToProps(state, props) {
  const keyForData = props.collectionTarget || props.functionName;
  return {
    data: getDataFromCloudCode(state, keyForData),
    queryStatus: getStatusFromCloudCode(state, keyForData),
    info: getInfoFromCloudCode(state, keyForData),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...parseActions }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FetchCloudCode);

FetchCloudCode.propTypes = {
  functionName: PropTypes.string.isRequired,
  collectionTarget: PropTypes.string,
  render: PropTypes.func.isRequired, // render({data, queryStatus, refreshData, deleteDocument, updateDocument})
  params: PropTypes.object,
  onGetStart: PropTypes.func,
  onGetFinish: PropTypes.func,
  cleanDataOnComponentWillUnmount: PropTypes.bool,
  localFirst: PropTypes.bool, // get data from server only if data didn't found in store
  localOnly: PropTypes.bool, // get data only from local store
  digToDataString: PropTypes.string,
};

FetchCloudCode.defaultProps = {
  digToDataString: 'data.result',
  cleanDataOnComponentWillUnmount: true,
  onGetFinish: () => {},
  onGetStart: () => {},
};
