import React from 'react';
import { shallow } from 'enzyme';

import { HomePage } from '.';

describe('HomePage', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toMatchSnapshot();
  });
});