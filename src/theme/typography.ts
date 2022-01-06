import {Platform} from 'react-native';

/**
 * You can find a list of available fonts on both iOS and Android here:
 * https://github.com/react-native-training/react-native-fonts
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
export const typography = {
  /**
   * The primary font.  Used in most places.
   */
  primary: Platform.select({ios: 'Helvetica', android: 'normal'}),

  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ios: 'Arial', android: 'sans-serif'}),

  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ios: 'Courier', android: 'monospace'}),
};
