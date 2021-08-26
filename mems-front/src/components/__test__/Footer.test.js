import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Footer from '../Footer.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Footer />, div);
});

it('matches the previous snapshot', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
});
