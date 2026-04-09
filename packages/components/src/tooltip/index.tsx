import React from 'react';
import type { JSX } from 'react';
import { StyledTooltip } from './styles.tsx';

interface Props {
    title:string;
    children?:(JSX.Element)
}

const Tooltip: React.FC<Props> = ({
    title, children
})=>{

    return (
        <StyledTooltip 
            title={title}
            placement={'top'}
        >
            {children}
        </StyledTooltip>
    )
}

export default Tooltip;