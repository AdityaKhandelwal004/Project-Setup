import styled from '@emotion/styled';
import { greyScaleColour, fontWeight, brand, fontFamilies, fontSize, primitiveColors, otherColour, respondTo, colors } from '@mono/theme';
import { Box, IconButton, Typography } from '@mui/material';

export const ProfileContainer = styled.div`
  min-height: 100vh;
  background-color: ${primitiveColors.neutral50};
  padding: 32px;
`;

export const ProfileCard = styled.div`
  // margin: 0 auto;
  background-color: ${primitiveColors.neutral0};
  border-radius: 10px;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 24px;
  border: 1px solid ${primitiveColors.grey401};
`;

export const ProfileHeader = styled.h1`
  font-size: ${fontSize.textXl};
  font-weight: ${fontWeight.regular};
  font-family: ${fontFamilies.primary};
  color: ${primitiveColors.neutral500};
  margin: -24px -24px 32px -24px;
  padding: 16px 24px;
  background-color: ${greyScaleColour.grey05};
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 52px;
  ${respondTo.mdDown}{
    flex-direction: column;
    gap: 32px;
  }
`;

export const ProfileImageWrapper = styled.div`
  flex-shrink: 0;
`;

export const ProfileImage = styled.img`
  width: 205px;
  height: 205px;
  border-radius: 50%;
  object-fit: cover;
  opacity: 0.8;

  ${respondTo.smOnly}{
    width: 112px !important;
    height: 112px !important; 
  }
`;

export const ProfileDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ProfileRow = styled.div<{isColumn?: boolean}>`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding-top: 24px;
  border-top: 1px solid ${primitiveColors.neutral200};
  flex-wrap: wrap;

  &:first-of-type {
    border-top: none;
    padding-top: 0;
  }

  ${respondTo.smOnly}{
    flex-direction: ${props => props.isColumn ? 'column' : 'row'};
    gap: 22px;
  }


`;

export const ProfileField = styled.div`
  flex: 1;
  min-width: 100px;
`;

export const FieldLabel = styled.label`
  display: block;
  font-size: ${fontSize.textSm};
  font-weight: ${fontWeight.regular};
  color: ${primitiveColors.neutral500};
  margin-bottom: 8px;
  line-height: 20px;
  font-family: ${fontFamilies.secondary};
`;

export const FieldValue = styled.p`
  font-size: ${fontSize.textMd};
  font-weight: ${fontWeight.medium};
  line-height: 20px;
  color: ${greyScaleColour.grey100};
  font-family: ${fontFamilies.primary};
`;

export const ChangePasswordButton = styled.button`
  background: none;
  border: none;
  color: ${primitiveColors.purple500};
  font-size: ${fontSize.textMd};
  font-weight: ${fontWeight.medium};
  font-style: medium;
  line-height: 20px;
  cursor: pointer;
  padding: 0;
  font-family: ${fontFamilies.primary};
  text-align: left;

  &:hover {
    opacity: 0.8;
  }
`;

export const EmailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;


export const MFALabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const DisableMFAButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  border: 1px solid ${primitiveColors.red500};
  color: ${primitiveColors.red500};
  border-radius: 10px;
  background-color: ${primitiveColors.neutral0};
  cursor: pointer;
  font-family: ${fontFamilies.primary};
  font-size: ${fontSize.textSm};
  font-weight: ${fontWeight.medium};

  &:hover {
    background-color: ${primitiveColors.purple800};
    color: ${primitiveColors.neutral0};
    border-color: ${primitiveColors.grey401};
  }
`;

export const PlanContainer = styled.div`
  padding-top: 16px;
  border-top: 1px solid ${primitiveColors.neutral200};
  padding-bottom: 24px;
  border-bottom: 1px solid ${primitiveColors.neutral200};
`;

export const PlanHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  ${respondTo.smOnly}{
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
  }
`;

