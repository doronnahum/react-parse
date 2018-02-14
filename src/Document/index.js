import React from 'react';
import { createUniqueId } from '../helpers';
import BaseDocument from './BaseDocument';

export default class FetchDocumentWithUniqueId extends React.PureComponent {
  constructor(props) {
    super(props);
    this.uniqueId = this.props.uniqueId || createUniqueId();
  }
  render() {
    return <BaseDocument {...this.props} uniqueId={this.uniqueId} />;
  }
}
