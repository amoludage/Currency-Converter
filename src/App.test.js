import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('Component: App', () => {

  it('should match its empty snapshot', () => {
    const tree = renderer.create(
      <App />
     ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});