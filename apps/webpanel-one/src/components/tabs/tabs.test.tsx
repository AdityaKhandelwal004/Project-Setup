import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomTabs from './index';
import {
  StyledTabsItem,
  StyledTabsContainer,
  StyledTabsInnerContainer,
  StyledTabsHeaderContainer,
  StyledContentContainer,
  StyledTabsHeading,
  StyledTabsSubHeading,
  StyledGridButtonItem,
} from './styles';
import { BrowserRouter as Router } from 'react-router-dom';

const mockUseLocationValue = {
  pathname: '/testroute',
  search: '',
  hash: '',
  state: '',
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue;
  }),
}));

describe('CustomTabs Component', () => {
  const headerItems = [
    { key: 'item1', label: 'Item 1' },
    { key: 'item2', label: 'Item 2' },
  ];

  it('renders without crashing', () => {
    const { container } = render(
      <Router>
        <CustomTabs headerItems={headerItems} orientation="horizontal" />
      </Router>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders correct number of tabs', () => {
    render(
      <Router>
        <CustomTabs headerItems={headerItems} orientation="horizontal" />
      </Router>
    );
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(headerItems.length);
  });

  it('renders correct tab labels', () => {
    render(
      <Router>
        <CustomTabs headerItems={headerItems} orientation="horizontal" />
      </Router>
    );
    headerItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });
});

describe('Styled Components', () => {
  it('renders StyledTabsItem correctly', () => {
    const wrapper = render(<StyledTabsItem />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledTabsContainer correctly', () => {
    const wrapper = render(<StyledTabsContainer />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledTabsInnerContainer correctly', () => {
    const wrapper = render(<StyledTabsInnerContainer />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledTabsHeaderContainer correctly', () => {
    const wrapper = render(<StyledTabsHeaderContainer />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledContentContainer correctly', () => {
    const wrapper = render(<StyledContentContainer />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledTabsHeading correctly', () => {
    const wrapper = render(<StyledTabsHeading />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledTabsSubHeading correctly', () => {
    const wrapper = render(<StyledTabsSubHeading />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledGridButtonItem correctly', () => {
    const wrapper = render(<StyledGridButtonItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
