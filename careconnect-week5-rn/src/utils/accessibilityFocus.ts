import { useCallback, type RefObject } from 'react';
import { findNodeHandle, AccessibilityInfo, InteractionManager } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Moves TalkBack/VoiceOver focus to the target element when the screen gains focus.
 * Use with useFocusEffect so focus is set after navigation (e.g. when coming from a
 * screen with a header back button). Prevents the back button from receiving initial focus.
 */
export function useScreenFocusEffect(ref: RefObject<unknown>) {
  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        const node = findNodeHandle(ref.current);
        if (node) {
          AccessibilityInfo.setAccessibilityFocus(node);
        }
      });
      return () => task.cancel();
    }, [ref])
  );
}
