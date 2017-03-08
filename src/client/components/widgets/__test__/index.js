import React from 'react';
import chai from 'chai'; // eslint-disable-line
import { shallow } from 'enzyme'; // eslint-disable-line

import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderLeftElt,
  HeaderRightElt,
  TimeElt,
  Search,
} from '../';

const { describe, it } = global;
const { expect } = chai;


const props = { obj: { createdAt: { fromNow: () => 1  }, updateAt: { fromNow: () => 1  } }, children: [] }

describe('<Header />', () => {
  it('should render a <HeaderElt />', () => {
    expect(shallow(<Header {...props} />)
      .find(HeaderElt)).to.have.lengthOf(1);
  });

});

const leftRightProps = {};

describe('<HeaderLeft />', () => {
  it('should render a <HeaderLeftElt />', () => {
    expect(shallow(<HeaderLeft {...leftRightProps} />)
      .find(HeaderLeftElt)).to.have.lengthOf(1);
  });

});

describe('<HeaderRight />', () => {
  it('should render a <HeaderRightElt />', () => {
    expect(shallow(<HeaderRight {...leftRightProps} />)
      .find(HeaderRightElt)).to.have.lengthOf(1);
  });

});
