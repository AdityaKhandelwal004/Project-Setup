import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Autocomplete } from '@mui/material';
import type { ChipProps, TextFieldProps } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { StyledError, StyledInputContainer } from '../textInput/styles.tsx';
import type { Option } from '@mono/models/src/baseEntities.tsx';
import TextInput from '../textInput/index.tsx';
import messages from '../messages/index.tsx';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  StyledChipCloseContainer,
  StyledChipContainer,
  StyledChipLabel,
  StyledCanceledIcon,

  StyledCustomOption,
  StyledAmout,
  StyledPopperBase,
  StyledRegularOption,
  StyledOptionLabel,
  SyledOptionWrapper,
} from './styles.tsx';
import { brand, fontSize, fontWeight } from '@mono/theme';

// Default dropdown arrow icon
const DefaultDropdownIcon = React.createElement(KeyboardArrowDownOutlinedIcon);

interface Props {
  options: Option[];
  disabledOptions?: Option[];
  value?: Option | Option[];
  onChange?: any;
  error?: string;
  disableErrorMode?: boolean;
  enableClearable?: boolean;
  multiple?: boolean;
  searchOptions?: (value?: string) => void;
  isHeader?: boolean;
  disableUnderline?: boolean;
  isCreatable?: boolean;
  searchOnly?: boolean;
  popupIcon?: React.ReactNode;
  renderCustomOptions?: boolean;
  minWidth?: string;
}

// Extend Option to include a flag for dynamically created options
interface ExtendedOption extends Option {
  isNew?: boolean;
}

const StyledAutocompletePopper = (props: any & { renderCustomOptions?: boolean }) => {
  const { renderCustomOptions, ...other } = props;
  return <StyledPopperBase {...other} renderCustomOptions={renderCustomOptions} />;
};

const filter = createFilterOptions<ExtendedOption>();

const MultiSelectChip: React.FC<ChipProps> = ({ label, onDelete }) => (
  <StyledChipContainer>
    <StyledChipLabel title={typeof label === 'string' ? label : undefined}>
      {label}
    </StyledChipLabel>
    <StyledChipCloseContainer onClick={onDelete}>
      <StyledCanceledIcon />
    </StyledChipCloseContainer>
  </StyledChipContainer>
);



