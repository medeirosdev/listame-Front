import React, { FC, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import styled, { useTheme } from 'styled-components/native';
import { Typography } from '~/app/components/Typography';
import { Row } from '~/app/components/Row';
import { Icon } from '~/app/components/Icon';
import { SelectOption } from '~/app/components/Form/types';

interface IAppointmentNotificationBottomSheetProps {
  onClose?: (...args: unknown[]) => void;
  options: SelectOption[];
  onSelect: (option: SelectOption) => void;
}

export const AppointmentNotificationBottomSheet: FC<
  IAppointmentNotificationBottomSheetProps
> = ({ onClose, options = [], onSelect }) => {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [350, 400, 0], []);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        padding: 24,
        height: '100%',
        backgroundColor: theme.colors.neutral.white
      },
    });
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      borderRadius={theme.radii.xxl}
      renderContent={() => {
      return <ContentContainerView
        style={styles.container}
        contentContainerStyle={{
          paddingVertical: 16,
          display: 'flex',
          alignItems: 'center',
        }}>
        {options?.length ? (
          options?.map((option) => (
            <OptionButton
              key={String(option?.value)}
              onPress={() => onSelect(option)}>
              <Option my={4}>
                <OptionText>{option?.label}</OptionText>
              </Option>
            </OptionButton>
          ))
        ) : (
          <OptionText>Nenhum opção disponível...</OptionText>
        )}
      </ContentContainerView>
      }}
      renderHeader={() => <CloseIcon onPress={onClose} />}
      />
  );
};

const ContentContainerView = styled.ScrollView`
`;

const Option = styled(Row)`
  padding: 16px;
  align-items: center;
`;

const OptionText = styled(Typography).attrs({
  fontGroup: 'bodyRegular',
})`
  margin-left: 12px;
`;

const OptionButton = styled.TouchableHighlight.attrs(({ theme }) => ({
  activeOpacity: 0.8,
  underlayColor: theme.colors.primary.blue[50],
}))`
  border-radius: 8px;
`;

const CloseIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'add',
  size: 24,
  color: theme.colors.task.red,
}))`
  align-self: flex-end;
  position: absolute;
  transform: rotate(45deg);
`;
