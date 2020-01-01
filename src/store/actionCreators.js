import axios from 'axios';
import store from 'store';

export const archivesList = (data = '') => {
  return dispatch => {
    if (!data) {
      axios.get('/md/pages.json').then(res => {
        if (res.data) {
          dispatch({
            type: 'GET_ARCHIVES_LIST',
            archivesListData: res.data
          });
        }
      });
    }
  };
};

export const archiveContent = id => {
  return dispatch => {
    store.getState().archivesListData
      ? axios.get(store.getState().archivesListData[id].src).then(res => {
          if (res.data) {
            dispatch({
              type: 'GET_ARCHIVESCONTENT_LIST',
              archiveContentData: {
                contentData: res.data,
                src: res.src
              },
              archivesListData: store.getState().archivesListData
            });
          }
        })
      : axios.get('/md/pages.json').then(res => {
          if (res.data) {
            axios.get(res.data[id].src).then(res2 => {
              if (res2.data) {
                dispatch({
                  type: 'GET_ARCHIVESCONTENT_LIST',
                  archiveContentData: {
                    contentData: res2.data,
                    src: res.data[id].src
                  },
                  archivesListData: res.data
                });
              }
            });
          }
        });
  };
};
