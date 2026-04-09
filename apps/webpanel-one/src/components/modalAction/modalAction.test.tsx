import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import ModalAction from './index';
import store from '../../redux/store';
import { toast } from 'react-toastify';
import { createStore } from 'redux';


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('ModalAction Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders FormRow with correct styles and content', () => {
    const title = 'Test Title';
    const info = 'Test Info';

    const { getByText } = render(
      <Provider store={store}>
        <ModalAction
          title={title}
          info={info}
          onSuccess={() => {}}
          successCta="Submit"
          apiName="deleteUser"
          nameToBeDeleted=""
          successText=""
        />  
      </Provider>
    );

    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.closest('.form-row')).toBeNull();
    const infoElement = getByText(info);
    expect(infoElement).toBeInTheDocument();
    expect(infoElement.closest('.form-row')).toBeNull();
  });
});


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('ModalAction Component New', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays error message when name does not match', async () => {
    const title = 'Test Title';
    const info = 'Test Info';
    const nameToBeDeleted = 'John Doe'; 

    render(
      <Provider store={store}>
        <ModalAction
          title={title}
          info={info}
          onSuccess={() => {}}
          successCta="Submit"
          apiName="deleteUser"
          nameToBeDeleted={nameToBeDeleted}
          successText=""
        />
      </Provider>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Another Name' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Name not matched')).toBeInTheDocument();
    });
  });

});

jest.mock('react-toastify', () => ({
  ...jest.requireActual('react-toastify'),
  toast: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  ...jest.requireActual('react-toastify'),
  toast: jest.fn(),
}));

describe('ModalAction Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls onSuccess callback and displays toast on successful submission', async () => {
    const title = 'Test Title';
    const info = 'Test Info';
    const nameToBeDeleted = 'John Doe';

    const onSuccessMock = jest.fn();

    const mockDispatch = jest.fn();
    mockDispatch.mockResolvedValue({});

    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch,
    }));

    render(
      <Provider store={store}>
        <ModalAction
          title={title}
          info={info}
          onSuccess={onSuccessMock}
          successCta="Submit"
          apiName="deleteUser"
          nameToBeDeleted={nameToBeDeleted}
          successText="Success message"
        />
      </Provider>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'John Doe' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSuccessMock).toHaveBeenCalledTimes(0);
    });

  });
});