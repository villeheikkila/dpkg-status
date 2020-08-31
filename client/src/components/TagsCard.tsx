import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import ModalCardSection from "./ModalCardSection";
import { BASE_URL } from "..";

interface Tag {
  id: number;
  tag: string;
}
const TagsCard = ({ id }: { id: number }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    (async () => {
      const data = await axios.get(`${BASE_URL}/api/tags/${id}`);
      const tags = data.data.data;
      setTags(tags);
    })();
  }, [id]);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTag();
    }
  };

  const addTag = async () => {
    const value = inputRef?.current?.value || "";

    if (value === "") return;
    const res = await axios.post(`${BASE_URL}/api/tags`, {
      tag: value,
      packageId: id,
    });

    if (res.status === 201 && !tags.includes(res.data.data.tag)) {
      setTags([...tags, res.data.data]);
    }
  };

  const deleteTag = async (tagId: number) => {
    if (tagId) {
      const res = await axios.delete(`${BASE_URL}/api/tags/${tagId}/${id}`);

      setTags(tags.filter((e) => e.id !== res.data.data[0].tagId));
    }
  };

  return (
    <ModalCardSection heading="tags">
      <ChipContainer>
        {tags.map(({ tag, id }) => (
          <Chip key={`tag-${id}`} onClick={() => deleteTag(id)}>
            {tag}
          </Chip>
        ))}
      </ChipContainer>

      <InputContainer>
        <Input ref={inputRef} onKeyPress={onKeyPress} />
        <InputButton onClick={() => addTag()}>Add</InputButton>
      </InputContainer>
    </ModalCardSection>
  );
};

const Input = styled.input`
  width: 150px;
  padding: 3px;
`;

const InputButton = styled.button`
  background: none;
  color: inherit;
  border: 1px solid black;
  background-color: #4f3d85;
  color: #fff;
  padding: 8px;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  :hover {
    background-color: #745fb5;
  }
`;

const InputContainer = styled.div`
  display: flex;
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
    background-color: rgba(232, 59, 63, 0.2);
  }
`;

const ChipContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 110px);
  margin: 10px 0;
`;

export default TagsCard;
