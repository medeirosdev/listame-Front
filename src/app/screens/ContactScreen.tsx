import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
import { Button } from '~/app/components/Button';
import { FeedbackModal } from '~/app/components/FeedbackModal';
import { Input } from '~/app/components/Input';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import { Row } from '~/app/components/Row';
import { Typography } from '~/app/components/Typography';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';
import { BodyText } from '~/app/screens/PrivacyPolicyScreen';
import { CONTACT_SENT_MESSAGE } from '~/app/utils/constants/feedbacks';
import { sleep } from '~/app/utils/sleep';
import { useFeedbackModal } from '~/modules/auth/hooks/useFeedbackModal';
import { useHeaderHeight } from '@react-navigation/elements';

export const ContactScreen = () => {
  const theme = useTheme();
  const height = useHeaderHeight();
  const navigation = usePrivateNavigation();
  const { isVisible, setIsVisible, closeModal } = useFeedbackModal();
  const [loading, setLoading] = useState(false);

  const sendContactMessage = async () => {
    setLoading(true);
    await sleep(1000);
    setLoading(false);
    setIsVisible(true);
  };

  return (
    <>
      <FeedbackModal
        onClose={closeModal}
        visible={isVisible}
        isSingleAction
        confirmText="Fechar"
        message={CONTACT_SENT_MESSAGE}
      />
      <LayoutContainer my={16}>
        <Typography fontGroup="h6Medium" color={theme.colors.gray[900]}>
          Dúvidas ou sugestões?
        </Typography>
        <Row my={8} />
        <BodyText>
          Você pode entrar em contato com a nossa equipe utilizando o campo
          abaixo.
        </BodyText>
        <Row my={8} />
        <BodyText>
          O tempo de resposta pode variar de 3 a 7 dias corridos, dependendo da
          fila de espera.
        </BodyText>
        <Row my={16} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={height + 24}
          style={{
            flex: 1,
          }}>
          <Input label="" type="textarea" placeholder="Digite aqui..." />
          <FormFooter>
            <Row mt={16} justifyContent="space-between">
              <FooterButtonWrapper>
                <Button
                  variant="outlined"
                  fullWidth
                  onPress={() =>
                    navigation.canGoBack()
                      ? navigation.goBack()
                      : navigation.navigate('Home')
                  }>
                  Cancelar
                </Button>
              </FooterButtonWrapper>
              <FooterButtonWrapper>
                <Button
                  isLoading={loading}
                  fullWidth
                  onPress={sendContactMessage}>
                  Enviar
                </Button>
              </FooterButtonWrapper>
            </Row>
          </FormFooter>
        </KeyboardAvoidingView>
      </LayoutContainer>
    </>
  );
};

const FormFooter = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-top: 16px;
`;

const FooterButtonWrapper = styled(Row)`
  flex: 0.48;
`;
