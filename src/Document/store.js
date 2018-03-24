import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getData, getStatus, getInfo, getError } from './selectors';
import {
  fetchData,
  deleteDoc,
  putDoc,
  postDoc,
  cleanData,
  updateField
} from './actions';

function mapStateToProps(state, props) {
  const { targetName, objectId, uniqueId } = props;
  const target = targetName || (objectId || uniqueId);
  return {
    fetchData: getData(state, target),
    fetchtatus: getStatus(state, target),
    fetchInfo: getInfo(state, target),
    fetchError: getError(state, target)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchActions: bindActionCreators(
      {
        fetchData,
        deleteDoc,
        putDoc,
        postDoc,
        cleanData,
        updateField
      },
      dispatch
    )
  };
}

export default comp => connect(mapStateToProps, mapDispatchToProps)(comp);