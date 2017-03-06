import { combineReducers } from 'redux';
import tags from './tags';
import companies from './companies';
import message from './message';
import notes from './notes'
import cities from './cities';
import countries from './countries';

export default combineReducers({
  tags,
  companies,
  message,
  notes,
  countries,
  cities,
});
