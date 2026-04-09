import { Grid2, Link, Typography, Chip, FormControlLabel, Checkbox, colors, SvgIcon } from '@mui/material';
import styled from 'styled-components';
import { motion } from 'motion/react';
import { respondTo } from '@mono/theme/style.layout';
import { fontSize, fontWeight } from '@mono/theme/style.typography';
import { authTheme } from '@mono/theme/modules/auth.theme';
import { brand, greyScaleColour } from '@mono/theme/style.palette';
import { spacing, borderRadius } from '@mono/theme';
import { MaterialTextInput, PasswordInput, MaterialDateInput } from '@mono/components';


export const StyledPanel = styled.div`
  display: flex;
  position: relative;
  width: 663px;
  height: calc(100vh - 50px);
  border-radius: 22px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  ${respondTo.mdDown} {
    width: 450px;
  }
  ${respondTo.screenDown(850)} {
    width: 360px;
  }
  ${respondTo.smOnly} {
    display: none;
  }
`;

export const StyledSidePanelLogoImage = styled.img`
  height: 31px;
  width: 133px;
  position: absolute;
  top: 70px;
  left: 44px;
`;

export const StyledSidePanelUpperMiddleText = styled(Typography)`
  position: absolute;
  top: 507px;
  left: 44px;
  font-weight: ${fontWeight.semiBold} !important;
  line-height: 60px !important;
  font-size: 55px !important;
  color: ${greyScaleColour.white100} !important;
  height: 120px;
  width: 301px;
`;
export const StyledSidePanelLowerMiddleText = styled(Typography)`
  position: absolute;
  top: 633px;
  left: 44px;
  line-height: 20px !important;
  color: ${greyScaleColour.white100} !important;
  height: 40px;
  width: 383px;
`;

export const StyledSidePanelLowerText = styled(Typography)`
  position: absolute;
  top: 777px;
  left: 44px;
  line-height: 18px !important;
  color: ${greyScaleColour.grey60} !important;
  height: 40px;
  width: 383px;
`;

export const StyledGridContainer = styled(Grid2)`
  padding: 40px;
  padding-bottom: 142px;
  display: flex;
  flex-direction: column;
  color: white;
`;

export const StyledScreenWrapper = styled.div`
  display: flex;
  ${respondTo.mdDown} {
    gap: 20px;
  }
`;

export const StyledFormContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  ${respondTo.mdDown} {
    width: 300px;
  }
`;

export const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 443px;
`;
export const StyledFormHeading = styled(Typography)`
  font-weight: ${fontWeight.semiBold} !important;
  font-size: 40px !important;
  line-height: 60px !important;
  color: ${brand.black};
`;
export const StyledFormSubHeading = styled(Typography)`
  font-weight: ${fontWeight.regular} !important;
  font-size: ${fontSize.h5} !important;
  color: ${greyScaleColour.grey100};
  line-height: 24px !important;
`;
export const StyledLink = styled(Link)`
  font-size: ${fontSize.b2} !important;
  font-weight: ${fontWeight.regular} !important;
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  margin-left: 0px !important;
  color: ${greyScaleColour.grey100} !important;
`;

export const StyledLogoContainer = styled(Grid2)`
  width: 141px;
  height: 37px;
`;

export const StyledBannerImage = styled.img``;

export const StyledPanelInfo = styled(Typography)`
  color: ${brand.white};
  font-size: 56px !important;
  font-weight: ${fontWeight.semiBold} !important;
  line-height: 120% !important;
  ${respondTo.mdDown} {
    font-size: 44px !important;
  }
`;
export const StyledPanelSubInfo = styled(Typography)<{
  fontsize?: string;
  fontweight?: number;
}>`
  color: ${brand.white};
  font-size: ${({ fontsize }) => fontsize || fontSize.b1} !important;
  font-weight: ${({ fontweight }) => fontweight || fontWeight.regular} !important;
  line-height: normal !important;
  ${respondTo.mdDown} {
    font-size: ${fontSize.b2} !important;
  }
`;
export const StyledWord = styled.span`
  color: ${brand.primaryMain};
`;

export const StyledLinkContainer = styled.a`
  &:hover {
    color: ${brand.primaryMain} !important;
    & .MuiSvgIcon-root {
      color: ${brand.primaryMain} !important;
    }
  }
  text-decoration: none;
`;

export const StyledImageContainer = styled(Grid2)`
  padding: 0 !important;
  padding-left: 1px !important;
`;

