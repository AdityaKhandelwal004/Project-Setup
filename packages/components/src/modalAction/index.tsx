import React, { useState } from "react";
import { StyledContainer, StyledCtaContainer, StyledInfo, StyledInfoContainer, StyledTitle } from "./styles.tsx";
import messages from '../messages/index.tsx';
import Button from "../button/index.tsx";


interface Props {
    title?: string;
    info?: string;
    successCta?: string;
    onCancel?: () => void;
    onSuccess?: () => Promise<unknown>;
    closePopup?: () => void;
    isDangerColor?: boolean;
}

const ModalAction: React.FC<Props> = ({
    title, info, successCta,
    onCancel, onSuccess, closePopup, isDangerColor = false
}) => {
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async () => {
        if (submitting) {
            return;
        }
        setSubmitting(true);
        try {
            await onSuccess?.();
            if (closePopup) {
                closePopup();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <StyledContainer>
            <StyledInfoContainer>
                {title && <StyledTitle variant="h3">{title}</StyledTitle>}
                {info && <StyledInfo variant="body1">{info}</StyledInfo>}
            </StyledInfoContainer>
            <StyledCtaContainer >
                <Button
                    variant="outlined"
                    onClick={onCancel}
                    disabled={submitting}
                    label={messages?.general?.cancel}
                    style={{ width: 'fit-content' }}

                />
                <Button
                    variant="contained"
                    onClick={onSubmit}
                    //disabled={submitting}
                    label={successCta || messages?.general?.submit}
                    style={{ width: 'fit-content' }}
                    color={isDangerColor ? "error" : "primary"}
                    isJsx={!submitting}
                    isJsxRight={submitting}
                    JsxImg={() => (
                       (submitting &&<div
                                className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent ml-2"
                                style={{ display: 'inline-block' }}
                            />)
                    )}
                />
            </StyledCtaContainer>
        </StyledContainer>
    )
}

export default ModalAction;