import React from "react";
import styled from "styled-components";

const ModalCardSection: React.FC<{ heading: string }> = ({
  children,
  heading,
}) => (
  <Container>
    <HeadingText>
      <h4 style={{ margin: 0 }}>{heading}</h4>
    </HeadingText>
    {children}
  </Container>
);

const Container = styled.div<{ height?: number }>`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  height: ${(props) => props.height};
  margin-top: 5px;
  padding: 20px;
  animation-name: appear;
  animation-duration: 1s;
  animation-fill-mode: forwards;
`;

const HeadingText = styled.div`
  text-align: center;
  vertical-align: middle;
  text-transform: capitalize;
  width: 100%;
`;

export default ModalCardSection;
