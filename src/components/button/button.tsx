import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {AppText} from '../index';
import {viewPresets, textPresets} from './button.presets';
import {ButtonProps} from './button.props';

/**
 * This component is a HOC over the built-in React Native one.
 */
export function AppButton(props: ButtonProps) {
  // grab the props
  const {
    preset = 'primary',
    title,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props;

  const viewStyle = viewPresets[preset] || viewPresets.primary;
  const viewStyles = [viewStyle, styleOverride];
  const textStyle = textPresets[preset] || textPresets.primary;
  const textStyles = [textStyle, textStyleOverride];

  const content = children || <AppText text={title} style={textStyles} />;

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      {content}
    </TouchableOpacity>
  );
}
