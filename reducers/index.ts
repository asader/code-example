import { combineReducers } from 'redux';

import blocks from './blocks';

const editor = combineReducers({
  blocks,
});

export default editor;
