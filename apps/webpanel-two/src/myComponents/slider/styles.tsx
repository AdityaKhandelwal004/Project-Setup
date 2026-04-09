import { Slider, Typography } from "@mui/material";
import { respondTo, brand, fontSize, fontWeight } from "@mono/theme";
import styled, { css } from "styled-components";

export const StyledSlider = styled(Slider)``

export const StyledSliderLabel = styled.p<{textCenter?:boolean}>`
font-size: ${fontSize.h5};
  font-weight: ${fontWeight.semiBold};
 line-height: 24px;
  text-align: ${({textCenter})=>(textCenter?"center":"start")};
margin:0;
margin-bottom:16px;
${respondTo.mdDown}{
  font-size:14px;
  line-height:21px;
}
`
export const NumberDisplay = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: ${fontWeight.semiBold};
  color: ${brand.primary100};
  display: flex;
  justify-content: center;
  margin-left:-4px;
  align-items: center;
  width: 60.29px;
  height: 60.66px;
  border: 1.28px solid ${brand.primary100};
  border-radius: 70.56px;
  background: ${brand.white};
  padding: 12.83px;
  gap: 12.83px;
`;

export const BudgetDisplay = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${brand.white};
  padding: 12.83px 16px;
  gap: 8px;
  white-space: nowrap;
`;

export const BudgetAmount = styled.div`
  font-size: 24px;
  font-weight: ${fontWeight.bold};
  color: #ef4444;
`;

export const BudgetPercentage = styled.div`
  font-size: 18px;
  font-weight: ${fontWeight.bold};
  color: #000000;
`;

export const BudgetDescription = styled.div`
  font-family: 'Nohemi', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #666666;
  text-align: center;
  line-height: 100%;
  letter-spacing: 0%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  max-width: 100%;
`;

export const SliderBottomLine = styled.div`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background-color: #e5e7eb;
`;

export const AnimationWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 359.19px;
    height: 254px;
    left: 6.21px;
    top: 16px;
    overflow: hidden;
    margin-bottom: 0;
`;

export const TextBelowNumber = styled.div`
  position: absolute;
  top: 71%;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Poppins', sans-serif;
  font-size: 15.39px;
  font-weight: 600;
  line-height: 23.09px;
  margin-left:-4px;
  letter-spacing: 0%;
  color: #000000;
  white-space: nowrap;
`;
export const ComponentWrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
`;

export const SliderParentWrapper = styled.div`
  background-color:${brand.white};
  z-index:2;
  text-align:center;
  padding:24px;
`;

export const SliderChildWrapper = styled.div`
  margin-top:24px;
  text-align:center;
`
