import React from 'react';
import { createUniqueId } from './helpers';
import BaseFetchDocument from './BaseFetchDocument';

export default class FetchDocumentWithUniqueId extends React.PureComponent {
  constructor(props) {
    super(props);
    this.uniqueId = createUniqueId();
  }
  render() {
    return <BaseFetchDocument {...this.props} uniqueId={this.uniqueId} />;
  }
}