export const StyledImageContent = styled(Grid2)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 113px;
  padding: 0 !important;
`;

export const StyledLoginChip = styled(Chip)`
  &&.MuiChip-root {
    width: 103px;
    height: 26px !important;
    padding: 12px 4px !important;
    font-size: ${fontSize.b2} !important;
    background-color: ${brand.primary20} !important;
    font-weight: ${fontWeight.medium} !important;
    color: ${brand.primaryMain} !important;
  }
`;
export const StyledPrimaryWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
`;
export const StyledSecondaryWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;
export const StyledAuthLayout = styled.div`
  padding: 24px;
  border-radius: 24px;
  display: flex;
  ${respondTo.screenDown(981)} {
    gap: 20px;
  }
`;
export const StyledAuthBanner = styled.div`
  width: 717px;
  border-radius: 24px;
  background-color: ${brand.primaryMain};
  color: ${brand.white};
  background-color: ${brand.primaryMain};
  background-image: url('../../assets/images/AuthBg.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 95vh;
  position: relative; /* Establishes a containing block for the child */
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: end;
  overflow: hidden;
  position: relative;
`;

export const StyledBannerTitle = styled.h2`
  max-width: 514px;
  font-weight: ${fontWeight.semiBold};
  font-size: ${fontSize.title};
  line-height: 65px;
  padding: 0 24px;
`;
export const StyledAuthContainter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  padding: 24px;
  gap: 4.5rem;

  ${respondTo.lgUp} {
    max-width: 700px;
    padding: 32px;
  }

  ${respondTo.screenUp(1400)} {
    max-width: 800px;
    padding: 40px;
  }

  ${respondTo.smOnly} {
    max-width: 400px;
    padding: 16px;
  }
`;
export const StyledPopUpContainer = styled.div`
  padding: 24px;
  max-width: 600px;

  ${respondTo.lgUp} {
    max-width: 700px;
    padding: 32px;
  }

  ${respondTo.screenUp(1400)} {
    max-width: 800px;
  }
`;
export const StyledPopUpbottom = styled.div`
  padding: 24px;
  border-top: 1px solid ${greyScaleColour.grey10};

  ${respondTo.lgUp} {
    padding: 32px;
  }
`;
export const StyledButtonDiv = styled.div`
  max-width: 120px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: nowrap;
  justify-content: flex-end;
  margin-bottom: 0;
`;
export const StyledErrorWrapper = styled.div`
  max-width: 600px;

  ${respondTo.lgUp} {
    max-width: 700px;
  }

  ${respondTo.screenUp(1400)} {
    max-width: 800px;
  }
`;

export const StyledBottomImage = styled.div`
  width: 100%;
  height: 100%;
  text-align: left; /* Align image container to the left */
  z-index: 1;
  display: flex;
  justify-content: flex-start; /* Align image to the left */
  align-items: flex-start; /* Align with StyledDiv */
  position: relative;
  img {
    width: 100%; /* Ensure full width */
    max-width: none;
    object-fit: cover;
    border-radius: 0;
    position: absolute;
    bottom: 0px;
    left: 0;
  }
`;

export const StyledDiv = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: flex-start; /* Align items to the left */
  align-items: center;
  width: 100%;
`;

export const StyledLogo = styled.img`
  max-width: 200px;
  height: auto;
  position: relative;
  left: -48px;
`;

// SignUpRedesign styled components
export const StyledMaterialInput = styled(MaterialTextInput)(() => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    border: '2px solid',
    minHeight: '56px',
    borderColor: brand.paleGray,
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: greyScaleColour.grey60,
    },
    '&.Mui-focused': {
      borderColor: greyScaleColour.grey80,
      backgroundColor: brand.white,
      boxShadow: 'none',
    },
    '&.Mui-error': {
      borderColor: brand.accent,
      backgroundColor: brand.white,
      boxShadow: 'none',
    },
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
    '& input': {
      padding: '12px 16px',
      fontWeight: '500',
      color: brand.secondaryMain,

    },
  },
  '& .MuiInputLabel-root': {
    display: 'none',
  },
}));

export const StyledPasswordInput = styled(PasswordInput)(() => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    border: '2px solid',
    minHeight: '56px',
    borderColor: brand.paleGray,
    backgroundColor: brand.white,
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: greyScaleColour.grey60,
    },
    '&.Mui-focused': {
      borderColor: greyScaleColour.grey80,
      backgroundColor: brand.white,
      boxShadow: 'none',
    },
    '&.Mui-error': {
      borderColor: brand.accent,
      backgroundColor: brand.white,
      boxShadow: 'none',
    },
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
    '& input': {
      padding: '12px 16px',
      fontWeight: '500',
      color: brand.secondaryMain,

    },
  },
  '& .MuiInputLabel-root': {
    display: 'none',
  },
}));