const MaterialAutocompleteInput: React.FC<Props & TextFieldProps> = ({
  value,
  onChange,
  error,
  disableErrorMode,
  options,
  enableClearable,
  multiple,
  disabledOptions,
  searchOptions,
  isHeader,
  disableUnderline,
  isCreatable,
  searchOnly,
  popupIcon,
  renderCustomOptions=false,
  minWidth,
  
  ...props
}) => {
  const autoCompleteRef = useRef(null);
  const [tagLimit, setTagLimit] = useState(2);
  const [newOptions, setNewOptions] = useState<Option[]>([]);
  const [createdOptions, setCreatedOptions] = useState<Option[]>([]); // Track newly created options

  useEffect(() => {
    setNewOptions((prev) => {
      let updatedOptions = [...(options || [])];

      if (multiple && Array.isArray(value)) {
        updatedOptions = updatedOptions.filter(
          (opt) => !value.some((v) => v?.id?.toString() === opt?.id?.toString())
        );
      }

      const valueArray = Array.isArray(value) ? value : value ? [value] : [];
      const missingValues = valueArray.filter(
        (val) => !updatedOptions.some((opt) => opt?.id?.toString() === val?.id?.toString())
      );

      let finalOptions = [...updatedOptions, ...missingValues];

      createdOptions.forEach((createdOpt) => {
        const existingIndex = finalOptions.findIndex((opt: any) => opt?.isNew);

        if (existingIndex !== -1) {
          finalOptions[existingIndex] = createdOpt; 
        } else {
          finalOptions.push(createdOpt);
        }
      });

      if (JSON.stringify(prev) === JSON.stringify(finalOptions)) {
        return prev;
      }

      return finalOptions;
    });
  }, [options, createdOptions, value, isCreatable]);

  useLayoutEffect(() => {
    if (autoCompleteRef?.current?.clientWidth) {
      setTagLimit(Math.ceil(autoCompleteRef?.current?.clientWidth / 172));
    }
  }, [autoCompleteRef]);
  const [isSelectingOption, setIsSelectingOption] = useState(false);
  const handleOnChange = (event: any, newValue: any) => {
    const sanitizedValue = Array.isArray(newValue)
      ? newValue.map((option) =>
        option.isNew ? { id: option.id, label: option.id, isNew: true } : option
      )
      : newValue?.isNew
        ? { id: newValue.id, label: newValue.id, isNew: true }
        : newValue;

    if (onChange) {
      onChange(sanitizedValue);
    }
    if (Array.isArray(sanitizedValue)) {
      const newlyCreated = sanitizedValue.filter(
        (opt) => opt.isNew && !options.some((existingOpt) => existingOpt.id === opt.id)
      );
      if (newlyCreated.length > 0) {
        setCreatedOptions((prev) => [...prev, ...newlyCreated]);
      }
    } else if (sanitizedValue?.isNew) {
      const existsInOptions = options.some((opt) => opt.id === sanitizedValue.id);
      if (!existsInOptions) {
        setCreatedOptions((prev) => [...prev, sanitizedValue]);
      }
    }
  };

  const handleBlur = () => {
    if (!inputValue.trim()) return;

    const existingOption = newOptions.find(
      (option) => option?.label?.toLowerCase() === inputValue?.toLowerCase()
    );

    let updatedValue;
    if (existingOption) {
      updatedValue = multiple
        ? [...(Array.isArray(value) ? value : []), existingOption]
        : existingOption;
    } else if (isCreatable) {
      const newOption: ExtendedOption = { id: inputValue, label: inputValue, isNew: true };
      setCreatedOptions((prev) => [...prev, newOption]);
      updatedValue = multiple
        ? [...(Array.isArray(value) ? value : []), newOption]
        : newOption;
    }

    if (updatedValue) {
      onChange(updatedValue);
    }

    setIsSelectingOption(false);
  };

  const handleFilterOptions = (options: any[], params: any) => {
    const { inputValue } = params;

    if (!isCreatable) {
      // If not creatable, just filter existing options
      return options.filter((option) =>
        option?.label?.toLowerCase?.()?.includes(inputValue.toLowerCase())
      );
    }


    // If creatable, allow adding new values if not existing
    const filtered = filter(options, params);
    const isExisting = options.some((option) => option.label === inputValue);

    if (inputValue && !isExisting && !searchOnly) {
      filtered.push({ id: inputValue, label: `Add "${inputValue}"`, isNew: true });
    }

    return filtered;
  };

  const processedOptions = React.useMemo(() => {
  if (renderCustomOptions) {
    // Return your specially styled or structured options
    return options.map(opt => ({
      ...opt,
      label: <span style={{ color: 'green', fontWeight: 'bold' }}>{opt.label}</span>
      // or provide any custom properties your custom renderer would use
    }));
  }
  return options;
}, [options, renderCustomOptions]);

  useEffect(() => {
    const isCleared =
      value === null ||
      (Array.isArray(value) && value.length === 0);

    if (!isCleared) return;

    // setCreatedOptions((prev) =>
    //   prev.filter((co) => options.some((o) => String(o.id) === String(co.id)))
    // );
    setInputValue('');
  }, [value, options]);

  const [inputValue, setInputValue] = useState<string>('');


  return (
    <StyledInputContainer isHeader={isHeader} minWidth={minWidth}>
      <Autocomplete
        ref={autoCompleteRef}
       PopperComponent={(props) =>
          <StyledAutocompletePopper {...props} renderCustomOptions={renderCustomOptions} />
        }
        options={newOptions}
        popupIcon={<KeyboardArrowDownIcon />}
        renderOption={(props, option) => {
          if (renderCustomOptions) {
            return (
              <StyledCustomOption {...props}>
                <SyledOptionWrapper>
                  <StyledOptionLabel style={{color: brand.white}}>{option?.label}</StyledOptionLabel>
                  {option?.amount && (
                    <StyledAmout style={{ fontSize: fontSize.h4, fontWeight: fontWeight.bold }}>
                      {option.amount}
                    </StyledAmout>
                  )}
                </SyledOptionWrapper>
              </StyledCustomOption>
            );
          }
          return <StyledRegularOption {...props}>{option?.label}</StyledRegularOption>;
        }}
        limitTags={tagLimit}
        disableClearable={isCreatable ? false : !enableClearable}
        disableCloseOnSelect={multiple}
        multiple={multiple}
        noOptionsText={messages?.general?.noOptionsText}
        inputValue={inputValue}
        onInputChange={(event, value) => {
          const sanitizedValue = value.replace(/^\s+/, '');
          setInputValue(sanitizedValue);
          if (searchOptions) {
            searchOptions(sanitizedValue);
          }
        }}
        onBlur={handleBlur}
        value={value || (multiple ? [] : null)}
        onChange={handleOnChange}
        filterOptions={handleFilterOptions}
        getOptionDisabled={(option: Option) => disabledOptions?.some(
          (opt) => opt?.id?.toString() === option?.id?.toString(),
        )}
        isOptionEqualToValue={(option: Option, value: Option) => option?.id?.toString() === value?.id?.toString()}
        popupIcon={popupIcon || DefaultDropdownIcon}
        slotProps={{
          popupIndicator: {
            title: '',
          },
          clearIndicator: {
            title: '',
          },
        }}
        renderInput={(params: any) => (
          <TextInput
            {...props}
            {...params}
            error={disableErrorMode ? undefined : !!error}
            isHeader={isHeader}
            minWidth={minWidth}
            inputProps={{
              ...params.inputProps,
              disableUnderline: { disableUnderline },
              readOnly: isCreatable ? false : true,
            }}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option: Option, index) => (
            <MultiSelectChip
              key={option.id}
              label={option.label}
              {...getTagProps({ index })}
            />
          ))
        }
        freeSolo={isCreatable}
      />

      {!disableErrorMode && error && (
        <StyledError variant="body2">{error}</StyledError>
      )}
    </StyledInputContainer>
  );
};

export default MaterialAutocompleteInput;
