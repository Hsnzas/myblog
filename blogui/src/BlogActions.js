import dispatcher from './BlogDispatcher';
import debounce from 'debounce';
import appActions  from './AppActionTypes'

const action = {
  fetchArticles: () => {
    console.log("fetching...");
    const url = 'http://127.0.0.1:8000/api/articles.json'
    fetch(url).then(resp => {
      console.log(resp)
      if (resp.ok) {
        return resp.json();
      }
    }).then(json => {
      console.log(json);
      dispatcher.dispatch({
        type: 'blog-articles',
        value: json
      });
    })
  },
  doIncrement: () => dispatcher.dispatch({
      type: appActions.INCREMENT
    },
  ),
  changeActiveMenuItem: (menuItem) => dispatcher.dispatch({
    type: appActions.CHANGE_ACTIVE_MENU_ITEM,
    value: menuItem
  }),
  savedlocation: (lat, lng) => dispatcher.dispatch({
    type: appActions.ADD_COORDS,
    value: [lat, lng]
  })
};

export default action;