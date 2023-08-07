import React, { FC, useMemo } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
} from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { GradientContainerView } from '~/app/components/GradientContainerView';
import { Typography } from '~/app/components/Typography';
import { ThemeTypographyGroups } from '~/app/theme/typography';
import { getUserNames } from '~/app/utils/format/getUserNames';
import defaultAgendaAvatar from '~/app/assets/agenda-default.png';

type AvatarVariants = 'smallWhite' | 'smallBlue' | 'medium' | 'large';

export interface IAvatarProps {
  onPress?: TouchableWithoutFeedbackProps['onPress'];
  variant?: AvatarVariants;
  url: string | null;
  fallbackName?: string;
  hasUpload?: boolean;
  onUploadButtonClick?: (...args: unknown[]) => void;
  isLoading?: boolean;
}

export const Avatar: FC<IAvatarProps> = ({
  onPress,
  variant,
  url = '',
  fallbackName = '',
  hasUpload = false,
  isLoading,
  onUploadButtonClick,
}) => {
  const theme = useTheme();
  const hasAvatar = Boolean(url);

  const variantStyles = useMemo(() => {
    const defaultStyle = {
      height: 28,
      width: 28,
      maxWidth: 28,
      isGradient: false,
      bordered: true,
      fontGroup: 'captionBold',
      fontColor: theme.colors.brand,
      borderRadius: 999999,
      backgroundColor: theme.colors.neutral.white,
      borderWidth: 2,
      borderColor: theme.colors.neutral.white,
    };

    const styles = new Map<AvatarVariants, typeof defaultStyle>();
    styles.set('smallWhite', { ...defaultStyle, bordered: false });
    styles.set('medium', {
      width: 48,
      maxWidth: 48,
      height: 48,
      isGradient: true,
      bordered: false,
      fontGroup: 'bodyMedium',
      fontColor: theme.colors.neutral.white,
      borderRadius: 999999,
      backgroundColor: '',
      borderWidth: 2,
      borderColor: theme.colors.brand,
    });
    styles.set('large', {
      width: 112,
      maxWidth: 112,
      height: 112,
      isGradient: true,
      bordered: true,
      fontGroup: 'h4Medium' as ThemeTypographyGroups,
      fontColor: theme.colors.neutral.white,
      borderRadius: 999999,
      backgroundColor: '',
      borderWidth: 8,
      borderColor: theme.colors.neutral.white,
    });

    if (!variant) return defaultStyle;

    return styles.get(variant) ?? defaultStyle;
  }, [variant]);

  const { isGradient, bordered, fontGroup, fontColor, borderWidth, ...styles } =
    variantStyles;

  const Container = isGradient ? GradientContainerView : AvatarContainer;

  return (
    <Container
      bordered={bordered || hasAvatar}
      style={[
        styles,
        { borderWidth: bordered || hasAvatar ? borderWidth : 0 },
      ]}>
      <TouchableWithoutFeedback
        onPress={hasUpload ? onUploadButtonClick : onPress}>
        {isLoading ? (
          <LoadingContainer>
            <ActivityIndicator />
          </LoadingContainer>
        ) : hasAvatar ? (
          <Image
            source={{
              uri: url || '',
              width:
                Platform.OS === 'android' && variant === 'large'
                  ? 100
                  : styles.width,
              height:
                Platform.OS === 'android' && variant === 'large'
                  ? 100
                  : styles.height,
            }}
            borderRadius={50}
          />
        ) : (
          <AvatarUserName
            color={fontColor}
            fontGroup={fontGroup as ThemeTypographyGroups}>
            {getUserNames(fallbackName, true)}
          </AvatarUserName>
        )}
      </TouchableWithoutFeedback>
      {hasUpload && (
        <AvatarChangeContainer
          isLoading={isLoading}
          onPress={hasUpload && !isLoading ? onUploadButtonClick : onPress}>
          <AvatarChangeText>Alterar</AvatarChangeText>
        </AvatarChangeContainer>
      )}
    </Container>
  );
};

export const AvatarContainer = styled(View)<{
  bordered: boolean;
}>`
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const AvatarUserName = styled(Typography)<{ color?: string }>`
  color: ${({ color, theme: { colors } }) => color ?? colors.neutral.white};
`;

export const AvatarChangeContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<{ isLoading?: boolean }>`
  width: 100%;
  height: 30%;
  position: absolute;
  bottom: 0px;
  opacity: 0.8;
  pointer-events: none;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

export const AvatarChangeText = styled(Typography).attrs({
  fontGroup: 'captionRegular',
})<{ color?: string }>`
  color: ${({ color, theme: { colors } }) => color ?? colors.neutral.white};
  pointer-events: none;
  text-align: center;
`;

export const LoadingContainer = styled.View`
  background-color: ${({ theme: { colors } }) => colors.primary.blue[100]};
  border-radius: 9999999px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
