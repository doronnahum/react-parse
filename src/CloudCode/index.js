import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import {getCloudCode, removeCloudCode} from './actions';
import consts from '../types';
import { getData, getStatus, getInfo} from './selectors';
import { isGetFinish} from '../helpers/statusChecker';
import {propTypes, defaultProps} from './prop-types';
const { LOADING } = consts;

class FetchCloudCode extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }
  componentWillMount() {
    const { localFirst, functionName, data, queryStatus } = this.props;
    if(!functionName) return;
    if (!localFirst || (localFirst && !data && queryStatus !== LOADING)) {
      this.getData();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.isPropsFromParentChanged(nextProps)) {
      this.getData(nextProps);
    }

    if (isGetFinish(nextProps)) {
      this.props.onGetFinish({
        queryStatus: nextProps.queryStatus,
        data: nextProps.data,
      });
    }
  }

  componentWillUnmount() {
    if (this.props.leaveClean) {
      this.removerDataFromStore();
    }
  }

  onRefresh() {
    this.getData(this.props, false);
  }

  getData(props = this.props, localOnly = this.props.localOnly) {
    if (localOnly) return;
    if (!props.functionName) return;;
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

  removerDataFromStore() {
    const keyForData = this.props.collectionTarget || this.props.functionName;
    this.props.actions.removeCloudCode(keyForData);
  }

  isParamsChanged(nextProps) {
    return !isEqual(this.props.params, nextProps.params);
  }

  render() {
    const { data, queryStatus, info } = this.props;
    const refreshData = this.onRefresh;
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
    data: getData(state, keyForData),
    queryStatus: getStatus(state, keyForData),
    info: getInfo(state, keyForData),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getCloudCode, removeCloudCode }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FetchCloudCode);

FetchCloudCode.propTypes = propTypes

FetchCloudCode.defaultProps = defaultProps
