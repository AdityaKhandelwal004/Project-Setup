import React from 'react';
import type { JSX } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { brand, colors, greyScaleColour } from '@mono/theme/style.palette.ts';
import {
    SearchInputContainer,
    StyledActionItem,
    StyledActionItemContainer,
    StyledContainer,
    StyledFilterSection,
    StyledSearchDiv,
} from "./styles.tsx"
import messages from '@mono/messages';
import SearchInput from '../searchInput/index.tsx';

export interface FilterSpec {
    id: string;
    render: () => JSX.Element;
    renderAction?: () => void;
}


interface Props {
    ctaLabel?: string;
    handleCtaClick?: () => void;
    disableSearch?: boolean;
    connectFilter?: any;
    updateFilters?: any;
    resetFilters?: any;
    filters?: FilterSpec[];
    dateFilter?:any;
    listHeaderStyle?: React.CSSProperties;
    searchLabel?: string;
    isFullWidth?: boolean;
}

const ListHeader: React.FC<Props> = ({
    ctaLabel, disableSearch,
    connectFilter, filters, updateFilters,
    resetFilters, handleCtaClick,dateFilter,listHeaderStyle, searchLabel, isFullWidth=false
}) => {
    return (
        <StyledContainer style={listHeaderStyle}>
            <StyledActionItemContainer>
                {(!disableSearch && connectFilter) && <StyledActionItem isFullWidth={isFullWidth}>
                    <StyledSearchDiv isFullWidth={isFullWidth}>
                        <SearchInput label= {searchLabel || 'Search'} connectFilter={connectFilter}/>
                    </StyledSearchDiv>
                </StyledActionItem>}
                {filters && filters?.length !== 0 && <StyledFilterSection isFullWidth={isFullWidth}>
                {filters
                    ?.filter((filter) => filter?.renderAction ? filter?.renderAction() : true)
                    ?.map((filter) => (
                        <StyledActionItem key={filter.id}>
                            {filter?.render()}
                        </StyledActionItem>
                    ))}
                </StyledFilterSection>}
                {resetFilters && <StyledActionItem>
                    <Button
                        variant="text"
                        onClick={resetFilters}
                    >
                        {messages.general.reset}
                    </Button>
                </StyledActionItem>}
            </StyledActionItemContainer>
            {ctaLabel && <StyledActionItemContainer justifyContent={'flex-end'}>
                <StyledActionItem lastItem>
                    <Button
                        variant="contained"
                        endIcon={<AddIcon />}
                        onClick={handleCtaClick}
                    >
                        {ctaLabel}
                    </Button>
                </StyledActionItem>
            </StyledActionItemContainer>}
        </StyledContainer>
    )
}

export default ListHeader;