import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Portal from "./Portal";

const Package = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Wrapper onClick={() => setShowModal(true)}>
        <Name>
          <h3>{name}</h3>
        </Name>
        <Content>{description?.split(".")[0] || null}</Content>
      </Wrapper>

      {showModal && (
        <Portal onClose={() => setShowModal(false)}>
          <ModalContainer></ModalContainer>
        </Portal>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;

  :hover {
    transform: scale(1.1);
    transition-duration: 0.3s;
  }
`;

const Name = styled.div`
  width: 100%;
  background: #f8f9fa;
  text-align: center;
  vertical-align: middle;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin-bottom: 2px;
`;

const Content = styled.div`
  border-radius: 2px;
  background: #fff;
  height: 150px;
  padding: 8px;
  font-size: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const ModalContainer = styled.div`
  width: 800px;
  height: 800px;
  background-color: black;
`;

export default Package;
