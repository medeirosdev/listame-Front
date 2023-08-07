import React, { ComponentProps, FC, useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { createIconSetFromFontello } from 'react-native-vector-icons';

import config from '../assets/icons/listame-icons.json';

const CustomIcon = createIconSetFromFontello(config);

export type IconProps = ComponentProps<typeof CustomIcon>;

export const Icon: FC<IconProps> = React.memo((props) => {
  const { size, ...rest } = props;

  useEffect(() => {
    const isIconAvaliable = avaliableIcons.includes(props.name);

    if (!isIconAvaliable) {
      console.warn(`Icon ${props.name} doesn't exists on listame-icons`);
    }
  }, [props.name]);

  return (
    <CustomIcon {...rest} size={size && !isNaN(size) ? RFValue(size) : size} />
  );
});

const avaliableIcons = config.glyphs.map((glyph) => glyph.css);
