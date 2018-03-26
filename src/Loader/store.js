import { connect } from 'react-redux';
import { showLoader } from './selectors';

function mapStateToProps(state, props) {
  return {
    showLoader: showLoader(state)
  };
}

export default comp => connect(mapStateToProps, null)(comp);