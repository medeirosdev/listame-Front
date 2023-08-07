import React, {
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IInputProps } from './types';
import * as Anathomy from './anathomy';
import {
  NativeSyntheticEvent,
  Platform,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import RNPickerSelect from 'react-native-picker-select';
import { InputTypes } from '~/app/components/Form/types';
import { useDateRange } from '~/modules/home/hooks/useDateRange';
import { Masks, useMaskedInputProps } from 'react-native-mask-input';

export const Input: FC<IInputProps> = forwardRef((props, ref) => {
  const theme = useTheme();
  const {
    variant = 'default',
    helperText,
    label,
    placeholder,
    iconName,
    onBlur,
    onFocus,
    error,
    onIconPress,
    type = 'text',
    options,
    onSelectedOption,
    dateRangeType,
    dateAtom,
    mask,
    ...rest
  } = props;
  const { setBottomSheetOpenType } = useDateRange({
    dateAtom,
  });

  const maskedInputProps = useMaskedInputProps({
    value: rest.value ?? '',
    onChangeText: rest.onChangeText,
    mask,
  });
  const [isFocused, setIsFocused] = useState(false);
  const hasIcon = useMemo(
    () => Boolean(getIconNameByInputType() || iconName || error),
    [iconName, error],
  );
  const hasError = useMemo(() => Boolean(error), [error]);
  const maskProps = useMemo(
    () => (mask?.length ? maskedInputProps : {}),
    [mask, maskedInputProps],
  );

  const onInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const onInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  function getIconNameByInputType(): string {
    const names = new Map<InputTypes, string>();
    names.set('select', 'arrow_drop_down');
    names.set('text', iconName ?? '');
    names.set('textarea', iconName ?? '');
    names.set('date', 'calendar_month');
    names.set('time', 'schedule');

    return names.get(type) ?? '';
  }

  const onStartDatePress = () =>
    setBottomSheetOpenType((prev) => (prev === 'start' ? null : 'start'));

  const onEndDatePress = () =>
    setBottomSheetOpenType((prev) => (prev === 'end' ? null : 'end'));

  const onPress = useCallback(() => {
    if (type === 'date') {
      return dateRangeType === 'start' ? onStartDatePress() : onEndDatePress();
    }

    return () => {};
  }, [type, dateRangeType]);

  return (
    <Wrapper disabled={type !== 'date' && type !== 'time'} onPress={onPress}>
      <Anathomy.InputContainer
        variant={variant}
        isFocused={isFocused}
        isTextarea={type === 'textarea'}
        hasError={hasError}>
        <Anathomy.Label
          variant={variant}
          isFocused={isFocused}
          hasError={hasError}>
          {label}
        </Anathomy.Label>
        {type === 'select' ? (
          <RNPickerSelect
            style={{
              viewContainer: {
                marginLeft: Platform.OS === 'android' ? 0 : 16,
                marginBottom:  Platform.OS === 'android' ? 0:  6,
              },
              inputAndroid: {
                color: theme.colors.gray[600],
              },
              inputIOS: {
                color: theme.colors.gray[600],
              },
              placeholder: {
                color: theme.colors.gray[600],
              },
            }}
            placeholder={{
              label: placeholder,
              value: null,
              color: theme.colors.gray[600],
            }}
            onValueChange={(value, index) =>
              onSelectedOption?.({
                label:
                  index === 0
                    ? placeholder ?? ''
                    : options?.[index - 1]?.label ?? '',
                value,
              })
            }
            items={options ?? []}
          />
        ) : (
          <Anathomy.BaseTextInput
            ref={ref}
            variant={variant}
            hasIcon={hasIcon}
            placeholder={placeholder}
            onBlur={onInputBlur}
            onFocus={onInputFocus}
            multiline={type === 'textarea'}
            numberOfLines={type === 'textarea' ? 4 : 1}
            pointerEvents={type === 'date' ? 'none' : 'auto'}
            editable={type !== 'date'}
            {...(rest as TextInputProps)}
            keyboardType={type === 'time' ? 'number-pad' : rest.keyboardType}
            {...maskProps}
          />
        )}

        {hasIcon && (
          <Anathomy.IconContainer>
            <Anathomy.InputIcon
              variant={variant}
              name={String(hasError ? 'error' : getIconNameByInputType() || '')}
              size={20}
              hasError={hasError}
              onPress={onIconPress}
            />
          </Anathomy.IconContainer>
        )}
      </Anathomy.InputContainer>
      {Boolean(error ?? helperText) && (
        <Anathomy.HelperText
          numberOfLines={1}
          hasError={hasError}
          variant={variant}>
          {error ?? helperText}
        </Anathomy.HelperText>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.TouchableOpacity`
  width: 100%;
`;
