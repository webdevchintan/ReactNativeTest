import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {ButtonPresetNames} from './button.presets';

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames;

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode;
}
