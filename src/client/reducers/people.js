import { PEOPLE_LOADED } from '../actions/people';
import R from 'ramda';

const make = (person) => {
  const updatedPerson = {
    ...person,
    typeName: 'person',
  };
  return updatedPerson;
}

const makeAll = R.map(make);
const makePoeple = R.compose(R.fromPairs, R.map(c => [c._id, c]), makeAll);

const people = (state = { data: [] }, action) => {
  switch (action.type) {
    case PEOPLE_LOADED:
      return { data: makePoeple(action.payload) };
    default:
      return state;
  }
};

export default people;