import {ReduceStore} from 'flux/utils';
import dispatcher from './BlogDispatcher';
import {Map} from "immutable";
import actionTypes from "./AppActionTypes";


class AppStore extends ReduceStore {

  getInitialState() {
    return Map({
      articles: [],
      activeMenuItem: "Home",

      counterNumber: 0,
    });
  }




  reduce(state, action) {
    console.log(action);
    if (action.type === 'blog-articles') {
      return state.set('articles', action.value)
    } else if (action.type === actionTypes.INCREMENT) {
      return state.set('counterNumber', state.get('counterNumber') +1 );
    } else if (action.type === actionTypes.SEARCH_RESULTS) {
      return state.set('album', action.value);
    } else if (action.type === actionTypes.CHANGE_ACTIVE_MENU_ITEM) {
      return state.set('activeMenuItem', action.value);
    } else {
      return state
    }
  };
}
export default new AppStore(dispatcher);
