import type { ChipProps } from '@mui/material';
import React from 'react';
import { StyledChip } from './styles.tsx';

type CustomChipProps = ChipProps & {
    width?: string;
    icon?: React.ReactNode;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    // Optional label typography overrides
    labelFontSize?: string;
    labelLineHeight?: string;
    labelFontWeight?: number | string;
};

const CustomChip = ({
    width,
    label,
    icon,
    startIcon,
    endIcon,
    labelFontSize,
    labelLineHeight,
    labelFontWeight,
    ...props
}: CustomChipProps) => {
    const chipIcon = startIcon || icon;

    const chipProps: any = {
        width,
        label,
        labelFontSize,
        labelLineHeight,
        labelFontWeight,
        ...props
    };

    // Only add icon if it exists and is a valid React element
    if (chipIcon && React.isValidElement(chipIcon)) {
        chipProps.icon = chipIcon;
    }

    // Only add deleteIcon if endIcon exists and is a valid React element
    if (endIcon && React.isValidElement(endIcon)) {
        chipProps.deleteIcon = endIcon;
    }

    return <StyledChip {...chipProps} />;
};

export default CustomChip;