export const StyledDateInput = styled(MaterialDateInput)(() => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    border: '2px solid',
    minHeight: '56px',
    borderColor: brand.paleGray,
    backgroundColor: brand.white,
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: brand.primaryMain,
    },
    '&.Mui-focused': {
      borderColor: brand.primaryMain,
      backgroundColor: `${brand.primaryLight}10`,
    },
    '&.Mui-error': {
      borderColor: brand.accent,
      backgroundColor: brand.commonBackground,
    },
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
    '& input': {
      padding: '12px 16px',
      fontWeight: '500',
      color: brand.secondaryMain,

    },
  },
  '& .MuiInputLabel-root': {
    display: 'none',
  },
}));

// =============================================================================
// SIGNIN COMPONENT STYLED COMPONENTS
// =============================================================================

export const MainContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  // background: linear-gradient(135deg, ${brand.commonBackground} 0%, ${brand.paleGray} 50%, ${brand.paleGray} 100%);
`;

export const FloatingShapeContainer = styled.div`
  position: absolute;
  z-index: 1;
`;

export const FloatingShapeContent = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  opacity: 0.3;
  background: linear-gradient(45deg, ${brand.commonBackground}, ${brand.accentLight});
`;

export const FloatingIcon = styled.div<{ color: string }>`
  color: ${props => props.color};
`;

export const FloatingGradientShape = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  opacity: 0.3;
  background: linear-gradient(45deg, ${brand.paleGray}, ${brand.primaryLight});
`;

export const ContentWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
  z-index: 10;

  ${respondTo.mdDown} {
    flex-direction: column;
  }

  ${respondTo.screenHight(600)} {
    min-height: auto;
    height: auto;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${spacing[4]};
  position: relative;
  overflow: hidden;
  order: 2;
  background: linear-gradient(135deg, ${brand.commonBackground} 0%, rgba(255, 237, 230, 0.8) 100%);

  ${respondTo.lgUp} {
    order: 1;
    padding: ${spacing[8]};
  }

  ${respondTo.mdUp} {
    padding: ${spacing[6]};
  }

  ${respondTo.smOnly} {
    padding: ${spacing[4]} !important;
  }
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing[4]};
  order: 1;
  background-color: ${brand.commonBackground};
  flex-direction: column;

  ${respondTo.lgUp} {
    order: 2;
    padding: ${spacing[6]};transition
  }

  ${respondTo.mdUp} {
    padding: ${spacing[6]};
  }

  ${respondTo.smOnly} {
    padding: ${spacing[4]} !important;
  }
`;

export const WelcomeTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: ${brand.secondaryMain};

  ${respondTo.mdUp} {
    font-size: 32px;
    color:${brand.primaryMain};
    font-family: 'Nohemi', sans-serif;
  font-weight: ${fontWeight.semiBold} !important;
    
  }

  ${respondTo.smOnly} {
    font-size: 28px;
  }
`;

export const WelcomeSubtitle = styled.span`
  display: block;
  color: ${brand.accent};
   font-family: 'Nohemi', sans-serif;
  font-weight: ${fontWeight.semiBold} !important;
    font-size: 32px;
`;

export const StatCard = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid ${brand.primaryLight}30;
  border-radius: ${borderRadius.lg};
  padding: ${spacing[4]};
  text-align: center;
  position: relative;

  ${respondTo.mdUp} {
    padding: ${spacing[5]};
  }

  ${respondTo.lgUp} {
    padding: ${spacing[6]};
  }

  ${respondTo.smOnly} {
    padding: ${spacing[3]} !important;
  }
`;

export const StatGradientBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, ${brand.commonBackground}, ${brand.paleGray}, ${brand.primaryLight});
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${brand.primaryMain};

  ${respondTo.mdUp} {
    font-size: 28px;
  }

  ${respondTo.lgUp} {
    font-size: 32px;
  }

  ${respondTo.smOnly} {
    font-size: 20px;
  }
`;

export const StatLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${brand.secondaryMain};
`;

