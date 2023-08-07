import { useLayoutEffect } from 'react';
import { AppState } from 'react-native';

interface UseAppFocusProps {
  onFocus?: () => void;
  onFocusLeave?: () => void;
}

export const useAppFocus = ({ onFocus, onFocusLeave }: UseAppFocusProps) => {
  useLayoutEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      const focused = state === 'active';
      const unfocus = state === 'background' || state === 'inactive';

      if (focused && !!onFocus) onFocus();
      if (unfocus && !!onFocusLeave) onFocusLeave();
    });

    return () => {
      subscription.remove();
    };
  }, []);
};
