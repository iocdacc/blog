const defaultState = {
  shanbayDayData: {
    author: '',
    content: '',
    translation: ''
  },
  archivesListData: '',
  tagData: '',
  projectsData: ''
};

function counter(state = defaultState, action) {
  var newState;
  switch (action.type) {
    case 'GET_ARCHIVES_LIST':
      newState = JSON.parse(JSON.stringify(state));
      newState.archivesListData = action.archivesListData;
      return newState;
    case 'GET_ARCHIVESCONTENT':
      newState = JSON.parse(JSON.stringify(state));
      newState.archivesListData[action.id].contentData = action.contentData;
      return newState;
    case 'GET_SHANBAYDAY':
      newState = JSON.parse(JSON.stringify(state));
      newState.shanbayDayData = action.shanbayDayData;
      return newState;
    case 'GET_TAG':
      newState = JSON.parse(JSON.stringify(state));
      newState.tagData = action.tagData;
      return newState;
    case 'GET_PROJECTS':
      newState = JSON.parse(JSON.stringify(state));
      newState.projectsData = action.projectsData;
      return newState;
    default:
      return state;
  }
}

export default counter;
