import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  StyledDragDropForm,
  StyledInputFile,
  StyledDragLabel,
  StyledDragLabelDiv,
  StyledDragLabelText,
  StyledDragActiveText,
  StyledUploadButtonText,
  StyledAttachmentContainer,
  StyledAttachmentText,
  StyledFileText,
  StyledImageContainer,
  StyledImage,
  StyledInfoContainer,
  StyledAttachmentInformationText,
} from './styles';
import DragDropComponent from './index';
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  ...jest.requireActual('react-toastify'),
  toast: jest.fn(),
}));
jest.mock('../../assets/images/Upload.svg', () => 'Upload.svg');
jest.mock('../../assets/images/redDeleteIcon.svg', () => 'delete.svg');
jest.mock('../../assets/images/pdfIcon.svg', () => 'pdfIcon.svg');
jest.mock('../../assets/images/redDeleteIcon.svg', () => 'redDeleteIcon.svg');
jest.mock('../../assets/images/crossIcon.svg', () => 'crossIcon.svg');
jest.mock(
  '../../assets/images/videoColouredIcon.svg',
  () => 'videoColouredIcon.svg'
);
describe('DragDropComponent', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<DragDropComponent />);
    expect(wrapper.exists()).toBe(true);
  });
  it('renders files when multiple files are passed', () => {
    const wrapper = mount(
      <DragDropComponent files={[{ type: 'file1', name: 'file1' }]} />
    );
    expect(wrapper.find('Attachment')).toBeTruthy();
  });
  it('renders correctly with PDF file', () => {
    const file = [
      {
        type: 'application/pdf',
        name: 'example.pdf',
        metaData: {
          mimeType: 'application/pdf',
          originalName: 'Example PDF',
        },
      },
    ];
    const wrapper = mount(<DragDropComponent files={[file]} />);
    const imgTag = wrapper.find('img[alt="pdfIcon"]');
    expect(imgTag.exists()).toBe(true);
  });
  it('handles drag enter and leave events', () => {
    const wrapper = mount(<DragDropComponent />);
    wrapper.find(StyledDragDropForm).simulate('dragenter');
    expect(wrapper.find(StyledDragActiveText)).toHaveLength(1);
  });
  it('handles button click event', () => {
    const wrapper = mount(<DragDropComponent />);
    const inputSpy = jest.spyOn(wrapper.find('input').instance(), 'click');
    wrapper.find(StyledDragDropForm).simulate('click');
    expect(inputSpy).toHaveBeenCalled();
  });
  it('handles drop event', () => {
    const wrapper = mount(<DragDropComponent />);
    const mockFile = new File(['mock content'], 'mock.pdf', {
      type: 'application/pdf',
    });
    const dropEvent = {
      dataTransfer: { files: [mockFile] },
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };
    wrapper.find(StyledDragDropForm).simulate('drop', dropEvent);
    expect(dropEvent.preventDefault).toHaveBeenCalled();
    expect(dropEvent.stopPropagation).toHaveBeenCalled();
  });
  it('handles change event', () => {
    const wrapper = mount(<DragDropComponent />);
    const mockFile = new File(['mock content'], 'mock.pdf', {
      type: 'application/pdf',
    });
    expect(wrapper.find(StyledInputFile)).toHaveLength(1);
    wrapper
      .find(StyledInputFile)
      .simulate('change', { target: { files: [mockFile] } });
  });
});
describe('Styled Components', () => {
  it('renders StyledDragDropForm correctly', () => {
    const wrapper = shallow(<StyledDragDropForm />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledInputFile correctly', () => {
    const wrapper = shallow(<StyledInputFile />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledDragLabel correctly', () => {
    const wrapper = shallow(<StyledDragLabel />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledDragLabelDiv correctly', () => {
    const wrapper = shallow(<StyledDragLabelDiv />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledDragLabelText correctly', () => {
    const wrapper = shallow(<StyledDragLabelText />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledDragActiveText correctly', () => {
    const wrapper = shallow(<StyledDragActiveText />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledUploadButtonText correctly', () => {
    const wrapper = shallow(<StyledUploadButtonText />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledAttachmentContainer correctly', () => {
    const wrapper = shallow(<StyledAttachmentContainer />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledAttachmentText correctly', () => {
    const wrapper = shallow(<StyledAttachmentText />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledFileText correctly', () => {
    const wrapper = shallow(<StyledFileText />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledImageContainer correctly', () => {
    const wrapper = shallow(<StyledImageContainer />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledImage correctly', () => {
    const wrapper = shallow(<StyledImage />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledInfoContainer correctly', () => {
    const wrapper = shallow(<StyledInfoContainer />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders StyledAttachmentInformationText correctly', () => {
    const wrapper = shallow(<StyledAttachmentInformationText />);
    expect(wrapper).toMatchSnapshot();
  });
});
