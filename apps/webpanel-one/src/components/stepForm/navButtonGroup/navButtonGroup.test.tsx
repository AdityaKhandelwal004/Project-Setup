import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavButtonGroup from '.';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { setCurrentStep } from '../../../redux/actions';

const mockStore = configureStore([]);

describe('NavButtonGroup component', () => {
  test('renders Back button when currentFormIndex is greater than 0', () => {
    const initialState = {
      stepForm: {
        currentPage: 1,
      },
    };
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <NavButtonGroup formLength={3} />
      </Provider>
    );

    const backButton = getByText('Back');
    expect(backButton).toBeInTheDocument();
  });

  test('renders Next button when currentFormIndex is less than formLength - 1', () => {
    const initialState = {
      stepForm: {
        currentPage: 1,
      },
    };
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <NavButtonGroup formLength={3} />
      </Provider>
    );

    const nextButton = getByText('Next');
    expect(nextButton).toBeInTheDocument();
  });

  test('calls setCurrentStep for Next page if Next is clicked', () => {
    const initialState = {
      stepForm: {
        currentPage: 1,
      },
    };
    const store = mockStore(initialState);

    store.dispatch = jest.fn();

    const { getByText } = render(
      <Provider store={store}>
        <NavButtonGroup formLength={3} />
      </Provider>
    );

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);

    expect(store.dispatch).toHaveBeenCalledWith(setCurrentStep(2));
  });

  test('calls setCurrentStep for previous page if back is clicked', () => {
    const initialState = {
      stepForm: {
        currentPage: 2,
      },
    };
    const store = mockStore(initialState);

    store.dispatch = jest.fn();

    const { getByText } = render(
      <Provider store={store}>
        <NavButtonGroup formLength={3} />
      </Provider>
    );

    const backButton = getByText('Back');
    fireEvent.click(backButton);

    expect(store.dispatch).toHaveBeenCalledWith(setCurrentStep(1));
  });
});
