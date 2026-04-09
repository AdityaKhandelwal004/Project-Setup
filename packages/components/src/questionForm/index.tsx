import { StyledError } from "../textInput/styles.tsx";
import { StyledOptionContainer, StyledOptionsContainer, StyledOptionText, StyledQuestion, StyledQuestionBorder, StyledQuestionContainer, StyledQuestionNumber, StyledQuestionNumberContainer, StyledQuestionText } from "./styles.tsx";



interface QuestionProps {
    questionIndex: number;
    question: string;
    onChange?: (option: any) => void;
    value?: any;
    noBorder?: boolean;
    disabled?: boolean;
    error?: string;
}


const Question: React.FC<QuestionProps> = ({
    questionIndex, question,
    onChange, value, noBorder,
    disabled, error
}) => {
    const selectedOptValue = `${value?.label}_${value?.value}`;
    return (
        <StyledQuestionContainer>
            <StyledOptionsContainer>
                {question?.options?.map(opt => {
                    const optionValue = `${opt?.label}_${opt?.value}`;
                    return (
                        <StyledOptionContainer
                            key={opt?.value}
                            disabled={disabled}
                            selected={optionValue === selectedOptValue}
                            onClick={() => {
                                if (onChange) {
                                    onChange(opt)
                                }
                            }}
                        >
                            <StyledOptionText>
                                {opt?.label}
                            </StyledOptionText>
                        </StyledOptionContainer>
                    )
                })}
            </StyledOptionsContainer>
            {error && <StyledError variant='body2'>{error}</StyledError>}
            {/* {!noBorder && <StyledQuestionBorder />} */}
        </StyledQuestionContainer>
    )
}

export default Question