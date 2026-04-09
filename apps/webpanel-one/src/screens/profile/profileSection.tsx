import React from 'react';
import { Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Container, Modal } from '../../components';
import {
  DetailCardHeading,
  StyledCardContent,
  StyledChildren,
  StyledImage,
  StyledImageContainer,
  StyledLink,
  StyledPhoto,
  StyledPhotoContainer,
  StyledProfile,
  StyledProfileContainer,
  StyledTableContent,
  StyledTableHeading,
} from './styles';
import messages from '../../messages';
import { usePopupReducer } from '../../hooks';
import ChangePasswordForm from './changePasswordForm';
import EditForm from './editForm';
import { ReduxState } from '../../redux/reducers';
import { fetchUserProfile } from '../../redux/actions';
import { baseImageUrl } from '../../config';

const ProfileSection: React.FC = () => {
  const userProfile = useSelector((state: ReduxState) => state.profile);
  const reduxDispatch = useDispatch();
  const {
    visibility: formVisibility,
    showPopup: showForm,
    hidePopup: hideForm,
  } = usePopupReducer();

  const {
    visibility: editFormVisibility,
    showPopup: showEditForm,
    hidePopup: hideEditForm,
  } = usePopupReducer();

  return (
    <Container hasIcon={false} heading={messages?.profile?.heading}>
      <Card
        cardCss={{
          marginTop: '16px',
          padding: '24px 24px 8px 24px',
          gap: '24px',
        }}
        noHeader
      >
        <Grid container gap="24px">
          <Grid container item gap="16px">
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <DetailCardHeading variant="h3">
                  {messages?.header?.generalInfo}
                </DetailCardHeading>
              </Grid>
              <Grid item>
                <StyledImageContainer onClick={showEditForm}>
                  <StyledImage src="/assets/images/write.svg" alt="Edit" />
                </StyledImageContainer>
              </Grid>
            </Grid>
            <StyledChildren container item gap="32px">
              <Grid item>
                <StyledCardContent>
                  {messages?.profile?.photo}
                </StyledCardContent>
                {userProfile
                && 'profilePhoto' in userProfile
                && userProfile?.profilePhoto ? (
                  <StyledProfileContainer>
                    <StyledProfile
                      src={
                        userProfile?.profilePhoto
                          ? `${baseImageUrl}/${userProfile.profilePhoto}`
                          : ''
                      }
                      alt="profile"
                    />
                  </StyledProfileContainer>
                  ) : (
                    <StyledPhotoContainer>
                      <StyledPhoto>
                        {userProfile?.name?.charAt(0).toUpperCase()}
                      </StyledPhoto>
                    </StyledPhotoContainer>
                  )}
              </Grid>
              <Grid item>
                <Grid container item gap="32px">
                  <Grid item>
                    <StyledTableHeading>
                      {messages?.profile?.profileSection?.name}
                    </StyledTableHeading>
                    <StyledTableContent>
                      {userProfile?.name ? userProfile.name.charAt(0).toUpperCase()
                        + userProfile.name.slice(1) : ''}
                    </StyledTableContent>
                  </Grid>
                  <Grid item>
                    <StyledTableHeading>
                      {messages?.profile?.profileSection?.emailAddress}
                    </StyledTableHeading>
                    <StyledTableContent>
                      {userProfile?.email}
                    </StyledTableContent>
                  </Grid>
                  <Grid item>
                    <StyledTableHeading>
                      {messages?.profile?.profileSection?.phoneNumber}
                    </StyledTableHeading>
                    <StyledTableContent>
                      {userProfile?.phoneNumber
                        ? `${userProfile?.dialCode || ''} ${userProfile.phoneNumber}`
                        : '-'}
                    </StyledTableContent>
                  </Grid>
                </Grid>
              </Grid>
            </StyledChildren>
          </Grid>

          <Grid container item gap="16px">
            <Grid container item alignItems="center">
              <Grid item>
                <DetailCardHeading variant="h3">
                  {messages?.profile?.password?.heading}
                </DetailCardHeading>
              </Grid>
            </Grid>

            <StyledChildren container item gap="8px">
              <Grid item>
                <StyledCardContent>
                  {messages?.profile?.password?.password}
                </StyledCardContent>
              </Grid>
              <Grid item>
                <StyledLink onClick={showForm}>
                  {messages?.profile?.password?.changePassword}
                </StyledLink>
              </Grid>
            </StyledChildren>
          </Grid>
        </Grid>
      </Card>

      <Modal
        fitContent
        show={formVisibility}
        onClose={hideForm}
        heading={messages?.profile?.changePasswordForm?.heading}
      >
        <ChangePasswordForm onSuccess={hideForm} />
      </Modal>

      <Modal
        fitContent
        show={editFormVisibility}
        onClose={hideEditForm}
        heading={messages?.profile?.editForm?.heading}
      >
        <EditForm
          onCancel={() => hideEditForm()}
          onSuccess={() => {
            reduxDispatch(fetchUserProfile());
            hideEditForm();
          }}
        />
      </Modal>
    </Container>
  );
};

export default ProfileSection;