export const PlanLabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ProgressContainer = styled.div`
  // margin-top: 12px;
  max-width: 50%;

  ${respondTo.smOnly}{
    max-width: 100%;
  }
`;

export const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const ProgressLabel = styled.span`
  font-size: ${fontSize.textSm};
  font-weight: ${fontWeight.regular};
  color: ${greyScaleColour.grey100};
  line-height: 20px;
  font-family: ${fontFamilies.secondary};
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  background-color: ${primitiveColors.purple100};
  border-radius: 9999px;
  height: 11px;
  overflow: hidden;
`;

export const FeedbackSection = styled.div`
  padding: 24px;
  border: 1px solid ${primitiveColors.purple400};
  border-radius: 10px;
  background-color: ${primitiveColors.purple1001};
  background-image: url('/assets/images/feedbackCardIcon.png');
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: auto;
  position: relative;
`;

export const FeedbackContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${respondTo.smOnly}{
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
`;

export const FeedbackLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  ${respondTo.smOnly}{
    justify-content: center;
  }
`;

export const FeedbackIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${primitiveColors.purple200};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const FeedbackTextContainer = styled.div`
  width: 70%;
`;

export const FeedbackTitle = styled.h3`
  font-size: ${fontSize.h3};
  font-weight: ${fontWeight.semiBold};
  color: ${primitiveColors.purple500};
  margin-bottom: 6px;
  font-family: ${fontFamilies.primary};
`;

export const FeedbackDescription = styled.p`
  font-size: ${fontSize.textSm};
  line-height: 20px;
  font-weight: ${fontWeight.medium};
  color: ${greyScaleColour.grey100};
  font-family: ${fontFamilies.secondary};
  flex-wrap: wrap;
`;

export const OpenFeedbackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 20px;
  background-color: ${primitiveColors.purple800};
  color: ${primitiveColors.neutral0};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  flex-shrink: 0;
  font-family: ${fontFamilies.primary};
  font-size: ${fontSize.textSm};
  font-weight: ${fontWeight.medium};
  max-width: 250px;

  &:hover {
    background-color: ${primitiveColors.purple800};
  }

  span {
    font-size: ${fontSize.textSm};
    font-weight: ${fontWeight.medium};
  }
`;

// Edit Profile Form Styles
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`;

export const ProfileImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
`;

export const EditProfileImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const EditProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ChangePhotoButton = styled.button`
  background: none;
  border: none;
  color: ${primitiveColors.purple500};
  font-size: ${fontSize.textMd};
  font-weight: ${fontWeight.medium};
  font-family: ${fontFamilies.primary};
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
`;

export const FormLabel = styled.label`
  font-size: ${fontSize.textSm};
  font-weight: ${fontWeight.regular};
  color: ${primitiveColors.neutral500};
  font-family: ${fontFamilies.secondary};
`;

export const FormInput = styled.input`
  padding: 12px 16px;
  border: 1px solid ${primitiveColors.grey401};
  border-radius: 8px;
  font-size: ${fontSize.textSm};
  font-family: ${fontFamilies.secondary};
  color: ${greyScaleColour.grey100};
  
  &:focus {
    outline: none;
    border-color: ${primitiveColors.purple500};
  }
  
  &::placeholder {
    color: ${primitiveColors.neutral400};
  }
`;

export const DateInput = styled(FormInput)`
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 12px;
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  border: 1px solid ${primitiveColors.grey401};
  border-radius: 10px;
  background: ${primitiveColors.neutral0};
  color: ${greyScaleColour.grey100};
  font-size: ${fontSize.textSm};
  font-weight: ${fontWeight.medium};
  font-family: ${fontFamilies.primary};
  cursor: pointer;
  
  &:hover {
    background-color: ${primitiveColors.neutral50};
  }
`;

export const UpdateButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  background: ${primitiveColors.purple800};
  color: ${primitiveColors.neutral0};
  font-size: ${fontSize.textSm};
  font-weight: ${fontWeight.medium};
  font-family: ${fontFamilies.primary};
  cursor: pointer;
  
  &:hover {
    background: ${primitiveColors.purple800};
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const DeleteIcon = styled.img`
  position: absolute;
  top: 15px;
  right: 5px;
  cursor: pointer;
  z-index: 100;
`;


export const StyledSubscriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledSubscriptionContainer = styled.div`
  padding: 24px;
  border: 1px solid ${primitiveColors.purple500};
  border-radius: 10px;
  background-color: ${primitiveColors.purple1001};
`;

export const StyledSubscriptionHeading = styled(Typography)`
  font-size: ${fontSize.h2} !important;
  font-weight: ${fontWeight.bold} !important;
  color: ${primitiveColors.purple500};
  `

  export const StyledSubscriptionSubHeading = styled(Typography)`
  font-size: ${fontSize.h5} !important;
  margin-top: 8px;
  `

  export const SubscriptionChip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 20px;
  background-color: ${primitiveColors.purple100};
  color: ${primitiveColors.purple500};
  border-radius: 10px;
  font-size: ${fontSize.h3} !important;
  font-weight: ${fontWeight.medium} !important;
  width: fit-content;
  margin-top: 22px;
  border: 1px solid ${primitiveColors.purple500};
  font-family: ${fontFamilies.primary};

  ` 


  export const StyledAmountText = styled(Typography)`
  font-size: ${fontSize.h3} !important;
  font-weight: ${fontWeight.medium} !important;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  `



  export const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 12px;
  gap: 24px;
`;

export const PlanSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 240px;

  ${respondTo.smOnly}{
    width: 100%;
    }
`;


export const PaymentSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 240px;
  ${respondTo.smOnly}{
    width: 100%;
    }
`;

export const PaymentCard = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CardIconBox = styled(Box)`
  border: 1px solid ${primitiveColors.purple500};
  border-radius: 8px;
//   padding: 22px 9px;
  height: 56px;
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UpdateText = styled(Typography)`
  color: ${primitiveColors.purple500};
  font-weight: ${fontWeight.medium} !important;
  font-size:  ${fontSize.h5} !important;
  cursor: pointer;
  text-align: right;
`;


export const StyledUpdateMultiFactorAuthenticationNote = styled(Typography)`
  font-size: ${fontSize.h5} !important;
  font-weight: ${fontWeight.regular} !important;
  line-height: 24px !important;
`;


export const StyledLogout = styled.div`
  font-size: ${fontSize.b0} !important;
  font-weight: ${fontWeight.medium} !important;
  color: ${otherColour.errorDefault};
  background-color: ${otherColour.errorBg};
  font-family: ${fontFamilies.secondary} !important;
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 10px;
  `

  export const StyledMFAContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
 flex-direction: column;
    align-items: flex-start;
  `

  export const StyledBtn = styled.div`


  ${respondTo.smOnly}{
  width: 100% !important;
  justify-content: center;
  }
  `

  export const StyledBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  align-items: flex-end;

  ${respondTo.smOnly}{
   width: 100%;
  }

  `;

// Stripe Input Styles
export const StripeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StripeInputLabel = styled.label`
  font-family: ${fontFamilies.primary};
  font-size: ${fontSize.textMd};
  font-weight: ${fontWeight.semiBold};
  color: ${primitiveColors.purple500};
  line-height: 21px;
`;

export const StripeCardElementWrapper = styled.div`
  padding: 16px;
  border: 1px solid ${primitiveColors.grey401};
  border-radius: 8px;
  min-height: 55px;
  display: flex;
  align-items: center;
  background-color: ${primitiveColors.neutral0};
  
  &:focus-within {
    border-color: ${primitiveColors.purple500};
    outline: none;
  }
`;
  
export const StyledCheckboxlabel = styled(Typography)`
  margin-top: 2px;
  font-size: ${fontSize.b1} !important;
  font-weight: ${fontWeight.medium} !important;
  color: ${colors.black};
` 