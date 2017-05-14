import {Container} from 'flux/utils';
import store from './BlogStore';
import action from './BlogActions';
import App from "./App";

function getStores() {
  return [store];
}

function getState() {
  return store.getState().merge(action).toObject();
}




export default Container.createFunctional(App, getStores, getState);
