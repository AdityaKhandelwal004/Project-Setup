import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StepNavigation from '.';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { setCurrentStep } from '../../../redux/actions';

const mockStore = configureStore([]);

describe('StepNavigation component', () => {
  test('renders step navigation with correct number of forms', () => {
    const forms = [
      { component: () => <div>Form 1</div> },
      { component: () => <div>Form 2</div> },
      { component: () => <div>Form 3</div> },
    ];
    const initialState = {
      stepForm: {
        currentPage: 0,
      },
    };
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <StepNavigation forms={forms} currentFormIndex={0} />
      </Provider>
    );

    const form1 = getByText('Form 1');
    const form2 = getByText('Form 2');
    const form3 = getByText('Form 3');

    expect(form1).toBeInTheDocument();
    expect(form2).toBeInTheDocument();
    expect(form3).toBeInTheDocument();
  });

  test('clicking on step container updates current step', () => {
    const forms = [
      { component: () => <div>Form 1</div> },
      { component: () => <div>Form 2</div> },
      { component: () => <div>Form 3</div> },
    ];
    const initialState = {
      stepForm: {
        currentPage: 0,
      },
    };
    const store = mockStore(initialState);

    store.dispatch = jest.fn();

    const { getByText } = render(
      <Provider store={store}>
        <StepNavigation forms={forms} currentFormIndex={0} />
      </Provider>
    );

    const stepContainer = getByText('Form 2');
    fireEvent.click(stepContainer);

    expect(store.dispatch).toHaveBeenCalledWith(setCurrentStep(1));
  });
});
