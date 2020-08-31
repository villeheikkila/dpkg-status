import React, { useState, useReducer, useEffect } from "react";
import styled from "styled-components";
import useAxios from "../hooks/useAxios";
import { BASE_URL } from "..";

export interface Tag {
  id: number;
  tag: string;
  packageId: number;
  tagId: number;
}

const Search = ({
  setSelectedTags,
}: {
  setSelectedTags: (tags: Tag[]) => void;
}) => {
  const tags: Tag[] = useAxios(`${BASE_URL}/api/tags`);
  const [search, setSearch] = useState<string>("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setSearch(inputValue);
  }, [inputValue]);

  const [selectedTags, dispatch] = useReducer((state: Tag[], action: any) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          {
            ...action.tag,
          },
        ];
      case "remove": {
        return state.filter(({ id }: any) => id !== action.tag.id);
      }
      default:
        return state;
    }
  }, []);

  useEffect(() => {
    setSelectedTags(selectedTags);
  }, [selectedTags, setSelectedTags]);

  const filteredTags = tags && tags.filter((e) => e.tag.includes(search));

  if (!tags) return null;

  const onClick = (tag: any) => {
    dispatch({
      type: "add",
      tag,
    });
    setSearch("");
    setInputValue("");
  };

  return (
    <SearchArea>
      <Input
        placeholder="Search..."
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
      />

      <DropdownContainer>
        <Dropdown display={inputValue.length > 1 ? "flex" : "none"}>
          {filteredTags.length !== 0
            ? filteredTags.slice(0, 10).map((tag, i) => (
                <Item key={`$item-${tag.id}-${i}`}>
                  <Button onClick={() => onClick(tag)}>{tag.tag}</Button>
                </Item>
              ))
            : "No tags found"}
          {filteredTags.length > 10 && (
            <Message>Some tags were hidden </Message>
          )}
        </Dropdown>
      </DropdownContainer>

      <TagArea>
        {selectedTags.map((tag) => (
          <Tag onClick={() => dispatch({ type: "remove", tag })}>{tag.tag}</Tag>
        ))}
      </TagArea>
    </SearchArea>
  );
};

const Input = styled.input`
  height: 40px;
  width: 300px;
  font-size: 14;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  outline: none;

  :focus {
    border: 2px solid #14af83;
    border-radius: 2px;
  }

  ::placeholder {
    padding-left: 10px;
  }
`;

const Tag = styled.button`
  padding: 4px;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background: #fff;

  :hover,
  :focus {
    background-color: rgba(232, 59, 63, 0.2);
  }
`;

const TagArea = styled.div`
  display: grid;
  grid-gap: 4px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
`;

const SearchArea = styled.div`
  width: 300px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const Dropdown = styled.ul<{ display?: "none" | "flex" }>`
  display: ${(props) => props.display || "none"};
  position: absolute;
  z-index: 100;
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 10px;
  flex-direction: column;
`;

const Item = styled.li`
  list-style-type: none;
`;

const Button = styled.button`
  padding: 3px;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;

  :hover,
  :focus {
    border: 1px solid #14af83;
    background-color: #14af83;
    border-radius: 4px;
    color: #fff;
  }
`;

const Message = styled.span`
  padding-top: 4px;
  place-self: center;
  color: #745fb5;
`;

export default Search;
