import styled, { css } from 'styled-components';
import { Accordion, AccordionDetails, Container } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { brand, colors, greyScaleColour } from '@mono/theme/style.palette';
import { fontSize, fontWeight } from '@mono/theme/style.typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { respondTo } from '@mono/theme/style.layout';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';



export interface StyledContainerProps {
    centerAlign?: boolean;
    noPadding?: boolean;
}


export const StyledContainer = styled(Container)<{ noPadding?: boolean }>`
  display: flex !important;
  height: 100vh;
  overflow: hidden;
  ${({ noPadding }) =>
    noPadding
      ? css`
          padding: 0 !important;
        `
      : css`
          padding: 24px !important;
        `};
  min-width: 100%;
  margin: auto 0 !important;
`;

export const StyledChildrenContainer = styled.div<{
  noPadding?: boolean;
  noMargin?: boolean;
  hasHeader?: boolean;
}>`
  margin: 0px !important;
  padding: 8px 18px;
  padding-bottom: 24px;
  // overflow-y: auto;
  // height: -webkit-fill-available;
  display: flex;
  gap: 16px;
  flex-direction: column;
  ${({ noPadding }) =>
    noPadding &&
    css`
      padding: 0 !important;
    `};
  ${({ noMargin }) =>
    noMargin &&
    css`
      margin: 0 !important;
    `}
  ${({ hasHeader }) =>
    hasHeader &&
    css`
      // max-height: 84vh !important;
    `};
`;

export const StyledContentContainer = styled.div<{ noMargin?: boolean }>`
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 12px;
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ noMargin }) =>
    noMargin &&
    css`
      margin: 0 !important;
    `}
`;

export const StyledIconHeadingContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const StyledLogoutMenuIcon = styled(LogoutIcon)`
   height: 22px !important;
   width: 22px !important;
`;

export const StyledPersonIcon = styled(PermIdentityOutlinedIcon)`
   height: 22px !important;
   width: 22px !important;
`;

export const StyledProfileMenuIcon = styled(PersonOutlineIcon)`
  color: ${brand.primary100} !important;
`;

export const StyledIcon = styled.img``;

export const StyledModalQuestion = styled.div`
  padding: 10px 24px;
  font-weight: ${fontWeight?.medium};
  font-size: ${fontSize?.b1};
  line-height: 26px;
  margin: 16px 0;
`;

export const StyledText = styled.p`
  margin: 0;
`;

export const ModalButtonWrapper = styled.div`
  padding: 16px 24px;
  display: flex;
  border-top: 1px solid ${greyScaleColour.grey10};
  justify-content: flex-end;
  gap: 16px;
`;

export const StyledCancelWrapper = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : '83px')};
`;
export const StyledSubmitWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  min-width: 40px; /* Ensure enough space for checkbox or small buttons */
`;

export const StyledFormWrapper = styled.div<{ minPadding?: boolean }>`
  padding: ${({ minPadding }) => (minPadding ? '8px 24px' : '24px')};
`;

export const StyledDynamicFormRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 16px;
`;

export const StyledCheckBoxContainer = styled.div<{ isCheckbox: boolean }>`
  flex: ${({ isCheckbox }) => (isCheckbox ? '0 0 85px' : '1')};
  white-space: nowrap;
`;

export const StyledDeleteWrapper = styled.div`
  margin-top: 12px;
`;

export const StyledDeleteIcon = styled(DeleteOutlineIcon)`
  color: ${colors.errorDefault};
  cursor: pointer;
`;
export const StyledSendReportIcon = styled(SendOutlinedIcon)<{ disabled?: boolean }>`
  color: ${({ disabled }) => (disabled ? greyScaleColour.grey40 : brand?.primaryMain)};
  cursor: ${({ disabled }) => (disabled ? 'auto' : 'pointer')};
`;

export const StyledTeamAddButton = styled.div`
  width: 87px;
`;

export const ConfirmationText = styled.p`
  margin: 0;
  margin-bottom: 5px;
  font-weight: ${fontWeight?.medium};
  font-size: ${fontSize?.b1};
  line-height: 26px;
`;

export const DescriptionText = styled.p`
  margin: 0;
  font-weight: ${fontWeight?.regular};
  font-size: ${fontSize?.b2};
  line-height: 26px;
`;

export const StyledAccordion = styled(Accordion)<{
  defaultExpanded?: boolean;
  boxShadow?: boolean;
  noGreyBorder?: boolean;
  isEmployee?: boolean;
}>`
  ${({ boxShadow }) => !boxShadow && 'box-shadow: none !important;'}
  box-shadow: none !important;
  background-color: white;
  &.MuiAccordion-root::before {
    opacity: 0 !important;
    display: none !important;
  }

  ${({ noGreyBorder }) =>
    !noGreyBorder ? `border: 1px solid #ccc; ` : `border: 1px solid white; `}

  ${({ noGreyBorder }) =>
    !noGreyBorder &&
    css`
      &.MuiAccordion-root::before {
        opacity: 0 !important;
        display: none !important;
      }
    `}
  ${({ defaultExpanded }) =>
    defaultExpanded &&
    css`
      background-color: ${brand.primaryMain};
    `}
  border-radius:6px !important;
  ${respondTo.smOnly} {
    .MuiPaper-root-MuiAccordion-root::before {
      position: static !important;
    }
  }
`;
export const StyledAccordionDetails = styled(AccordionDetails)`
  padding: 0 !important;
`;
export const StyledQuestionWrapper = styled.div`
  padding: 0 24px;
  ${respondTo.mdDown} {
    padding: 0px;
  }
