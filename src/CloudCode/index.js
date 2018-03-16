import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData, cleanData } from './actions';
import { getData, getStatus, getInfo, getError } from './selectors';
import {
  isCloudCodePropsChanged,
  isTargetChanged,
  isFetchFinish,
  isLoading,
} from '../helpers';
import { propTypes, defaultProps } from './prop-types';

class FetchCloudCode extends React.PureComponent {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }
  componentWillMount() {
    const { localFirst, functionName, data, queryStatus } = this.props;
    if (!functionName) return;
    if (!localFirst || (localFirst && !data && !isLoading(queryStatus))) {
      this.fetchData();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { queryStatus, data, error } = nextProps;
    if (isCloudCodePropsChanged(this.props, nextProps)) {
      if (isTargetChanged(this.props, nextProps)) {
        this.cleanData();
      }
      this.fetchData(nextProps);
    } else if (isFetchFinish(this.props, nextProps)) {
      this.props.onFetchEnd(error, { data, queryStatus });
    }
  }

  componentWillUnmount() {
    if (this.props.leaveClean) {
      this.cleanData();
    }
  }

  onRefresh() {
    this.fetchData(this.props, false);
  }

  fetchData(props = this.props, localOnly = this.props.localOnly) {
    const { functionName, collectionTarget, params, digToData } = props;
    if (localOnly || !props.functionName) return;
    props.actions.fetchData({
      functionName,
      collectionTarget,
      params,
      digToData,
    });
  }

  cleanData() {
    const targetName = this.props.targetName || this.props.functionName;
    this.props.actions.cleanData({ targetName });
  }

  render() {
    const { data, queryStatus, info, error } = this.props;
    return this.props.render(error, {
      data,
      queryStatus,
      isLoading: isLoading(queryStatus),
      info,
      refreshData: this.onRefresh,
    });
  }
}

function mapStateToProps(state, props) {
  const keyForData = props.collectionTarget || props.functionName;
  return {
    data: getData(state, keyForData),
    queryStatus: getStatus(state, keyForData),
    info: getInfo(state, keyForData),
    error: getError(state, keyForData),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchData, cleanData }, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FetchCloudCode);

FetchCloudCode.propTypes = propTypes;

FetchCloudCode.defaultProps = defaultProps;
