import React from "react";
import styled from "styled-components";

const PackageModal = ({
  id,
  data,
  onSelect,
}: {
  id: number | null;
  data: any;
  onSelect: (id: number) => void;
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  if (id === null) return null;

  const { dependencies, description, name, alternatives } = data.find(
    (unit: any) => unit.id === id
  );

  const getDeps =
    dependencies &&
    dependencies.map((id: any) => data.find((_: any) => _.id === id));

  const getAltDeps =
    alternatives &&
    alternatives.map((id: any) => data.find((_: any) => _.id === id));

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = inputRef?.current?.value || "";
      console.log(value);
    }
  };

  return (
    <Container>
      <Name>
        <h3>{name}</h3>
      </Name>

      <ModalContent>
        <HeadingText>
          <h4 style={{ margin: 0 }}>Description</h4>
        </HeadingText>

        <p>{description}</p>
      </ModalContent>

      {(getDeps || getAltDeps) && (
        <ModalContent>
          {getDeps && (
            <>
              <HeadingText>
                <h4 style={{ margin: 0 }}>Dependencies</h4>
              </HeadingText>

              <div style={{ height: "10px" }}> </div>

              <ChipContainer>
                {getDeps?.map((e: any) => (
                  <Chip onClick={() => onSelect(e.id)}>{e.name}</Chip>
                ))}
              </ChipContainer>
            </>
          )}

          {getAltDeps && (
            <>
              <HeadingText>
                <h4 style={{ margin: 0 }}> Alternatives</h4>
              </HeadingText>
              <ChipContainer>
                {getAltDeps?.map((e: any) => (
                  <Chip onClick={() => onSelect(e.id)}>{e.name}</Chip>
                ))}
              </ChipContainer>
            </>
          )}
        </ModalContent>
      )}
      <ModalContent>
        <HeadingText>
          <h4 style={{ margin: 0 }}>Tags</h4>
        </HeadingText>
        <Input ref={inputRef} onKeyPress={onKeyPress} />
      </ModalContent>
    </Container>
  );
};

const Name = styled.div`
  width: 100%;
  background: #f8f9fa;
  text-align: center;
  vertical-align: middle;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  width: 150px;
`;

const HeadingText = styled.div`
  text-align: center;
  vertical-align: middle;
  width: 100%;
`;

const Chip = styled.button`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 4px;
  margin-right: 4px;
  padding: 8px;
  width: 100px;
  background-color: #f8f9fa;
`;

const ChipContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 110px);
`;

const Container = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
`;

const ModalContent = styled.div<{ height?: number }>`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  height: ${(props) => props.height};
  margin-top: 5px;
  padding: 20px;
`;

export default PackageModal;
