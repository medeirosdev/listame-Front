import React, { PropsWithChildren, ReactNode } from 'react';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import styled from 'styled-components/native';
import { Row } from '~/app/components/Row';
import { Shadow } from '~/app/components/Shadow';

interface IAvatarHeaderLayoutProps extends PropsWithChildren {
  avatar: ReactNode;
}

export const AvatarHeaderLayout = (props: IAvatarHeaderLayoutProps) => {
  return (
    <AvatarHeaderLayoutContainer>
      <HeaderRow>
        <HeaderAvatarWrapper>
          <Shadow
            dp="dp08"
            style={{
              borderRadius: 9999,
            }}>
            {props?.avatar}
          </Shadow>
        </HeaderAvatarWrapper>
      </HeaderRow>
      <LayoutContent>{props?.children}</LayoutContent>
    </AvatarHeaderLayoutContainer>
  );
};

export const AvatarHeaderLayoutContainer = styled.View`
  flex: 1;
  background-color: ${({ theme: { colors } }) => colors.neutral.white};
`;

const HeaderRow = styled(Row)`
  background-color: ${({ theme }) => theme.colors.primary.blue[50]};
  height: 118px;
  justify-content: center;
`;

const HeaderAvatarWrapper = styled(Row)`
  flex: 1;
  justify-content: center;
  position: absolute;
  top: 40px;
`;

const LayoutContent = styled(LayoutContainer)`
  margin-top: 40px;
`;
