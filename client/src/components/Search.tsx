import React, { useState, useReducer, useEffect } from "react";
import styled from "styled-components";
import useAxios from "../hooks/useAxios";

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
  const tags: any = useAxios("http://localhost:2222/api/tags");
  const [search, setSearch] = useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [selectedTags, dispatch] = useReducer((state: any, action: any) => {
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
  }, [selectedTags]);

  const filteredTags =
    tags && tags.filter((e: any) => e.tag.includes(search)).slice(0, 10);

  if (!tags) return null;

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = inputRef?.current?.value || "";
      setSearch(value);
    }
  };

  const onClick = (tag: any) => {
    dispatch({
      type: "add",
      tag,
    });
    setSearch(null);
  };

  return (
    <SearchArea>
      <Input placeholder="Search..." ref={inputRef} onKeyPress={onKeyPress} />

      <Container>
        <Menu display={search !== null ? "block" : "none"}>
          {filteredTags.map((tag: any) => (
            <Item>
              <Button onClick={() => onClick(tag)}>{tag.tag}</Button>
            </Item>
          ))}
        </Menu>
      </Container>
      <TagArea>
        {selectedTags.map((tag: any) => (
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

  ::selection {
    outline: none;
  }

  ::placeholder {
    padding-left: 10px;
  }
`;

const Tag = styled.button`
  padding: 3px;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
`;

const TagArea = styled.div`
  display: grid;
  grid-gap: 4px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
`;

const SearchArea = styled.div`
  width: 300px;
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const Menu = styled.ul<{ display?: "none" | "block" }>`
  display: ${(props) => props.display || "none"};
  position: absolute;
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 10px;
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

  :hover {
    border: 1px solid lightcyan;
    background-color: lightcyan;
    border-radius: 4px;
  }
`;

export default Search;
