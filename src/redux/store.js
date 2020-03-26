//The store file is responsible for bundling reducers to make them available to the rest of your application. In many cases, it will look just like this
import {createStore} from 'redux';
import reducer from './reducer';

export default createStore(reducer);