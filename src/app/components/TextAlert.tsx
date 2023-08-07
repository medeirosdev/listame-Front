import React, { FC, useMemo } from 'react';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
import { Icon } from '~/app/components/Icon';
import { Typography } from '~/app/components/Typography';

export type ITextAlertTypes = 'info' | 'success' | 'warning' | 'error';

export interface ITextAlertProps {
  message: string;
  type: ITextAlertTypes;
  icon?: string;
  onPress?: () => void;
}

export const TextAlert: FC<ITextAlertProps> = (props) => {
  const { message, type = 'info' } = props;
  const theme = useTheme();

  const styles = useMemo(() => {
    const defaultStyle = {
      textColor: theme.colors.neutral.white,
      iconColor: theme.colors.neutral.white,
      bgColor: theme.colors.task.blue,
      iconName: 'docs',
    };

    const typeStypes = new Map<ITextAlertTypes, typeof defaultStyle>();
    typeStypes.set('info', defaultStyle);
    typeStypes.set('warning', {
      textColor: theme.colors.neutral.white,
      iconColor: theme.colors.neutral.white,
      bgColor: theme.colors.task.orange,
      iconName: 'help',
    });
    typeStypes.set('success', {
      textColor: theme.colors.neutral.white,
      iconColor: theme.colors.neutral.white,
      bgColor: theme.colors.task.green,
      iconName: 'check',
    });
    typeStypes.set('error', {
      textColor: theme.colors.neutral.white,
      iconColor: theme.colors.triadic[100],
      bgColor: theme.colors.task.red,
      iconName: 'error',
    });

    return typeStypes.get(type) || defaultStyle;
  }, [type]);

  return (
    <TextAlertContainer bg={styles.bgColor} onPress={props?.onPress}>
      <Typography color={styles.textColor}>{message}</Typography>
      <Icon
        name={props.icon ?? styles.iconName}
        size={20}
        color={styles.iconColor}
      />
    </TextAlertContainer>
  );
};

const TextAlertContainer = styled.TouchableOpacity<{ bg: string }>`
  width: 100%;
  flex-direction: row;
  background-color: ${(props) => props.bg};
  padding: 10px;
  border-radius: ${({ theme: { radii } }) => radii.xs}px;
  justify-content: space-between;
  align-items: center;
  max-height: 44px;
`;
