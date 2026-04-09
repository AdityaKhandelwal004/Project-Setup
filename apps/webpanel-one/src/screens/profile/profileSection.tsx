import { Container } from '../../myComponents';
import { fontSize, fontWeight, otherColour, primitiveColors } from '@mono/theme';
import { Button, Chip, Modal } from '@mono/components';
import { ChipSize } from '@mono/components/src/customChip/styles';
import { CircularProgress, Divider, Grid2 } from '@mui/material';
import { AdminBadge, Avatar, Header, InfoGrid, InfoIcon, InfoItem, Label, LabelWithIcon, LastLogged, MFARow, Name, PageContainer, ProfileCard, ProfileHeader, ProfileInfo, Section, SectionTitle, SecurityInfo, SecurityRow, StyledDashDivider, StyledEditIcon, StyledPhoto, StyledPhotoContainer, UserDetails, UserName, Value } from './styles';
import mfaIcon from '../../../src/assets/mfaIcon.png';
import { useDispatch, useSelector } from 'react-redux';
import { usePopupReducer } from '@mono/hooks';
import EditForm from './editForm';
import messages from '../../messages';
import ChangePasswordForm from './changePasswordForm';
import type { ReduxState } from '../../redux/reducers';
import { apiCall, fetchUserProfile } from '../../redux/actions';
import { VerificationActionType, type Id } from '@mono/models';
import DisableMFAForm from './mfa/disableMFAForm';
import EnableMFAForm from './mfa/enableMFAForm';
import VerifySecureCodeForm from './mfa/verifySecureCodeForm';
import { useEffect, useState } from 'react';
import { USER_TWO_FA_AUTENTICATION } from '../../api';
import { Status } from '@mono/models/src/modules';
import moment from 'moment';

