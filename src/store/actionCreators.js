import axios from 'axios';
import store from 'store';

export const archivesList = (data = '') => {
  return dispatch => {
    if (!data) {
      axios.get('./md/config/pages.json').then(res => {
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
    if (store.getState().archivesListData) {
      let archivesListData = store.getState().archivesListData;
      if (archivesListData[id]) {
        axios
          .get(archivesListData[id].src)
          .then(res => {
            if (res.data) {
              dispatch({
                type: 'GET_ARCHIVESCONTENT',
                id: id,
                contentData: res.data
              });
            }
          })
          .catch(() => {});
      }
    } else {
      axios.get('./md/config/pages.json').then(res => {
        if (res.data) {
          dispatch({
            type: 'GET_ARCHIVES_LIST',
            archivesListData: res.data
          });
          if (res.data[id]) {
            axios
              .get(res.data[id].src)
              .then(res2 => {
                if (res2.data) {
                  dispatch({
                    type: 'GET_ARCHIVESCONTENT',
                    id: id,
                    contentData: res2.data
                  });
                }
              })
              .catch(() => {});
          }
        }
      });
    }
  };
};

export const getShanbayDay = () => {
  return dispatch => {
    if (!store.getState().shanbayDayData.content) {
      dispatch({
        type: 'GET_SHANBAYDAY',
        shanbayDayData: {
          author: 'Marilyn Ferguson',
          content: 'Your past is not your potential. In any hour you can choose to liberate the future.',
          translation: '你的潜力不在于过去，你随时都可以去解放未来。'
        }
      });
      //因为扇贝没开放数据 前端无法访问此API  等以后有我服务器了再做打算 上面先用静态的
      // axios.get('https://rest.shanbay.com/api/v2/quote/quotes/today/').then(res => {
      //   if (res.data) {
      //     dispatch({
      //       type: 'GET_SHANBAYDAY',
      //       shanbayDayData: {
      //         author: res.data.author,
      //         content: res.data.content,
      //         translation: res.data.translation
      //       }
      //     });
      //   }
      // });
    }
  };
};
