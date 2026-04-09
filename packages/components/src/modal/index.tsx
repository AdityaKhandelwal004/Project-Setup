
import React from 'react';
import type { JSX }  from 'react';
import { Modal as MuiModal } from '@mui/material';
import Card from '../card/index.tsx';
import {
  StyledContainer,
  StyledHeaderContainer,
  StyledSubHeading,
  StyledHeadingImgContainer,
  StyledHeadingImg,
  StyledCloseContainer,
  StyledButtonContainer,
  StyledHeading,
  StyledCloseButton,
  StyledLeftContent,
  StyledFormArea,
  StyledButtonWrapper,
  StyledModalButton,
} from './styles.tsx';
interface ModalCustomProps {
  children?: JSX.Element | JSX.Element[];
  show?: boolean;
  onClose?: () => void;
  heading?: string;
  headingImgSrc?: string;
  headingColor?: string;
  subHeading?: string;
  fitContent?: boolean;
  hasCloseIcon?: boolean;
  isCreateOrEditForm?: boolean;
  maxWidth?:string;
  maxHeight?:string;
  marginTop?:string;
  hideHeader?:boolean
}
const Modal = ({
  children,
  heading,
  show,
  onClose,
  subHeading,
  fitContent,
  headingImgSrc,
  headingColor,
  isCreateOrEditForm = false,
  hasCloseIcon = true,
  maxWidth,
  maxHeight,
  marginTop,
  hideHeader
}: Readonly<ModalCustomProps>) => {
  return (
  <MuiModal
    open={!!show}
    onClose={(event: React.MouseEvent<HTMLElement>, reason: string) => {
      if (
        isCreateOrEditForm &&
        (reason === 'escapeKeyDown' || reason === 'backdropClick')
      ) {
        event.preventDefault();
      } else {
        onClose?.();
      }
    }}
  >
    <StyledContainer 
      fitContent={fitContent} 
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      marginTop={marginTop}
      
    >
    <Card
        cardCss={{
          borderRadius: '16px',
          overflow: 'hidden',
        }}
        contentCss={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 174px)',
          padding: '24px !important',
          // paddingBottom:0
        }}
        noHeaderPadding
        header={
          hideHeader ? undefined :  <StyledHeaderContainer>
            <StyledLeftContent>
              {headingImgSrc && (
                <StyledHeadingImgContainer>
                  <StyledHeadingImg src={headingImgSrc} />
                </StyledHeadingImgContainer>
              )}
              {heading && <StyledHeading variant="h3" customColor={headingColor}>{heading}</StyledHeading>}
            </StyledLeftContent>
            <StyledButtonContainer>
              {hasCloseIcon && (
                <StyledCloseContainer onClick={onClose}>
                  <StyledCloseButton />
                </StyledCloseContainer>
              )}
            </StyledButtonContainer>
          </StyledHeaderContainer>
        }
      >
        {children}
      </Card>
    </StyledContainer>
  </MuiModal>
)};
export default Modal;
// Export styled components for use in forms
export {
  StyledFormArea,
  StyledButtonWrapper,
  StyledModalButton,
};