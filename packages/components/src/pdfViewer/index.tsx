import { Typography } from "@mui/material";
import React from "react";
import { StyledPdfViewerContainer, StyledPdfViewerIframe } from "./styles.tsx";

const PdfViewer: React.FC<{
    pdfUrl: string;
}> = ({
    pdfUrl
}) => {
        return (
            <StyledPdfViewerContainer>
                <StyledPdfViewerIframe
                    title="PDF Viewer"
                    frameBorder="0"
                    src={pdfUrl}
                >
                    <Typography>Your browser does not support iframes.</Typography>
                </StyledPdfViewerIframe>
            </StyledPdfViewerContainer>
        );
    };

export default PdfViewer;