import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentsActions from '../parse/actions/documents';
import * as localDocumentsActions from '../parse/actions/localDocuments';
import consts from '../types';
import {propTypes, defaultprops} from './props-types/document'
import {
  getStatus,
  getData,
  getNewDocumentData,
  getNewDocumentStatus,
} from '../parse/selectors/documents';
import {
  isCreateFinish,
  isDeleteFinish,
  isParamsChanged,
  isUpdateFinish
} from './methods/statusChecker'


class FetchDocument extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.updateField = this.updateField.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onSave = this.onSave.bind(this);
    this.cleanStore = this.cleanStore.bind(this);
  }

  componentWillMount() {
    this.initialState();
  }

  componentWillReceiveProps(nextProps) {
    if (isParamsChanged(this.props, nextProps)) {
      this.initialState(nextProps);
    }
    if (isGetFinish(this.props, nextProps)) {
      nextProps.onGetFinish({
        queryStatus: nextProps.queryStatus,
        data: nextProps.data,
      });
    } else if (isCreateFinish(this.props, nextProps)) {
      nextProps.onCreateFinish({
        status: nextProps.queryStatus.status,
        objectId: nextProps.queryStatus.objectId,
        data: nextProps.queryStatus.data,
      });
    } else if (isDeleteFinish(this.props, nextProps)) {
      nextProps.onDeleteFinish(nextProps.queryStatus);
    } else if (isUpdateFinish(this.props, nextProps)) {
      nextProps.onUpdateFinish(nextProps.queryStatus);
    }
  }

  componentWillUnmount() {
    if (this.props.leaveClean) {
      this.cleanStore();
    }
  }

  onDelete() {
    const { objectId, uniqueId, collectionName, queryStatus } = this.props;
    if(!objectId) return
    if (objectId) {
      if (queryStatus === DELETE_DOCUMENT_START) return;
      this.props.actions.deleteDocument(collectionName, objectId);
    } else {
      this.props.actions.removeNewDocument(this.props.uniqueId);
    }
  }

  onRefresh() {
    this.getData(null, false);
  }

  onSave() {
    if (this.props.objectId) {
      this.updateDocument(this.props)
    } else {
      this.createDocument(this.props)
    }
  }

  createDocument(props){
    props.actions.postNewDocument(
      props.collectionName,
      props.uniqueId,
      props.parseDataBeforeSave,
    );
  }

  updateDocument(props){
    props.actions.updateDocumentOnServer(
      props.collectionName,
      props.objectId,
      null,
      null,
      props.parseDataBeforeSave,
    );
  }

  updateField(key, value) {
    const { objectId, uniqueId, actions } = this.props;
    if (objectId) {
      actions.updateDocumentOnStore(objectId, key, value);
    } else {
      actions.updateNewDocument(uniqueId, key, value);
    }
  }

  getData(props, localOnly = this.props.localOnly) {
    props = props || this.props;
    if (localOnly) return;
    const { collectionName, objectId, include } = props;
    if (!objectId || !collectionName) return;
    this.props.onGetStart();
    this.props.actions.getDocument(collectionName, objectId, include);
  }

  cleanStore() {
    if (this.props.objectId) {
      this.props.actions.removeDocument(this.props.objectId);
    } else {
      this.props.actions.removeNewDocument(this.props.uniqueId);
    }
  }

  createLocalDocument() {
    this.props.onCreateLocalDocument(this.props.uniqueId);
    this.props.actions.createNewDocument(
      this.props.uniqueId,
      this.props.initialValues,
    );
  }

  initialState(props = this.props) {
    const { localFirst, collectionName, objectId } = props;
    if (objectId && collectionName) {
      if (!localFirst || (localFirst && !data)) {
        this.getData(props);
      }
    } else {
      this.createLocalDocument();
    }
  }

  render() {
    const { data, uniqueId, objectId, queryStatus } = this.props;
    const deleteDocument = this.onDelete;
    const updateField = this.updateField;
    const refreshData = this.onRefresh;
    const saveDocument = this.onSave;
    return this.props.render({
      data,
      queryStatus,
      refreshData,
      deleteDocument,
      updateField,
      saveDocument,
      objectId,
      uniqueId,
    });
  }
}

function mapStateToProps(state, props) {
  const { objectId, uniqueId } = props;
  if (objectId) {
    return {
      data: getData(state, objectId),
      queryStatus: getStatus(state, objectId),
    };
  }
  return {
    data: getNewDocumentData(state, uniqueId),
    queryStatus: getNewDocumentStatus(state, uniqueId),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...documentsActions, ...localDocumentsActions },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FetchDocument);
FetchDocument.propTypes = propTypes;
FetchDocument.defaultProps = defaultProps;
