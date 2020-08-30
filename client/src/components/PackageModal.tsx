import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import NotesCard from "./NotesCard";

const PackageModal = ({
  id,
  data,
  onSelect,
}: {
  id: number | null;
  data: any;
  onSelect: (id: number) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:2222/api/tags/${id}`);
      const tags = data.data.map((e: any) => e.tag);
      setTags(tags);
    })();
  }, [id]);

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

  const onKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = inputRef?.current?.value || "";

      if (value === "") return;

      const res = await axios.post("http://localhost:2222/api/tags", {
        tag: value,
        packageId: id,
      });

      if (res.status === 201 && !tags.includes(res.data.data.tag)) {
        setTags([...tags, res.data.data.tag]);
      }
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
        <ChipContainer>
          {tags.map((tag) => (
            <Chip>{tag}</Chip>
          ))}
        </ChipContainer>
      </ModalContent>

      <NotesCard id={id} />
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

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid black;
  resize: none;
`;

export default PackageModal;
