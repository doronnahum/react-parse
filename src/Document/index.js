import React from 'react';
import PropsTypes from 'prop-types';
import { createUniqueId } from '../helpers';
import Document from './Document';

export default class FetchDocumentWithUniqueId extends React.PureComponent {
  constructor(props) {
    super(props);
    this.uniqueId = this.props.uniqueId || createUniqueId();
  }
  render() {
    return <Document {...this.props} uniqueId={`LOCAL: ${this.uniqueId}`} />;
  }
}

FetchDocumentWithUniqueId.propTypes = {
  uniqueId: PropsTypes.string
};
