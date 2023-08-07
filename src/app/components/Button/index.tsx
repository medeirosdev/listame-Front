import React, { FC, forwardRef, useMemo } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { ButtonProps } from './types/button-props.interface';
import * as Anathomy from './anathomy';
import { Row } from '~/app/components/Row';

export const Button: FC<ButtonProps> = forwardRef((props, ref) => {
  const {
    children,
    onPress,
    variant,
    disabled,
    isLoading,
    icon,
    iconSize,
    labelColor,
    fullWidth,
    iconOrientation = 'right',
    loadingText,
    borderRadius,
    ...rest
  } = props;
  const theme = useTheme();

  const styles = useMemo(() => {
    const defaultStyle = {
      bg: theme.colors.primary.blue['700'],
      label: labelColor ?? theme.colors.neutral.white,
      borderColor: '',
      borderRadius: '',
    };

    const variantStyles = new Map<
      ButtonProps['variant'],
      typeof defaultStyle
    >();

    variantStyles.set('outlined', {
      bg: 'transparent',
      label: labelColor ?? theme.colors.primary.blue[700],
      borderColor: theme.colors.primary.blue[700],
      borderRadius: '',
    });

    variantStyles.set('text', {
      bg: 'transparent',
      label: labelColor ?? theme.colors.primary.blue[700],
      borderColor: '',
      borderRadius: '',
    });

    variantStyles.set('whiteFilled', {
      bg: theme.colors.neutral.white,
      label: labelColor ?? theme.colors.primary.blue[700],
      borderRadius: '',
      borderColor: '',
    });

    variantStyles.set('whiteFilledBordered', {
      bg: theme.colors.neutral.white,
      label: labelColor ?? theme.colors.primary.blue[700],
      borderRadius: `${theme.radii.xxl}px`,
      borderColor: labelColor ?? theme.colors.primary.blue[700],
    });

    variantStyles.set('whiteOutlined', {
      bg: 'transparent',
      label: labelColor ?? theme.colors.neutral.white,
      borderColor: theme.colors.neutral.white,
      borderRadius: '',
    });

    variantStyles.set('social', {
      bg: theme.colors.neutral.white,
      label: labelColor ?? theme.colors.primary.blue[700],
      borderColor: '',
      borderRadius: `${theme.radii.xs}px`,
    });

    return variantStyles.get(variant) || defaultStyle;
  }, [variant]);

  const hasIcon = !isLoading && Boolean(icon);

  return (
    <Anathomy.ButtonContainer
      isLoading={isLoading}
      iconOrientation={iconOrientation}
      bg={styles.bg}
      borderColor={styles.borderColor}
      borderRadius={borderRadius ?? styles.borderRadius}
      fullWidth={fullWidth}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.6}
      ref={ref}
      hasIconAndText={hasIcon && (Boolean(loadingText) || Boolean(children))}
      {...rest}>
      {isLoading ? (
        <Row>
          <Anathomy.Spinner size={RFValue(16)} color={styles.label} />
          {loadingText && (
            <Anathomy.BaseLabel color={styles.label}>
              {loadingText}
            </Anathomy.BaseLabel>
          )}
        </Row>
      ) : (
        <>
          <Anathomy.BaseLabel color={styles.label}>
            {children}
          </Anathomy.BaseLabel>
          {hasIcon &&
            (typeof icon !== 'string' && React.isValidElement(icon) ? (
              icon
            ) : (
              <Anathomy.BaseIcon
                orientation={iconOrientation}
                name={icon as string}
                size={iconSize}
                color={styles.label}
              />
            ))}
        </>
      )}
    </Anathomy.ButtonContainer>
  );
});
