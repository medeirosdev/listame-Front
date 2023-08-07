import React, { createRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '~/app/components/Form/Form';
import { PublicNavigation } from '~/app/navigations/public/types';
import { FormFieldType } from '~/modules/profile/hooks/useEditProfileFormInputs';
import { TouchableOpacity } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { SerializedApiError } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';
import { FeedbackModal } from '~/app/components/FeedbackModal';
import { useFeedbackModal } from '~/modules/auth/hooks/useFeedbackModal';
import styled from 'styled-components/native';
import { Row } from '~/app/components/Row';
import { Button } from '~/app/components/Button';
import { useAppDispatch } from '~/app/hooks/useAppDispatch';
import { loadUserProfilesThunk } from '~/modules/auth/state/thunks/userThunks';
import { AnyObjectSchema } from 'yup';
import { IFormInputProps } from '~/app/components/Form/types';
import {
  profilesApi,
  UserProfilesApiUpdateParams,
} from '~/modules/auth/services/api/profilesApi';

interface IEditProfileForm {
  inputs: IFormInputProps[];
  schema: AnyObjectSchema;
}

export const EditProfileForm = (props: IEditProfileForm) => {
  const { inputs, schema } = props;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<PublicNavigation>();
  const { mutate, isLoading, error } = useMutation(profilesApi.update, {
    onSuccess: reloadUserProfiles,
  });
  const { isVisible, setIsVisible, closeModal } = useFeedbackModal();
  const errorMessage = (error as SerializedApiError)?.resolvedErrorMessage;
  const submitButtonRef = createRef<TouchableOpacity>();

  const formData = useForm<FormFieldType>({
    resolver: yupResolver(schema),
  });

  async function reloadUserProfiles() {
    await dispatch(loadUserProfilesThunk());
  }

  const onSubmitSuccess: SubmitHandler<FormFieldType> = (fields) => {
    const payload: UserProfilesApiUpdateParams = {};

    if (fields.name) {
      payload.name = fields.name;
    }

    if (fields.currentPassword) {
      payload.old_password = fields.currentPassword;
    }

    if (fields.newPassword) {
      payload.password = fields.newPassword;
    }

    mutate(payload, {
      onSettled() {
        setIsVisible(true);
      },
    });
  };

  const onSubmitFailure: SubmitErrorHandler<FormFieldType> = () => {};

  return (
    <EditProfileFormContainer>
      <FeedbackModal
        onClose={closeModal}
        visible={isVisible}
        isSingleAction
        confirmText="Fechar"
        message={errorMessage || 'Perfil alterado com sucesso!'}
      />
      <Form inputs={inputs} formData={formData} />
      <ForgotPasswordFormFooter>
        <Row mt={16} justifyContent="space-between">
          <FooterButtonWrapper>
            <Button
              fullWidth
              variant="outlined"
              onPress={() => navigation.goBack()}>
              Cancelar
            </Button>
          </FooterButtonWrapper>
          <FooterButtonWrapper>
            <Button
              ref={submitButtonRef}
              fullWidth
              variant="primary"
              isLoading={isLoading}
              onPress={formData.handleSubmit(onSubmitSuccess, onSubmitFailure)}>
              Salvar
            </Button>
          </FooterButtonWrapper>
        </Row>
      </ForgotPasswordFormFooter>
    </EditProfileFormContainer>
  );
};

const ForgotPasswordFormFooter = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const FooterButtonWrapper = styled(Row)`
  flex: 0.48;
`;

const EditProfileFormContainer = styled.View`
  flex: 1;
`;
