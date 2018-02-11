import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import * as parseActions from '../parse/actions/cloudCodes';
import consts from '../types';
import { getData, getStatus, getInfo} from '../parse/selectors/cloudCodes';
import { isGetFinish} from './methods/statusChecker'
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
  leaveClean: PropTypes.bool,
  localFirst: PropTypes.bool, // get data from server only if data didn't found in store
  localOnly: PropTypes.bool, // get data only from local store
  digToDataString: PropTypes.string,
};

FetchCloudCode.defaultProps = {
  digToDataString: 'data.result',
  leaveClean: true,
  onGetFinish: () => {},
  onGetStart: () => {},
};