export const FloatingIconButton = styled(motion.div)<{ backgroundColor: string }>`
  position: absolute;
  color: white;
  padding: ${spacing[2]};
  border-radius: 50%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 2px solid white;
  background-color: ${props => props.backgroundColor};

  ${respondTo.mdUp} {
    padding: ${spacing[3]};
    border: 3px solid white;
  }

  ${respondTo.lgUp} {
    padding: ${spacing[4]};
    border: 4px solid white;
  }

  ${respondTo.smOnly} {
    padding: ${spacing[1]} !important;
    border: 1px solid white !important;
  }
`;

export const MessageCard = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid ${brand.primaryLight}30;
  border-radius: ${borderRadius.lg};
  padding: ${spacing[4]};
  position: relative;
  text-align: center;
  margin-top: ${spacing[6]};

  ${respondTo.mdUp} {
    padding: ${spacing[5]};
  }

  ${respondTo.lgUp} {
    padding: ${spacing[6]};
  }

  ${respondTo.smOnly} {
    padding: ${spacing[3]} !important;
    margin-top: ${spacing[4]} !important;
  }
`;

export const MessageText = styled.p`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${brand.secondaryMain};

  ${respondTo.mdUp} {
    font-size: 16px;
  }

  ${respondTo.lgUp} {
    font-size: 18px;
  }

  ${respondTo.screenUp(1280)} {
    font-size: 20px;
  }

  ${respondTo.smOnly} {
    font-size: 12px;
  }
`;

export const MessageDecoration = styled.div`
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  opacity: 0.3;
  background: linear-gradient(45deg, ${brand.commonBackground}, ${brand.paleGray});

  ${respondTo.mdUp} {
    bottom: -8px;
    right: -8px;
    width: 32px;
    height: 32px;
  }

  ${respondTo.smOnly} {
    width: 16px;
    height: 16px;
    bottom: -2px;
    right: -2px;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: rgba(255, 255, 255, 0.95);
  border: 2px solid ${brand.primaryMain}20;
  border-radius: ${borderRadius.xl};
  padding: ${spacing[6]};

  ${respondTo.mdUp} {
    max-width: 600px;
    padding: ${spacing[8]};
  }

  ${respondTo.lgUp} {
    max-width: 600px;
    padding: ${spacing[10]};
  }

  ${respondTo.screenUp(1400)} {
    max-width: 600px;
    padding: ${spacing[12]};
  }

  ${respondTo.smOnly} {
    max-width: 350px !important;
    padding: ${spacing[4]} !important;
  }

  ${respondTo.screenHight(600)} {
    padding: ${spacing[4]} !important;
  }
`;

export const FormTitle = styled.h1`
  font-family: ${authTheme.textStyles.heading.fontFamily};
  font-size: ${authTheme.textStyles.heading.fontSize};
  font-weight: ${authTheme.textStyles.heading.fontWeight};
  line-height: ${authTheme.textStyles.heading.lineHeight};
  letter-spacing: ${authTheme.textStyles.heading.letterSpacing};
  text-align: center;
  margin-top: 20px;
  color: ${authTheme.colors.heading};
  margin-bottom: ${spacing[3]};
`;

export const FormSubtitle = styled.p`
  font-family: ${authTheme.textStyles.subheading.fontFamily};
  font-size: ${authTheme.textStyles.subheading.fontSize};
  font-weight: ${authTheme.textStyles.subheading.fontWeight};
  line-height: ${authTheme.textStyles.subheading.lineHeight};
  letter-spacing: ${authTheme.textStyles.subheading.letterSpacing};
  color: ${authTheme.colors.subheading};
  text-align: center;
  margin-bottom: ${spacing[2]};
`;

export const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RememberMeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  cursor: pointer;
`;

export const RememberMeCheckbox = styled.input`
  width: 16px;
  height: 16px;
  border-radius: ${borderRadius.sm};
  border: 2px solid #d1d5db;
  accent-color: ${brand.primaryMain};
`;

export const RememberMeText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${brand.secondaryMain};
`;

export const ForgotPasswordLink = styled.button`
  display: flex;
  justify-content: end;
  font-family: ${authTheme.textStyles.link.fontFamily};
  font-size: ${authTheme.textStyles.link.fontSize};
  font-weight: ${authTheme.textStyles.link.fontWeight};
  line-height: ${authTheme.textStyles.link.lineHeight};
  letter-spacing: ${authTheme.textStyles.link.letterSpacing};
  color: ${authTheme.colors.link};
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  width: 100%;

  &:hover {
    text-decoration: underline;
  }
`;


export const SubmitButton = styled.button<{ $isValid: boolean }>`
  width: 100%;
  padding: ${spacing[5]};
  border-radius: ${borderRadius.lg};
  border: none;
  font-family: ${authTheme.textStyles.button.fontFamily};
  font-size: ${authTheme.textStyles.button.fontSize};
  font-weight: ${authTheme.textStyles.button.fontWeight};
  line-height: ${authTheme.textStyles.button.lineHeight};
  letter-spacing: ${authTheme.textStyles.button.letterSpacing};
  color: ${authTheme.colors.buttonText};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background-color: ${props => props.$isValid ? '#100937' : brand.paleGray};
  cursor: pointer;
`;

export const SignUpContainer = styled.div`
  text-align: center;
  padding-top: ${spacing[4]};
`;

export const SignUpText = styled.p`
  font-family: ${authTheme.textStyles.link.fontFamily};
  font-size: 14px;
`;


export const BackToLoginContainer = styled.div`
  text-align: center;
`;

export const BackToLoginText = styled.p`
  font-family: ${authTheme.textStyles.link.fontFamily};
  font-size: 14px;
  color: ${brand.secondaryMain};
`;

export const AuthNavLink = styled.button`
  font-family: ${authTheme.textStyles.navLink.fontFamily};
  font-weight: ${authTheme.textStyles.navLink.fontWeight};
  font-size: ${authTheme.textStyles.navLink.fontSize};
  line-height: ${authTheme.textStyles.navLink.lineHeight};
  letter-spacing: ${authTheme.textStyles.navLink.letterSpacing};
  background: none;
  text-decoration: underline;
  border: none;
  cursor: pointer;
  color: ${brand.accent};

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }

  transition: all 0.2s ease;
