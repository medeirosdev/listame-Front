import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Typography } from '~/app/components/Typography';
import Animated, {
  useAnimatedRef,
  measure,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
  runOnUI,
} from 'react-native-reanimated';
import {
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Chevron } from './anathomy/Chevron';
import { Shadow } from '~/app/components/Shadow';

type Props = {
  title: string;
  children?: React.ReactNode;
  beginOpenned?: boolean;
  forceClosing?: boolean;
};

export const Acordion: FC<Props> = ({
  title = '',
  children,
  beginOpenned = false,
  forceClosing = false,
}) => {
  const [, setIsOpen] = useState(false);
  const animatedRef = useAnimatedRef<View>();
  const open = useSharedValue(false);
  const heightProgress = useDerivedValue(() =>
    open.value ? withSpring(1) : withTiming(0),
  );
  const height = useSharedValue(0);
  const headerStyle = useAnimatedStyle(() => ({
    borderBottomLeftRadius: heightProgress.value === 0 ? 8 : 0,
    borderBottomRightRadius: heightProgress.value === 0 ? 8 : 0,
  }));
  const style = useAnimatedStyle(() => ({
    height: height.value * heightProgress.value + 1,
    opacity: heightProgress.value === 0 ? 0 : 1,
  }));

  const updateContentHeight = () => {
    'worklet';

    if (height.value === 0) {
      const measured = measure(animatedRef);
      height.value = measured.height;
    }
  };

  const onPressToggle = () => {
    if (Platform.OS === 'ios') runOnUI(updateContentHeight)();
    open.value = !open.value;
    setIsOpen((prev) => !prev);
  };

  const onLayoutContent = (e: LayoutChangeEvent) => {
    if (Platform.OS === 'android') height.value = e.nativeEvent.layout.height;
  };

  useEffect(() => {
    if (beginOpenned) {
      onPressToggle();
    }
  }, [beginOpenned]);

  useEffect(() => {
    if (forceClosing) {
      open.value = false;
      setIsOpen(false);
    }
  }, [forceClosing]);

  return (
    <Shadow dp="dp04">
      <TouchableWithoutFeedback onPress={onPressToggle}>
        <Header style={[headerStyle]}>
          <AccordionTitle>{title}</AccordionTitle>
          <Chevron progress={heightProgress} />
        </Header>
      </TouchableWithoutFeedback>
      <AnimatedWrapper style={[style]}>
        <ListItemsContainer>
          <View
            style={styles.childrenViewWrapper}
            onLayout={onLayoutContent}
            ref={animatedRef}>
            {children}
          </View>
        </ListItemsContainer>
      </AnimatedWrapper>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  childrenViewWrapper: {
    position: 'absolute',
    paddingHorizontal: 8,
    paddingBottom: 8,
    left: 0,
    right: 0,
  },
});

const AccordionTitle = styled(Typography).attrs({
  fontGroup: 'bodySmallMedium',
})`
  color: ${({ theme: { colors } }) => colors.neutral.white};
`;

const Header = styled(Animated.View).attrs({
  paddingHorizontal: 24,
})`
  flex-direction: row;
  background-color: ${({ theme: { colors } }) => colors.primary.blue[500]};
  height: 40px;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme: { radii } }) => `${radii.xs}px`};
  elevation: ${({ theme: { elevations } }) => elevations.dp04};
`;

const AnimatedWrapper = styled(Animated.View)`
  overflow: hidden;
`;

const ListItemsContainer = styled.View`
  flex: 1;
  padding: 8px;
  padding-top: 0px;
  border-bottom-left-radius: ${({ theme: { radii } }) => `${radii.xs}px`};
  border-bottom-right-radius: ${({ theme: { radii } }) => `${radii.xs}px`};
`;