`;
export const StyledFormSeparator = styled.div`
  border: 1px dashed ${greyScaleColour.grey20};
  text-align: center;
  border: 1px solid;
  border-image: repeating-linear-gradient(
      90deg,
      ${greyScaleColour.grey20} 0px,
      ${greyScaleColour.grey20} 20px,
      /* Dash width */ transparent 20px,
      transparent 30px /* Gap width */
    )
    30;
`;
export const StyledSecondaryQueWrapper = styled.div`
  display: flex;
  backgroud: red;
  width: fit-content;
  flex-direction: column;
  gap: 18px;
  padding: 24px 0 0 0;
`;
export const StyledOptionContainer = styled.div<{ selected?: boolean; disabled?: boolean }>`
  width: 42px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid ${greyScaleColour.grey10};
  background: ${greyScaleColour.grey10};
  color: ${brand.black};

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid ${brand.primary100};
      background: ${brand.primary05};
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: initial;
    `}
    ${respondTo.mdDown} {
    width: 38px;
    //height: 42px;
    text-align: center;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ${respondTo.smOnly} {
    width: 22px;
    padding: 0px;
  }
`;
export const StyledOptionText = styled.span`
  font-size: 15px;
  font-weight: ${fontWeight.light};
  line-height: 22.5px;
  text-align: center;
  ${respondTo.smOnly} {
    font-size: 12px;
  }
`;
export const StyledQuestion = styled.div`
  display: flex;
  gap: 10px;
  ${respondTo.mdDown} {
    font-weight: ${fontWeight.medium};
    font-size: ${fontSize.b1};
    line-height: 21px;
    gap: 4px;
    color: ${brand.black};
  }
`;
export const StyledQue = styled.p`
  margin: 0;
  color: ${brand.black};
  font-weight: ${fontWeight.medium};
  font-size: 16px;
  line-height: 24px;
`;
export const OptionsContainer = styled.div`
  display: flex;
  backgroud: red;
  width: fit-content;
  flex-direction: column;
  gap: 18px;
  padding: 24px 0;
  margin-left: 36px;
  ${respondTo.smOnly} {
    margin-left: 0px;
  }
`;
export const StyledOptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  width: fit-content;

  ${respondTo.mdDown} {
    gap: 8px;
    margin-left: 0px;
    justify-content: unset;
  }

  ${respondTo.smOnly} {
    gap: 5px;
  }
`;
export const TagWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const StyledStatement = styled.span`
  color: ${greyScaleColour.grey100};
  font-weight: ${fontWeight?.medium};
  font-size: ${fontSize.b2};
  line-height: 18px;
  ${respondTo.mdDown} {
    font-weight: ${fontWeight?.medium};
    font-size: 9px;
    line-height: 13.5px;
  }
`;
export const AccordionTitle = styled.span`
  color: ${brand.black};
  font-weight: ${fontWeight?.semiBold};
  font-size: 20px;
  line-height: 30px;
`;

// =============================================================================
// MODULE NAVIGATION COMPONENTS
// =============================================================================

export const ModuleNavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ModuleNavigationButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  font-weight: ${fontWeight.medium};
  font-size: 16px;
  line-height: 1.5;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  touch-action: manipulation;
  border: none;
  padding: 16px 32px;
  min-height: 52px;
  min-width: 140px;

  ${({ $variant }) =>
    $variant === 'primary'
      ? `
        background-color: #100937;
        color: #FFFFFF;

        &:active {
          transform: scale(0.98);
        }

        &:disabled {
          background-color: #E5E7EB;
          color: #9CA3AF;
          cursor: not-allowed;
        }
      `
      : `
        background-color: transparent;
        color: #100937;
        border: 1px solid #100937;

        &:hover {
          background-color: #100937;
          color: #FFFFFF;
        }

        &:active {
          transform: scale(0.98);
        }

        &:disabled {
          border-color: #E5E7EB;
          color: #9CA3AF;
          cursor: not-allowed;
        }
      `}

  ${respondTo.smOnly} {
    font-size: 14px;
    padding: 12px 24px;
    min-height: 44px;
    min-width: 120px;
  }
`;

export const ModulePreviousButtonText = styled.span`
  color: #100937;
  font-weight: ${fontWeight.medium};
  font-size: 18px;
  line-height: 1;
  transition: all 0.2s ease-in-out;

  ${ModuleNavigationButton}:hover & {
    color: #FFFFFF;
  }

  ${respondTo.smOnly} {
    font-size: 14px;
  }
`;

export const ModulePreviousButtonIcon = styled.div`
  color: #100937;
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;

  ${ModuleNavigationButton}:hover & {
    color: #FFFFFF;
  }
`;

export const ModuleProgressDotsContainer = styled.div`
  display: none;
  gap: 7px;

  ${respondTo.smUp} {
    display: flex;
  }
`;

export const ModuleProgressDot = styled.div<{ $isActive: boolean }>`
  width: 10.5px;
  height: 10.5px;
  border-radius: 30px;
  opacity: 1;
  background-color: ${({ $isActive }) => ($isActive ? '#100937' : '#D1D5DB')};
  transition: background-color 0.2s ease-in-out;
  transform: rotate(0deg);
`;

export const ModuleLoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-bottom-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;


export const StyledContentWrapper = styled.div<StyledContainerProps>`
    // padding-left : 32px;
    width : 100%;
    overflow: hidden; 
    height: 100%;
    overflow-y: auto;
    ${({ noPadding }) => noPadding && css`
        padding: 0 !important;
    `}
`

export const StyledSideBarContainer = styled.div`
    display : flex;

`