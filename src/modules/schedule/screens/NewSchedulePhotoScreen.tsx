import React, { FC } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Avatar } from '~/app/components/Avatar';
import { AvatarHeaderLayout } from '~/app/components/AvatarHeaderLayout';
import { Button } from '~/app/components/Button';
import { Row } from '~/app/components/Row';
import { TouchableSection } from '~/app/components/TouchableSection';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';
import { PrivateBridgeNavigationScreenPropsGeneric } from '~/app/navigations/private/PrivateNavigatorBridge/types';
import { ListEmptyState } from '~/modules/home/components/ListEmptyState';
import { agendasApi } from '~/modules/home/services/api/agendasApi';
import { useAvatarUpload } from '~/modules/profile/hooks/useAvatarUpload';
import { useHeaderHeight } from '@react-navigation/elements';

export const NewSchedulePhotoScreen: FC<
  PrivateBridgeNavigationScreenPropsGeneric<'NewSchedulePhoto'>
> = ({ route: { params } }) => {
  const {
    choosePhotoOnGalery,
    takePhotoFromCamera,
    photo,
    isAvatarLoading,
    isDeleteLoading,
    deleteAvatar,
  } = useAvatarUpload({
    uploadAvatarRequest: agendasApi.uploadAvatar,
    deleteAvatarRequest: agendasApi.deleteAvatar,
    agendaId: params.id,
  });
  const navigation = usePrivateNavigation();
  const height = useHeaderHeight();

  return (
    <>
      {isAvatarLoading || isDeleteLoading ? (
        <ListEmptyState
          message="Carregando... "
          isLoading={isAvatarLoading || isDeleteLoading}
        />
      ) : (
        <AvatarHeaderLayout
          avatar={
            <Avatar
              variant="large"
              hasUpload
              onUploadButtonClick={choosePhotoOnGalery}
              url={photo}
              isLoading={isAvatarLoading}
            />
          }>
          <TouchableSection
            rowProps={{ my: 16 }}
            onPress={() => deleteAvatar()}>
            Remover foto atual
          </TouchableSection>
          <TouchableSection onPress={takePhotoFromCamera}>
            Fazer nova foto
          </TouchableSection>
          <TouchableSection rowProps={{ my: 16 }} onPress={choosePhotoOnGalery}>
            Escolher na Galeria
          </TouchableSection>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'height' : 'padding'}
            keyboardVerticalOffset={height + 24}
            style={{
              flex: 1,
            }}>
            <FormFooter>
              <Row mt={16} justifyContent="space-between">
                <FooterButtonWrapper>
                  <Button
                    variant="outlined"
                    fullWidth
                    onPress={() =>
                      navigation.canGoBack()
                        ? navigation.goBack()
                        : navigation.replace('Home')
                    }>
                    Voltar
                  </Button>
                </FooterButtonWrapper>
                <FooterButtonWrapper>
                  <Button
                    fullWidth
                    onPress={() =>
                      navigation.replace('ScheduleDetails', {
                        id: params.id,
                      })
                    }>
                    Concluir
                  </Button>
                </FooterButtonWrapper>
              </Row>
            </FormFooter>
          </KeyboardAvoidingView>
        </AvatarHeaderLayout>
      )}
    </>
  );
};

const FormFooter = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const FooterButtonWrapper = styled(Row)`
  flex: 0.48;
`;
