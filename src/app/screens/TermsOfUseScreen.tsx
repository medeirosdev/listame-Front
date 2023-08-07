import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
import { AppInfoFooter } from '~/app/components/AppInfoFooter';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import { Row } from '~/app/components/Row';
import { Typography } from '~/app/components/Typography';
import { BodyText } from '~/app/screens/PrivacyPolicyScreen';

export const TermsOfUseScreen = () => {
  const [acceptedTermsOfUse, setAcceptedTermsOfUse] = useState(false);

  const theme = useTheme();
  return (
    <LayoutContainer my={24}>
      <Typography fontGroup="h6Medium" color={theme.colors.gray[900]}>
        Termos de uso
      </Typography>
      <Row my={8} />
      <BodyText>
        Enim velit nulla egestas tellus nisl urna. Enim nec feugiat vestibulum
        amet scelerisque ultricies. Fermentum, imperdiet amet nunc, sit
        scelerisque fringilla auctor ipsum. Ante quis nunc lacus in malesuada
        nulla aliquam rhoncus adipiscing. Leo amet sollicitudin neque faucibus
        fermentum adipiscing amet, maecenas. Diam enim in ullamcorper lobortis
        consectetur. Et nibh nibh dui at velit elit amet urna rhoncus. Vivamus
        sollicitudin tempor, ut varius dignissim. Ornare aenean posuere risus
        semper enim. Eu erat at pellentesque proin.
      </BodyText>
      <Row my={4} />
      <BodyText>
        Id volutpat leo suspendisse dolor mauris eget est morbi neque. Eget
        massa volutpat, sed natoque nisl gravida tristique vulputate posuere.
        Tempor nunc, diam venenatis suspendisse praesent id. Et, pharetra, et
        ornare sed ac vitae egestas. Fermentum, risus, arcu sit vulputate duis
        blandit elit sit. Felis montes, lectus in sed sed. Venenatis et feugiat
        enim vehicula tellus a, porttitor ac.
      </BodyText>
      <Row my={4} />
      <AppInfoFooter
        text="Eu aceito os Termos de uso."
        setChecked={setAcceptedTermsOfUse}
        checked={acceptedTermsOfUse}
      />
    </LayoutContainer>
  );
};
