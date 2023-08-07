// reference: https://github.com/JosephCon1998/RNReanimatedV2FAB
import React, { useMemo } from 'react';

import { DeviceEventEmitter, StyleSheet, Text, View } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components';
import { Icon } from '~/app/components/Icon';
import { Shadow } from '~/app/components/Shadow';

import {
  FAB_BACKGROUND_COLOR,
  SUBBTN_BACKGROUND_COLOR,
  SUBBTN_BORDER_RADIUS,
  SUBBTN_HEIGHT,
  SUBBTN_TAP_EVENT,
  SUBBTN_WIDTH,
} from './constants';

interface IFloatingActionButtonItemProps {
  label?: string | React.ReactElement;
  icon?: string;
  onPress?: (...args: unknown[]) => any;
}

export const FloatingActionButtonItem: React.FC<
  IFloatingActionButtonItemProps
> = (props) => {
  /**
   * Destructure our label and our onPress callback
   */
  const { label, onPress, icon } = props;

  /**
   * The shared value of the button opacity. We change
   * the opacity when the button is being held down.
   */
  const buttonOpacity = useSharedValue(1);

  /**
   * The tap gesture handler for the button.
   *
   * We change the opacity to represent the button being
   * pressed. If the button does get pressed, we emit the SubButton tap event to
   * trigger the FAB children container to close; if the press is interrupted,
   * we change the opacity back to 1.0 and break.
   */
  function _onTapHandlerStateChange({ nativeEvent }) {
    switch (nativeEvent.state) {
      case State.BEGAN: {
        buttonOpacity.value = 0.5;
        break;
      }
      case State.END: {
        DeviceEventEmitter.emit(SUBBTN_TAP_EVENT);
        buttonOpacity.value = 1.0;
        onPress && onPress();
        break;
      }
      case State.CANCELLED: {
        buttonOpacity.value = 1.0;
        break;
      }
      case State.FAILED: {
        buttonOpacity.value = 1.0;
        break;
      }
      case State.UNDETERMINED: {
        buttonOpacity.value = 1.0;
        break;
      }
    }
  }

  /**
   * The animated styles for the opacity of the button
   * that is used in the style prop of the button
   */
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    };
  });

  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        subButton: {
          width: SUBBTN_WIDTH,
          height: SUBBTN_HEIGHT,
          borderRadius: theme.radii.full,
          backgroundColor: FAB_BACKGROUND_COLOR,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          elevation: 6,
          ...theme.shadows.dp06,
        },
        labelContainer: {
          position: 'absolute',
          backgroundColor: FAB_BACKGROUND_COLOR,
          width: 150,
          height: 40,
          right: SUBBTN_WIDTH + 15,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme.radii.lg,
          borderBottomRightRadius: 0,
        },
        label: {
          color: '#fff',
          fontSize: 16,
          textTransform: 'capitalize',
        },
      }),
    [theme],
  );

  return (
    <TapGestureHandler onHandlerStateChange={_onTapHandlerStateChange}>
      <Animated.View style={[styles.subButton, animatedStyles]}>
        <Shadow dp="dp06" style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </Shadow>
        <Icon name={icon} size={20} color="#fff" />
      </Animated.View>
    </TapGestureHandler>
  );
};
