import { useEffect, useState } from "react";
import { Button, Chip, Modal, ModalAction } from "@mono/components";
import { usePopupReducer } from "@mono/hooks/src/popup";
import EditProfileForm from "./EditProfileForm";
import {
  ProfileCard,
  ProfileHeader,
  ProfileSection,
  ProfileImageWrapper,
  ProfileImage,
  ProfileDetails,
  ProfileRow,
  ProfileField,
  FieldLabel,
  FieldValue,
  ChangePasswordButton,
  EmailContainer,
  MFALabelContainer,
  FeedbackSection,
  FeedbackContent,
  FeedbackLeft,
  FeedbackIconWrapper,
  FeedbackTextContainer,
  FeedbackTitle,
  FeedbackDescription,
  OpenFeedbackButton,
  StyledLogout,
  StyledMFAContainer,
} from "./styles";
import { Grid2, Tooltip, Zoom } from "@mui/material";
import { VerificationActionType, type Id } from "@mono/models";
import messages from "../../messages";
import { useDispatch, useSelector } from "react-redux";
import type { ReduxState } from "../../redux/reducers";
import {
  apiCall,
  fetchUserProfile,
  logout,
} from "../../redux/actions";
import ChangePasswordForm from "./changePasswordForm";
import { ChipSize } from "@mono/components/src/customChip/styles";
import { fontWeight, otherColour, primitiveColors } from "@mono/theme";
import { SEND_EMAIL_LINK } from "../../api";
import VerifySecureCodeForm from "./mfa/verifySecureCodeForm";
import RequestMFAForm from "./mfa/requestMFAForm";
import { calculateRemainingSubscriptionDays, HttpMethods } from "@mono/utils";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  formatDateForDisplay,
} from "../../myUtils/commonFunctions";
import EditIcon from "@mui/icons-material/Edit";

// Simple Edit Icon component
const StyledEditIcon = () => <EditIcon sx={{ fontSize: "18px" }} />;

const MyProfile = () => {
  const reduxDispatch = useDispatch();


  return (
    <div >
Arpit

     
    </div>
  );
};

export default MyProfile;
