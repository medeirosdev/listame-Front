import React, { FC, PropsWithChildren, useMemo } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

export interface IAppModalProps extends PropsWithChildren {
  visible?: boolean;
  onClose: () => void;
}

export const AppModal: FC<IAppModalProps> = (props) => {
  const { visible = false, onClose, children } = props;
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        modalView: {
          marginHorizontal: 20,
          backgroundColor: theme.colors.neutral.white,
          borderRadius: theme.radii.xs,
          padding: 24,
          alignItems: 'center',
          shadowColor: theme.colors.neutral.black,
          ...theme.shadows.dp12,
          elevation: theme.elevations.dp12,
        },
      }),
    [theme],
  );

  return (
    <CenteredView>
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => {
          onClose();
        }}>
        <ContentContainer>
          <View style={styles.modalView}>{children}</View>
        </ContentContainer>
      </Modal>
    </CenteredView>
  );
};

const CenteredView = styled.View.attrs({
  justifyContent: 'center',
  alignItems: 'center',
})`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled(CenteredView)`
  background-color: ${({ theme: { colors } }) => colors.neutral.overlay};
`;
