import React from 'react';

import styled from 'styled-components';

const KleidiLink = styled.a`
  color: #4140a5;
`;

const AboutMe = () => (
  <p>
    I&apos;m a Software Engineer currently working at{' '}
    <KleidiLink
      href="https://kleidi.io"
      target="_blank"
      rel="noreferrer noopener"
    >
      Kleidi
    </KleidiLink>
    .
  </p>
);

export default AboutMe;
