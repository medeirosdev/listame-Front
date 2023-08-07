import React, { FC } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import { Icon } from '~/app/components/Icon';
import { IRowProps, Row } from '~/app/components/Row';
import { Typography } from '~/app/components/Typography';

interface ITouchableSectionProps extends TouchableOpacityProps {
  rowProps?: IRowProps;
}

export const TouchableSection: FC<ITouchableSectionProps> = (props) => {
  const { children, rowProps, ...rest } = props;
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest}>
      <FooterEditSection {...rowProps}>
        <FooterEditSectionText>{children}</FooterEditSectionText>
        <Icon name="arrow_forward_ios" />
      </FooterEditSection>
    </TouchableOpacity>
  );
};

export const FooterEditSection = styled(Row)`
  padding: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme: { colors } }) => colors.primary.blue[50]};
  border-radius: 8px;
`;

export const FooterEditSectionText = styled(Typography).attrs({
  fontGroup: 'bodyRegular',
})``;
