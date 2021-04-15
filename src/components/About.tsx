import React from 'react';

import styled from 'styled-components';

const KleidiLink = styled.a`
  color: #4140a5;
`;

const AboutMe = () => (
  <div className="grid justify-items-center" style={{ marginBottom: '1rem' }}>
    <h3>Hi. I&apos;m Cameron.</h3>
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
  </div>
);

export default AboutMe;
