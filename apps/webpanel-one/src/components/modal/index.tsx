import React from 'react';
import { Modal as MuiModal } from '@mui/material';
import Card from '../card';
import {
  StyledContainer,
  StyledHeaderContainer,
  StyledMainHeading,
  StyledSubHeading,
  StyledHeadingImgContainer,
  StyledHeadingImg,
  StyledCloseContainer,
  StyledButtonContainer,
  StyledHeading,
} from './styles';
import { StyledIcon } from '../layout/sidebar/styles';
import CloseIconSvg from '../../assets/images/crossIcon.svg';

interface ModalCustomProps {
  children?: JSX.Element | JSX.Element[];
  show?: boolean;
  onClose?: () => void;
  heading?: string;
  headingImgSrc?: string;
  subHeading?: string;
  fitContent?: boolean;
  hasCloseIcon?: boolean;
  isCreateOrEditForm?: boolean;
}

const Modal = ({
  children,
  heading,
  show,
  onClose,
  subHeading,
  fitContent,
  headingImgSrc,
  isCreateOrEditForm = false,
  hasCloseIcon = true,
}: Readonly<ModalCustomProps>) => (
  <MuiModal
    open={!!show}
    onClose={(event: React.MouseEvent<HTMLElement>, reason: string) => {
      if (
        isCreateOrEditForm
        && (reason === 'escapeKeyDown' || reason === 'backdropClick')
      ) {
        event.preventDefault();
      } else {
        onClose();
      }
    }}
  >
    <StyledContainer fitContent={fitContent}>
      <Card
        contentCss={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 300px)',
          padding: 0,
        }}
        noHeaderPadding
        header={(
          <StyledHeaderContainer>
            {hasCloseIcon && (
              <StyledCloseContainer onClick={onClose}>
                <StyledIcon
                  src={CloseIconSvg}
                  alt="close"
                  height="16px"
                  width="16px"
                />
              </StyledCloseContainer>
            )}
            <StyledHeading>

              {heading && <StyledMainHeading variant="h3">{heading}</StyledMainHeading>}
              {subHeading && (
                <StyledSubHeading variant="body1">
                  {subHeading}
                </StyledSubHeading>
              )}
            </StyledHeading>
            {headingImgSrc && (
              <StyledHeadingImgContainer>
                <StyledHeadingImg src={headingImgSrc} />
              </StyledHeadingImgContainer>
            )}
            <StyledButtonContainer>

            </StyledButtonContainer>
          </StyledHeaderContainer>
        )}
      >
        {children}
      </Card>
    </StyledContainer>
  </MuiModal>
);

export default Modal;
