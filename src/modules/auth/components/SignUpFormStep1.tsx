import React, { createRef } from 'react';
import { Row } from '~/app/components/Row';
import { useNavigation } from '@react-navigation/native';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '~/app/components/Form/Form';
import { PublicNavigation } from '~/app/navigations/public/types';
import {
  FormFieldType,
  useSignUpFormInputs,
} from '~/modules/auth/hooks/useSignUpFormInputs';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '~/app/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '~/modules/auth/services/api/userApi';
import { useHeaderHeight } from '@react-navigation/elements';
import { useAtomValue } from 'jotai';
import { signUpStepValues } from '~/modules/auth/state/atoms/signUpStepValues';
import { ICreateUserRequest } from '~/modules/auth/types/api/user';

export const SignUpFormStep1 = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<PublicNavigation>();
  const { mutate, isLoading, error } = useMutation(userApi.createUser);
  const submitButtonRef = createRef<TouchableOpacity>();
  const signUpFormValues = useAtomValue(signUpStepValues) as ICreateUserRequest;
  const { step1 } = useSignUpFormInputs({
    handleSubmit: triggerSubmit,
  });
  const formData = useForm<FormFieldType>({
    resolver: yupResolver(step1.schema),
    defaultValues: signUpFormValues,
  });

  function triggerSubmit() {
    if (!error && !isLoading) mutate(formData.getValues());
  }

  const onSubmitSuccess: SubmitHandler<FormFieldType> = () => {
    navigation.navigate('SignUpStep2');
  };

  const onSubmitFailure: SubmitErrorHandler<FormFieldType> = () => {};

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <View>
        <Form formData={formData} inputs={step1.inputs} rowsSpacing={8} />
        <View>
          <Row my={16}>
            <Button
              ref={submitButtonRef}
              fullWidth
              isLoading={isLoading}
              onPress={formData.handleSubmit(onSubmitSuccess, onSubmitFailure)}>
              Continuar
            </Button>
          </Row>
          <Row>
            <Button
              fullWidth
              variant="text"
              onPress={() => navigation.navigate('Login')}>
              Voltar
            </Button>
          </Row>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