`;

// Additional styled components for SignIn screen
export const StatsContainer = styled(motion.div)<{ $backgroundColor?: string; $borderColor?: string }>`
  text-align: center;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 2px solid;
  background-color: ${props => props.$backgroundColor || 'rgba(255, 255, 255, 0.8)'};
  border-color: ${props => props.$borderColor || 'transparent'};
`;

export const StatIconContainer = styled(motion.div)<{ $backgroundColor?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-bottom: 12px;
  background-color: ${props => props.$backgroundColor || 'transparent'};
`;

export const StatNumber = styled.div<{ $color?: string }>`
  font-family: ${authTheme.textStyles.heading.fontFamily};
  font-weight: ${authTheme.textStyles.heading.fontWeight};
  font-size: 20px;
  margin-bottom: 4px;
  color: ${props => props.$color};
`;

export const StatLabelText = styled.div`
  font-family: ${authTheme.textStyles.subheading.fontFamily};
  font-weight: ${authTheme.textStyles.subheading.fontWeight};
  font-size: 12px;
  color: ${authTheme.colors.forestTeal};
`;

export const FloatingActionButton = styled(motion.div)<{ $backgroundColor?: string }>`
  position: absolute;
  color: white;
  padding: 8px;
  border-radius: 50%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 2px solid white;
  background-color: ${props => props.$backgroundColor || brand.primaryMain};

  ${respondTo.smUp} {
    padding: 12px;
    border: 3px solid white;
  }

  ${respondTo.mdUp} {
    padding: 16px;
    border: 4px solid white;
  }
`;

export const EmpoweringMessageContainer = styled(motion.div)`
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 2px solid ${brand.primaryLight}30;
  position: relative;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.9);

  ${respondTo.smUp} {
    padding: 24px;
  }

  ${respondTo.mdUp} {
    padding: 32px;
    border-radius: 24px;
  }
`;

export const EmpoweringMessageGradientBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, ${brand.commonBackground}, ${brand.paleGray}, ${brand.primaryLight});
`;

export const EmpoweringMessageText = styled.p`
  font-family: ${authTheme.textStyles.heading.fontFamily};
  font-size: ${authTheme.textStyles.heading.fontSize};
  font-weight: 600;
  text-align: center;
  color: ${brand.buttonColor};

  ${respondTo.smUp} {
    font-size: 16px;
  }

  ${respondTo.mdUp} {
    font-size: 18px;
  }

  ${respondTo.lgUp} {
    font-size: 20px;
  }
`;

export const EmpoweringMessageDecoration = styled(motion.div)`
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  opacity: 0.3;
  background: linear-gradient(45deg, ${brand.commonBackground}, ${brand.paleGray});

  ${respondTo.smUp} {
    bottom: -8px;
    right: -8px;
    width: 32px;
    height: 32px;
  }
