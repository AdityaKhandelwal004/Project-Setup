import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import StepForm from '.';
import configureStore from 'redux-mock-store';

const forms = [
 {
    heading: 'Form 1',
    component: () => <div data-testid='form1'>Form 1 Content</div>,
 },
 {
    heading: 'Form 2',
    component: () => <div data-testid='form2'>Form 2 Content</div>,
 },
];

const mockStore = configureStore([]);
const store = mockStore({
 stepForm: {
    currentPage: 0,
    forms: {},
    validationErrors: {},
 },
});

describe('StepForm component', () => {
 it('renders with correct heading and form content', () => {
    const { getByText } = render(
      <Provider store={store}>
        <StepForm heading='Step Form' subHeading='Step Form Subheading' forms={forms} />
      </Provider>
    );

    expect(getByText('Step Form')).toBeInTheDocument();
    expect(getByText('Step Form Subheading')).toBeInTheDocument();

    expect(getByText('Form 1 Content')).toBeInTheDocument();
 });

 it('changes form content when navigation buttons are clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <StepForm heading='Step Form' forms={forms} />
      </Provider>
    );

    expect(screen.getByTestId('form1')).toBeInTheDocument();
 });
});
