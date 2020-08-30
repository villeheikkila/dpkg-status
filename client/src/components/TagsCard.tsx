import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import ModalCardSection from "./ModalCardSection";

const TagsCard = ({ id }: { id: number }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:2222/api/tags/${id}`);
      const tags = data.data.map((e: any) => e.tag);
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
        setTags([...tags, res.data.data.tag]);
      }
    }
  };

  return (
    <ModalCardSection heading="tags">
      <Input ref={inputRef} onKeyPress={onKeyPress} />
      <ChipContainer>
        {tags.map((tag) => (
          <Chip>{tag}</Chip>
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
`;

const ChipContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 110px);
`;

export default TagsCard;
