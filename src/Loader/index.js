import React, { createElement } from 'react';
import { propTypes, defaultProps } from './prop-types';
import connect from './store';

class ShowLoader extends React.Component {

  render() {
    const { showLoader, component} = this.props;
    if(component){
      return createElement(component, {showLoader})
    }
    return this.props.render(showLoader);
  }
}

export default connect(ShowLoader);

ShowLoader.propTypes = propTypes;

ShowLoader.defaultProps = defaultProps;
