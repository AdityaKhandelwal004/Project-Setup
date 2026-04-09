import styled from "styled-components";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { brand, fontFamilies, fontSize, fontWeight, greyScaleColour, primitiveColors } from "@mono/theme";
import { Typography } from "@mui/material";
import { FormRow } from "@mono/components";


export const StyledDashDivider = styled.div`
height: 1px;
width: 100%;
border-bottom: 1px dashed #E8E8E8;
margin-bottom: 24px;
`



export const StyledEditIcon = styled(EditOutlinedIcon)`
    color: ${greyScaleColour.grey50};
    cursor: pointer;
    width: 16px !important;
    height: 16px !important;

  `


  export const PageContainer = styled.div`
    padding: 14px 0;
  `;
  
  export const Header = styled.h1`
     font-size: ${fontSize.h1} !important;
    font-weight: ${fontWeight.semiBold} !important;
    margin-bottom: 14px;
  `;
  
  export const ProfileCard = styled.div`
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 24px;
  `;
  
  export const ProfileHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e0e0e0;
  
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 16px;
    }
  `;
  
  export const ProfileInfo = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
  `;
  
export const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  `;
  
 export const UserDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `;
  
 export const UserName = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  `;
  
 export const Name = styled.h2`
    font-size: ${fontSize.h3} !important;
    font-weight: ${fontWeight.medium} !important;
    margin: 0;
  `;
  
 export const AdminBadge = styled.span`
    background: #F8F8F8;
    color: ${greyScaleColour.darkGrey};
    padding: 4px 8px;
    border-radius: 4px;
    font-size: ${fontSize.b1} !important;
    font-weight: ${fontWeight.semiBold} !important;
    font-family: ${fontFamilies.secondary} !important;    
  `;
  
 export const LastLogged = styled.p`
    font-family: ${fontFamilies.secondary} !important;
    font-size: ${fontSize.b1} !important;
    font-weight: ${fontWeight.regular} !important;
    color: ${primitiveColors.neutral500};
  `;
  
 export const Section = styled.div`
    margin-bottom: 32px;
  
    &:last-child {
      margin-bottom: 0;
    }
  `;
  
 export const SectionTitle = styled.h3`
    color: ${primitiveColors.purple500};
    font-size: ${fontSize.textLg} !important;
  font-weight: ${fontWeight.medium} !important;
    margin-bottom: 16px;
  `;
  
  export const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 24px;
  
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `;
  
 export const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `;
  
export  const Label = styled.span`
    color: ${primitiveColors.neutral500};
    font-size: ${fontSize.b1} !important;
  font-family: ${fontFamilies.secondary} !important;
  `;
  
 export const Value = styled.span`
    font-size: ${fontSize.h5} !important;
    font-weight: ${fontWeight.semiBold} !important;
    font-family: ${fontFamilies.secondary} !important;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  `;
  
 export const SecurityRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  `;
  
 export const SecurityInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `;
  
 export const MFARow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  `;
  

  export const InfoIcon = styled.img`
    cursor: help;
    margin-left: 4px;
  `;
  
  export const LabelWithIcon = styled.div`
    display: flex;
    align-items: center;
  `;

  export const StyledFileInput = styled.input`
  display: none;
`;



export const StyledPhoto = styled(Typography)`
  font-size: 52px !important;
  font-weight: ${fontWeight.regular} !important;
  cursor: pointer;
  color: ${brand.white};
`;


export const StyledPhotoContainer = styled.div`
  width: 120px;
  height:120px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px 0px;
  border-radius: 9999px;
  background-color: ${brand.primaryMain};
  margin-bottom: 10px;
`;


export const StyledProfile = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
`;

export const StyledPhotoContent = styled(Typography)`
  font-size: ${fontSize.h5} !important;
  font-weight: ${fontWeight.medium} !important;
  color: ${primitiveColors.purple800} !important;
  text-decoration: underline;
  cursor: pointer;
  font-family: ${fontFamilies.secondary} !important;
`;


export const StyledProfileContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 9999px;
  background-color: ${brand.primaryMain};
  align-items: center;
  justify-content: center;
  display: flex;
  margin-bottom: 10px;
;
`;

export const StyledFormRow = styled(FormRow)`
 margin-bottom: 24px;
align-items: center;
 gap: 62px !important;
    
`

export const StyledUpdateMultiFactorAuthenticationNote = styled(Typography)`
  font-size: ${fontSize.h5} !important;
  font-weight: ${fontWeight.regular} !important;
  line-height: 24px !important;
`;
