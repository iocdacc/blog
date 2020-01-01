const defaultState = {
  archivesListData: '',
  archiveContentData: {
    contentData: '',
    url: '',
    id: ''
  }
};

function counter(state = defaultState, action) {
  var newState;
  switch (action.type) {
    case 'GET_ARCHIVES_LIST':
      newState = JSON.parse(JSON.stringify(state));
      newState.archivesListData = action.archivesListData;
      return newState;
    case 'GET_ARCHIVESCONTENT_LIST':
      newState = JSON.parse(JSON.stringify(state));
      newState.archiveContentData = action.archiveContentData;
      newState.archivesListData = action.archivesListData;
      return newState;
    default:
      return state;
  }
}

export default counter;
