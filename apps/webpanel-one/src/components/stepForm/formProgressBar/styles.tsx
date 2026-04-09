import styled from 'styled-components';
import { brand, colors } from '../../../theme/style.palette';
import { lightenColor } from '../../../utils/constant';

export const StyledContainer = styled.div`
  border-radius: 5px;
  background : ${colors.grey10};
  height: 30px;
  margin: 25px 0;
  box-shadow: inset 0px 5px 5px -5px rgba(0, 0, 0, 0.3);
`;
export const StyledBarWrapper = styled.div`
  background : grey;
`
export const StyledProgressBar = styled.div<{width ?: number}>`
  width: ${(props) => props.width ? props.width : 0}%;
  height: 100%;
  border-radius: 5px;
  background: repeating-linear-gradient(
    45deg,
    ${brand.primaryMain},
    ${brand.primaryMain} 20px,
    /* Width of each block */ ${lightenColor(brand.primaryMain, 15)} 20px,
    /* Width of each block */ ${lightenColor(brand.primaryMain, 15)} 40px
      /* Sum of widths of two blocks */
  );
`;
