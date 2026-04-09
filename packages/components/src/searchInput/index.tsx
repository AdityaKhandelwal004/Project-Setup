import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  SearchInputContainer,
  StyledActionItem,
  StyledSearchInput,
} from './styles.tsx';
import { colors, greyScaleColour, primitiveColors } from '@mono/theme/style.palette.ts';


interface Props{
    label: string;
    connectFilter: (name: string, extraProps?: Record<any, any>) => (Filter: any) => any
}


export const SearchInputButton: React.FC<any> = ({ onChange, value, ...props }) => (
  <StyledSearchInput
    {...props}
    value={ value || ''}
    onChange={(e: any) => {
      if (onChange) {
        onChange(e?.target?.value);
      }
    }}
  />
);

const SearchInput: React.FC<Props> = ({ label, connectFilter }) => (
  <StyledActionItem>
    <SearchInputContainer data-testid="search-input">
      {connectFilter('search', {
        autoApplyFilters: true,
        placeholder: label,
        useDebounce: true
      })(SearchInputButton)}
      <SearchIcon
        fontSize="medium"
        style={{
          margin: '10px',
          color: primitiveColors.neutral500,
        }}
      />
    </SearchInputContainer>
  </StyledActionItem>
);
export default SearchInput;