`;

export const Logo = styled.img`
  height: 28px;
  justify-content: center;
  align-items: center;
  

  ${respondTo.smUp} {
    height: 32px;
  }

  ${respondTo.mdUp} {
    height: 56px;

  }
`;

// =============================================================================
// TERMS AND CONDITIONS CHECKBOX COMPONENTS
// =============================================================================

export const StyledAuthCheckbox = styled(Checkbox)`
  && {
    width: 20px;
    height: 20px;
    padding: 0;

    .MuiSvgIcon-root {
      width: 20px;
      height: 20px;
      border-radius: 6px;
      background-color: ${authTheme.colors.checkboxBackground};
      border: 1px solid ${authTheme.colors.checkboxBorder};
      color: transparent;
    }

    &.Mui-checked .MuiSvgIcon-root {
      // background-color: ${authTheme.colors.checkboxBackground}; /* Keep light gray background */
      // border: 1px solid ${authTheme.colors.checkboxBorder};
      color: ${authTheme.colors.checkboxTick}; /* Dark navy tick */
    }

    &:hover .MuiSvgIcon-root {
      background-color: ${authTheme.colors.checkboxBackground};
      border: 1px solid ${authTheme.colors.checkboxBorder};
    }

    &.Mui-focusVisible .MuiSvgIcon-root {
      outline: 2px solid ${authTheme.colors.checkboxBorder}40;
      outline-offset: 2px;
    }
  }
`;

// Terms and Conditions Label
export const TermsLabel = styled.label`
  font-family: ${authTheme.textStyles.checkboxLabel.fontFamily};
  font-size: ${authTheme.textStyles.checkboxLabel.fontSize};
  font-weight: ${authTheme.textStyles.checkboxLabel.fontWeight};
  line-height: ${authTheme.textStyles.checkboxLabel.lineHeight};
  letter-spacing: ${authTheme.textStyles.checkboxLabel.letterSpacing};
  color: ${brand.buttonColor};
  cursor: pointer;
  user-select: none;

  .terms-link {
    color: ${authTheme.colors.checkboxBorder};
    text-decoration: underline;
    font-weight: ${fontWeight.semiBold};
  }
`;

// Terms and Conditions Container
export const TermsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing[2]};
  margin-top: ${spacing[3]};
`;

// Styled Terms Container using FormControlLabel
export const StyledTermsContainer = styled(FormControlLabel)`
  align-items: flex-start !important;
  margin: 16px 0 20px 0 !important;
  gap: 8px !important;

  .MuiCheckbox-root {
    padding: 0 !important;
    margin-top: 2px !important;
    align-self: flex-start !important;
  }

  .MuiFormControlLabel-label {
    margin-left: 0 !important;
    line-height: 1.5 !important;
  }
`;

// Styled Regular Text for Terms
export const StyledRegularB1 = styled(Typography)`
  font-family: ${authTheme.textStyles.checkboxLabel.fontFamily} !important;
  font-size: ${authTheme.textStyles.checkboxLabel.fontSize} !important;
  font-weight: ${authTheme.textStyles.checkboxLabel.fontWeight} !important;
  line-height: 1.5 !important;
  letter-spacing: ${authTheme.textStyles.checkboxLabel.letterSpacing} !important;
  color: ${authTheme.colors.text} !important;
  margin: 0 !important;
  padding: 0 !important;

  .terms-link {
    color: ${authTheme.colors.link};
    cursor: pointer;
    font-weight: ${fontWeight.semiBold};
  }
`;

// Styled Link for Terms
export const StyledTermsLink = styled.span`
  color: ${authTheme.colors.link};
  cursor: pointer;
  font-weight: ${fontWeight.semiBold};
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }
`;

export const AuthFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80px;
  gap: ${spacing[1]};
`;

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: ${spacing[8]};
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};

  ${respondTo.smUp} {
    gap: ${spacing[4]};
  }

  ${respondTo.mdUp} {
    gap: ${spacing[4]};
  }

  ${respondTo.lgUp} {
    gap: ${spacing[5]};
  }
`;

export const ErrorContainer = styled.div`
  padding: ${spacing[3]};
  border-radius: ${borderRadius.lg};
  background-color: #fef2f2;
  border: 1px solid #fecaca;
`;

export const ErrorContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
`;

export const ErrorIcon = styled.div`
  color: #ef4444;
`;

export const ErrorText = styled.span`
  font-size: ${fontSize.textSm};
  color: #b91c1c;
  margin-top: 5px;
`;

