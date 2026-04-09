import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from './index';
import { StyledTextField, StyledError, StyledInputContainer } from './styles';

describe('TextInput Component', () => {
  it('renders without crashing', () => {
    render(<TextInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with the provided value', () => {
    const value = 'Test Value';
    render(<TextInput value={value} />);
    expect(screen.getByRole('textbox')).toHaveValue(value);
  });

  it('does not display error message when disableErrorMode is true', () => {
    const error = 'Test Error';
    render(<TextInput error={error} disableErrorMode />);
    expect(screen.queryByText(error)).not.toBeInTheDocument();
  });
});

describe('Styled Components', () => {
  it('renders StyledInputContainer correctly', () => {
    const { container } = render(<StyledInputContainer />);
    expect(container).toMatchSnapshot();
  });
  it('renders StyledTextField correctly', () => {
    const { container } = render(<StyledTextField />);
    expect(container).toMatchSnapshot();
  });
  it('renders StyledError correctly', () => {
    const { container } = render(<StyledError />);
    expect(container).toMatchSnapshot();
  });
});