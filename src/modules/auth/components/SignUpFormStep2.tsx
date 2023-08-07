import React, { createRef } from 'react';
import { Row } from '~/app/components/Row';
import { useNavigation } from '@react-navigation/native';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '~/app/components/Form/Form';
import { PublicNavigation } from '~/app/navigations/public/types';
import {
  FormFieldTypeStep2,
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
import { SerializedApiError } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';
import { FeedbackModal } from '~/app/components/FeedbackModal';
import { useFeedbackModal } from '~/modules/auth/hooks/useFeedbackModal';
import { useHeaderHeight } from '@react-navigation/elements';
import { signUpStepValues } from '~/modules/auth/state/atoms/signUpStepValues';
import { useAtomValue, useSetAtom } from 'jotai';
import { ICreateUserRequest } from '~/modules/auth/types/api/user';

export const SignUpFormStep2 = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation<PublicNavigation>();
  const { mutate, isLoading, error } = useMutation(userApi.createUser);
  const { isVisible, setIsVisible, closeModal } = useFeedbackModal();
  const signUpFormValues = useAtomValue(signUpStepValues) as ICreateUserRequest;
  const setSignUpFormValues = useSetAtom(signUpStepValues);
  const errorMessage = (error as SerializedApiError)?.resolvedErrorMessage;
  const submitButtonRef = createRef<TouchableOpacity>();
  const { initialValues, step2 } = useSignUpFormInputs({
    handleSubmit: triggerSubmit,
  });
  const formData = useForm<FormFieldTypeStep2>({
    resolver: yupResolver(step2.schema),
    defaultValues: signUpFormValues,
  });

  function triggerSubmit() {
    if (!error && !isLoading) mutate(signUpFormValues);
  }

  const onSubmitSuccess: SubmitHandler<FormFieldTypeStep2> = () => {
    mutate(signUpFormValues, {
      onSettled() {
        setIsVisible(true);
      },
    });
  };

  const onSubmitFailure: SubmitErrorHandler<FormFieldTypeStep2> = () => {};

  const onModalClose = () => {
    closeModal();
    setSignUpFormValues(initialValues);
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <FeedbackModal
        onClose={onModalClose}
        visible={isVisible}
        isSingleAction
        confirmText="Fechar"
        email={{
          template: 'SIGNUP',
          value: formData.getValues()?.email,
        }}
        message={errorMessage}
      />
      <Form formData={formData} inputs={step2.inputs} rowsSpacing={8} />
      <View>
        <Row my={16}>
          <Button
            ref={submitButtonRef}
            fullWidth
            isLoading={isLoading}
            onPress={formData.handleSubmit(onSubmitSuccess, onSubmitFailure)}>
            Criar conta
          </Button>
        </Row>
        <Row>
          <Button fullWidth variant="text" onPress={navigation.goBack}>
            Voltar
          </Button>
        </Row>
      </View>
    </KeyboardAvoidingView>
  );
};
