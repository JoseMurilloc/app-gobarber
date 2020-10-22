import { useField } from '@unform/core';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus() : void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> =
  ({ name, icon, ...rest }, ref) => {

  const inputElementRef = useRef<any>(null);
  const { error, fieldName,  registerField, defaultValue = '' } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if (inputValueRef.current.value) {
      setIsFilled(true)
    } else {
      setIsFilled(false);
    }

  }, []);


  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    }
  }))

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = String(value);
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear();
      }
    })
  }, [fieldName, registerField])

  return (
  <Container isFocused={isFocused} isErrored={!!error}>
      <Icon name={icon} color={isFocused || isFilled ? '#FF9000': '#666360'} size={20} />
      <TextInput
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputElementRef}
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={(value) => inputValueRef.current.value = value}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
