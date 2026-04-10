import { Container } from '../../myComponents';
import { fontSize } from '@mono/theme';
import { Button, Modal } from '@mono/components';
import { Grid2 } from '@mui/material';
import { Header, PageContainer, ProfileCard, ProfileHeader, ProfileInfo, StyledEditIcon, StyledPhoto, StyledPhotoContainer } from './styles';
import { usePopupReducer } from '@mono/hooks';
import EditForm from './editForm';
import messages from '../../messages';
import ChangePasswordForm from './changePasswordForm';

const ProfileSection = () => {
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

  return (
    <Container noPadding heading="Profile">
      <PageContainer>
        <Header>{messages?.general?.profile}</Header>
        <ProfileCard>
          <ProfileHeader>
            <ProfileInfo>

              <StyledPhotoContainer style={{ height: '50px', width: '50px' }}>
                <StyledPhoto fontSize={`${fontSize.h3} !important`}>
                  {" "}
                  AD
                </StyledPhoto>
              </StyledPhotoContainer>

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
            // reduxDispatch(fetchUserProfile());
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

    </Container>
  );
}

export default ProfileSection;