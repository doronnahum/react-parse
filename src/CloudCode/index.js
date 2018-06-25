import React, { createElement } from 'react';
import {
  isCloudCodePropsChanged,
  isTargetChanged,
  isFetchFinish,
  isLoading,
  removeLocalKeys
} from '../helpers';
import { propTypes, defaultProps } from './prop-types';
import connect from './store';

class FetchCloudCode extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }
  componentWillMount() {
    const { localFirst, functionName, fetchData, fetchStatus } = this.props;
    if (!functionName) return;
    if (!localFirst || (localFirst && !fetchData && !isLoading(fetchStatus))) {
      this.fetchData();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchStatus, fetchData, fetchError } = nextProps;
    if (isCloudCodePropsChanged(this.props, nextProps)) {
      if (isTargetChanged(this.props, nextProps)) {
        this.cleanData();
      }
      this.fetchData(nextProps);
    } else if (isFetchFinish(this.props, nextProps)) {
      this.props.onFetchEnd({error: fetchError, status: fetchStatus, data: fetchData });
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
    const { functionName, targetName, params, digToData, dataHandler } = props;
    if (localOnly || !props.functionName) return;
    props.fetchActions.fetchData({
      functionName,
      targetName,
      params,
      digToData,
      dataHandler
    });
  }

  cleanData() {
    const targetName = this.props.targetName || this.props.functionName;
    this.props.fetchActions.cleanData({ targetName });
  }

  render() {
    const { fetchData, fetchStatus, fetchInfo, fetchError, component } = this.props;
    let props = removeLocalKeys(this.props);
    let propsToPass = Object.assign(props, {
      fetchProps: {
      data: fetchData,
      error: fetchError,
      status: fetchStatus,
      info: fetchInfo,
      isLoading: isLoading(fetchStatus),
      refresh: this.onRefresh,
      }
    })
    if(component){
      return createElement(component, propsToPass)
    }
    return this.props.render(propsToPass);
  }
}

export default connect(FetchCloudCode);

FetchCloudCode.propTypes = propTypes;

FetchCloudCode.defaultProps = defaultProps;
