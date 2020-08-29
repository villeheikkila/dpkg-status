import React from "react";
import styled from "styled-components";

const PackageCard = ({
  name,
  description,
  onClick,
}: {
  name: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <>
      <Wrapper onClick={onClick}>
        <Name>
          <h3>{name}</h3>
        </Name>
        <div style={{ height: "2px" }}> </div>

        <Content>{description?.split(".")[0] || null}</Content>
      </Wrapper>
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
`;

const Content = styled.div`
  border-radius: 2px;
  background: #fff;
  height: 150px;
  padding: 8px;
  font-size: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

export default PackageCard;
