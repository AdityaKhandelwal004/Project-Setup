import React from 'react';
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './index';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { StyledIconHeadingContainer } from './styles';

jest.mock('../../../assets/images/arrowIcon.svg', () => ({}));
jest.mock('../../../assets/images/sidenavlogo.svg', () => ({}));
jest.mock('../../../assets/images/logout.svg', () => ({}));
jest.mock('../../../assets/images/smallLogo.svg', () => ({}));
jest.mock('../../../assets/images/arrowOpenIcon.svg', () => ({}));
jest.mock('../../../assets/images/backIcon.svg', () => ({}));

describe('Container Component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
      <Router>
        <Container />
      </Router>
      </Provider>
    );
      expect(<Container />).toMatchSnapshot();
    });
      it('renders StyledIconHeadingContainer correctly', () => {
        const wrapper = render(<StyledIconHeadingContainer />);
        expect(wrapper).toMatchSnapshot();
      });
});
