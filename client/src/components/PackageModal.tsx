import React, { useRef, useEffect, RefObject, MutableRefObject } from "react";
import styled from "styled-components";
import NotesCard from "./NotesCard";
import TagsCard from "./TagsCard";
import ModalCardSection from "./ModalCardSection";
import { Package } from "../App";

const PackageModal = ({
  id,
  data,
  onSelect,
}: {
  id: number;
  data: Package[];
  onSelect: (id: number) => void;
}) => {
  const packageData = data.find((unit: Package) => unit.id === id);

  if (!packageData) return null;

  const { dependencies, description, name, alternatives } = packageData;

  const getDeps = dependencies
    ? dependencies.map((id: number) => data.find((_: Package) => _.id === id))
    : [];

  const getAltDeps = alternatives
    ? alternatives.map((id: number) => data.find((_: Package) => _.id === id))
    : [];

  return (
    <Container>
      <CardHeader>
        <h3>{name}</h3>
      </CardHeader>

      <ModalCardSection heading="description">
        <p>{description}</p>
      </ModalCardSection>

      {getAltDeps !== [] && (
        <ModalCardSection heading="dependencies">
          <ChipContainer>
            {getDeps.map((e: any) => (
              <Chip
                key={`dependency-${e.id}-${id}`}
                onClick={() => onSelect(e.id)}
              >
                {e.name}
              </Chip>
            ))}
          </ChipContainer>
        </ModalCardSection>
      )}

      {getAltDeps !== [] && (
        <ModalCardSection heading="alternatives">
          <ChipContainer>
            {getAltDeps.map((e: any) => (
              <Chip
                key={`alternatives-${e.id}-${id}`}
                onClick={() => onSelect(e.id)}
              >
                {e.name}
              </Chip>
            ))}
          </ChipContainer>
        </ModalCardSection>
      )}

      <TagsCard id={id} />
      <NotesCard id={id} />
    </Container>
  );
};

const CardHeader = styled.div`
  width: 100%;
  background: #f8f9fa;
  text-align: center;
  vertical-align: middle;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const Chip = styled.button`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 4px;
  margin-right: 4px;
  padding: 8px;
  width: 100px;
  background-color: #f8f9fa;

  :hover,
  :focus {
    background-color: #14af83;
    color: white;
  }
`;

const ChipContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 110px);
  margin-top: 10px;
`;

const Container = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    width: 600px;
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export default PackageModal;
