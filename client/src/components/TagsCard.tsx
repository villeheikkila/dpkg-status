import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import ModalCardSection from "./ModalCardSection";

interface Tag {
  id: number;
  tag: string;
}
const TagsCard = ({ id }: { id: number }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    (async () => {
      const data = await axios.get(`http://localhost:2222/api/tags/${id}`);
      const tags = data.data.data;
      setTags(tags);
    })();
  }, [id]);

  if (id === null) return null;

  const onKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = inputRef?.current?.value || "";

      if (value === "") return;

      const res = await axios.post("http://localhost:2222/api/tags", {
        tag: value,
        packageId: id,
      });

      if (res.status === 201 && !tags.includes(res.data.data.tag)) {
        setTags([...tags, res.data.data]);
      }
    }
  };

  const onClick = async (tagId: number) => {
    if (tagId) {
      const res = await axios.delete(
        `http://localhost:2222/api/tags/${tagId}/${id}`
      );

      setTags(tags.filter((e) => e.id !== res.data.data[0].tagId));
    }
  };

  return (
    <ModalCardSection heading="tags">
      <Input ref={inputRef} onKeyPress={onKeyPress} />
      <ChipContainer>
        {tags.map(({ tag, id }) => (
          <Chip key={`tag-${id}`} onClick={() => onClick(id)}>
            {tag}
          </Chip>
        ))}
      </ChipContainer>
    </ModalCardSection>
  );
};

const Input = styled.input`
  width: 150px;
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
`;

export default TagsCard;