const  ProfileSection = () => {

  const [isEnable, setIsEnable] = useState<boolean>(false);
  const [startLoader, setStartLoader] = useState<boolean>(false);
  const [userTwoFactorAuthentication, setUserTwoFactorAuthentication] = useState([]);
  const [refreshUserAuthentication, setRefreshUserAuthentication] = useState<boolean>(false);

  const reduxDispatch = useDispatch() as any;

    const {
    visibility: editFormVisibility,
    showPopup: showEditForm,
    hidePopup: hideEditForm,
  } = usePopupReducer();

    const {
    visibility: formVisibility,
    showPopup: showForm,
    hidePopup: hideForm,
  } = usePopupReducer();

  const userProfile = useSelector((state: ReduxState) => state.profile);

    const {
    visibility: disableMFAFormVisibility,
    showPopup: showDisableMFAForm,
    hidePopup: hideDisableMFAForm,
  } = usePopupReducer();

  const {
    visibility: enableMFAFormVisibility,
    showPopup: showEnableMFAForm,
    hidePopup: hideEnableMFAForm,
  } = usePopupReducer();

  const {
    visibility: verifySecureCodeFormVisibility,
    showPopup: showVerifySecureCodeForm,
    hidePopup: hideVerifySecureCodeForm,
    metaData: verifySecureCodeFormConfig,
  } = usePopupReducer<{
    method: Id;
    value: string;
    verificationActionType: VerificationActionType;
    resendOTP: () => void;
  }>();


  const isStatusActive = userTwoFactorAuthentication?.status === Status.active;
  
  const renderContent = () => {
    if (startLoader) {
      return <CircularProgress size="20px" />;
    }
    return (
         <Grid2>
          <Button
            label={isStatusActive ? 'Disable MFA' : 'Enable MFA'}
            variant="outlined"
             onClick={isStatusActive ? showDisableMFAForm : showEnableMFAForm}
            // color="error"
            />
            </Grid2>
    );
  };

  const renderStatus = () => {
   if (startLoader) {
     return <CircularProgress size="20px" />;
   }
   return (
        <Chip
          text={isStatusActive ? Status.active : Status.inactive}
            bgColor={isStatusActive ? primitiveColors.green50 : otherColour.errorBg }
            textColor={isStatusActive ? otherColour.chipSuccess : otherColour.errorDefault}
            chipSize={ChipSize.Large}
            customWeight={fontWeight.semiBold}
            radius='4px'
          />
   );
 };


    useEffect(() => {
    setStartLoader(true);
    // reduxDispatch(fetchMFA());
    reduxDispatch(
      apiCall(
        USER_TWO_FA_AUTENTICATION,
        (res) => {
          if (res) {
            setIsEnable(false);
            setUserTwoFactorAuthentication(res);
          }
          setStartLoader(false);
        },
        () => {
          setStartLoader(false);
        }
      )
    );
  }, [refreshUserAuthentication]);

  return (
    <Container noPadding heading="Profile">
    <PageContainer>
      <Header>{messages?.general?.profile}</Header>
      <ProfileCard>
        <ProfileHeader>
          <ProfileInfo>
                {userProfile?.profilePicturePath ? (
                  // <StyledProfileContainer onClick={handleClick}>
                    <Avatar
                      src={userProfile?.profilePicturePath}
                      alt="profile"
                    />
                  // </StyledProfileContainer>
                ) : (
                  <StyledPhotoContainer style={{height: '50px', width: '50px'}}>
                    <StyledPhoto fontSize={`${fontSize.h3} !important`}>
                      {" "}
                      {userProfile?.firstName?.charAt(0)}{" "}
                    </StyledPhoto>
                  </StyledPhotoContainer>
                 )}
            <UserDetails>
              <UserName>
                <Name>{userProfile?.firstName} {userProfile.lastName}</Name>
                <AdminBadge>Admin</AdminBadge>
              </UserName>
              <LastLogged>Last logged in: { userProfile?.lastLoginAt ? moment(userProfile?.lastLoginAt)?.local()?.format("D MMM YYYY hh:mm A") : '--'}</LastLogged>
            </UserDetails>
          </ProfileInfo>
          <Grid2 display={"flex"} gap={'16px'} alignItems={'center'}>
          <Grid2>
          <Button
            label={'Edit'}
            variant="outlined"
            startIcon={<StyledEditIcon />}
            onClick={showEditForm}
            />
            </Grid2>
             <Grid2>
          <Button
            label={'Change password'}
            variant="outlined"
            onClick={showForm}
            />
            </Grid2>
            </Grid2>
        </ProfileHeader>

        <Section>
          <SectionTitle>{messages?.profile?.basicInformation}</SectionTitle>
          <InfoGrid>
            <InfoItem>
              <Label>{messages?.general?.firstName}</Label>
              <Value>{userProfile?.firstName || '--'}</Value>
            </InfoItem>
            <InfoItem>
              <Label>{messages?.general?.lastName}</Label>
              <Value>{userProfile?.lastName || '--'}</Value>
            </InfoItem>
            <InfoItem>
              <Label>{messages?.general?.email}</Label>
              <Value>
                {userProfile?.email || '--'} 
              </Value>
            </InfoItem>
          </InfoGrid>
            <StyledDashDivider/>
          <InfoGrid>
            <InfoItem>
              <Label>{messages?.general?.dob}</Label>
              <Value>{userProfile?.dateOfBirth || '--'}</Value>
            </InfoItem>
          </InfoGrid>
        </Section>

        <Divider sx={{marginBottom: '24px'}}/>

        <Section>
          <SectionTitle>{messages?.profile?.security}</SectionTitle>
          {/* <SecurityRow>
            <SecurityInfo>
              <Label>{messages?.general?.password}</Label>
              <Value>--</Value>
            </SecurityInfo>
         <Grid2>
          <Button
            label={'Change password'}
            variant="outlined"
            onClick={showForm}
            />
            </Grid2>
          </SecurityRow> */}

          <MFARow>
            <SecurityInfo>
              <LabelWithIcon>
                <Label>{messages?.profile?.multiFactorAuthentication}</Label>
                <InfoIcon src={mfaIcon} alt='mfa-icon' />
              </LabelWithIcon>

             {renderStatus()}
            </SecurityInfo>
             {renderContent()}
          </MFARow>
        </Section>
      </ProfileCard>
    </PageContainer>
        <Modal
          show={editFormVisibility}
          onClose={hideEditForm}
          heading={messages?.general?.edit}
        >
          <EditForm
            onCancel={hideEditForm}
            onSuccess={() => {
              reduxDispatch(fetchUserProfile());
              hideEditForm();
            }}
          />
        </Modal>
        <Modal
          show={formVisibility}
          onClose={hideForm}
          heading={messages?.profile?.changePasswordForm?.heading}
        >
          <ChangePasswordForm onSuccess={hideForm} onCancel={hideForm} />
        </Modal>

         <Modal
          fitContent
          show={disableMFAFormVisibility}
          onClose={hideDisableMFAForm}
          heading={messages?.profile?.disableMFAForm?.heading}
        >
          <DisableMFAForm
            onCancel={() => hideDisableMFAForm()}
            onSuccess={() => {
              hideDisableMFAForm();
            }}
            showVerifySecureCodeForm={showVerifySecureCodeForm}
          />
        </Modal>

        <Modal
          fitContent
          show={enableMFAFormVisibility}
          onClose={hideEnableMFAForm}
          heading={messages?.profile?.enableMFAForm?.heading}
        >
          <EnableMFAForm
            onCancel={() => hideEnableMFAForm()}
            onSuccess={() => {
              hideEnableMFAForm();
            }}
            isSetup={!!userTwoFactorAuthentication?.method}
            showVerifySecureCodeForm={showVerifySecureCodeForm}
          />
        </Modal>

        <Modal
          fitContent
          show={verifySecureCodeFormVisibility}
          onClose={hideVerifySecureCodeForm}
          heading={messages?.profile?.verifySecureCode?.heading}
        >
          <VerifySecureCodeForm
            onCancel={() => {
              hideVerifySecureCodeForm();
              if (
                verifySecureCodeFormConfig?.verificationActionType ===
                VerificationActionType.DISABLE
              ) {
                showDisableMFAForm();
              } else {
                showEnableMFAForm();
              }
            }}
            onSuccess={() => {
              hideVerifySecureCodeForm();
              setRefreshUserAuthentication((prev) => !prev);
              // toast(profileSectionToastComponent());
            }}
            method={verifySecureCodeFormConfig?.method}
            value={verifySecureCodeFormConfig?.value}
            actionType={
              isEnable
                ? VerificationActionType.ENABLE
                : verifySecureCodeFormConfig?.verificationActionType
            }
            showRecoveryCodeForm={isEnable ? showRecoveryCodeForm : () => {}}
            resendOTP={verifySecureCodeFormConfig?.resendOTP}
          />
        </Modal>

    </Container>
  );
}

export default ProfileSection;