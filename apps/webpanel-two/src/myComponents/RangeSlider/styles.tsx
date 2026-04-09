import styled from '@emotion/styled';
import { greyScaleColour, fontWeight } from '@mono/theme';

export const RangeSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RangeSliderHeading = styled.h3`
  font-size: 18px;
  font-weight: ${fontWeight.semiBold};
  color: ${greyScaleColour.grey100};
  margin: 0;
  min-height: 52px;
  line-height: 26px;
`;

export const AmountDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const AmountValue = styled.div`
  font-size: 28px;
  font-weight: ${fontWeight.bold};
  color: ${greyScaleColour.grey100};
  margin-bottom: 16px;
`;

export const AmountSeparator = styled.div`
  width: 100%;
  height: 2px;
  background-color: #E5E7EB;
  margin-bottom: 24px;
`;

export const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 14px;
  color: ${greyScaleColour.grey60};
  font-weight: ${fontWeight.medium};

  span {
    font-size: 14px;
    line-height: 21px;
  }
`;
