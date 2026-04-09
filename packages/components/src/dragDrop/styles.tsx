import {styled} from 'styled-components';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { fontFamilies, fontSize, fontWeight, greyScaleColour, otherColour, primitiveColors } from '@mono/theme';
import { Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export 
const DragDropContainer = styled.div<{ isDragOver: boolean; hasFile: boolean, customWidth?: string }>`
  width: ${props => props.customWidth || '100%'};
  height: ${props => props.customWidth};
  border: 2px ${props => props.hasFile ? `solid ${primitiveColors.purple500}` : props.isDragOver ? `dashed ${primitiveColors.purple500}` : 'dashed #ccc'};
  border-radius: 8px;
  // padding: 32px 16px;
  text-align: center;
  background-color: ${props => 
    props.hasFile ? '#f8fff8' :
    props.isDragOver ? '#f5f5f5' : 
    '#fafafa'
  };
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  
  &:hover {
    // border-color: #2196f3;
    // background-color: #f5f5f5;
  }
`;

export const FileName = styled.div`
  word-break: break-all;
  overflow-wrap: break-word;
  max-width: 100%;
  padding: 0 8px;
`;

export const FileInfo = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #666;
`;

export const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 14px;
  margin-top: 8px;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const RemoveButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  margin-top: 8px;
  
  &:hover {
    background: #d32f2f;
  }
`;


export const StyledUploadIcon = styled(FileUploadOutlinedIcon)`
  width: 26px !important;
  height: 26px !important;
  cursor: pointer;
  color: ${primitiveColors.orange500};
  margin-bottom: 20px;
`;



export const StyledSubText = styled(Typography)`
  font-weight: ${fontWeight.medium} !important;
  font-family: ${fontFamilies.secondary} !important;
  margin-bottom: 12px !important;
`


export const StyledInfoText = styled(Typography)`
  font-weight: ${fontWeight.medium} !important;
  font-family: ${fontFamilies.secondary} !important;
  font-size: ${fontSize.b2} !important;
  color: ${primitiveColors.grey400};

`

export const ImagePreview = styled.img`
  max-width: 100%;
  width: inherit;
  height: inherit;
  // max-height: 200px;
  border-radius: 6px;
  max-height: 100%;
  object-fit: cover;
`;

export const StyledDeleteIcon = styled(DeleteOutlineOutlinedIcon)<{isAdmin?: boolean, isInactive?: boolean}>`
  color:  ${({isAdmin, isInactive}) => isAdmin || isInactive ? greyScaleColour.grey50 : otherColour.errorDefault};
  width: 20px !important;
  height: 20px !important;
  cursor: ${({isAdmin, isInactive}) => isAdmin || isInactive ? 'default' : 'pointer'};
  position: absolute;
  top: 0;
  right: 0;
  margin: 5px;
`;