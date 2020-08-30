import React, { useState } from "react";
import styled from "styled-components";
import PackageCard from "./components/PackageCard";
import Portal from "./components/Portal";
import PackageModal from "./components/PackageModal";
import useAxios from "./hooks/useAxios";
import Search, { Tag } from "./components/Search";

export interface Package {
  alternatives: number[] | null;
  dependencies: number[];
  description: string | null;
  id: number;
  name: string;
  tags: number[];
}

const App = () => {
  const data: Package[] = useAxios("http://localhost:2222/api/packages");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [showPackage, setShowPackage] = useState<number | null>(null);

  if (!data) return <div>Loading</div>;

  const filteredData =
    selectedTags.length === 0
      ? data
      : data.filter(({ tags }) => {
          const data = selectedTags.map(({ id }) => tags.includes(id));
          return data.every((check) => check === true);
        });

  const sortedData = filteredData.sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  );

  return (
    <>
      <Header>
        <Heading>dkpg-status</Heading>
        <Stats>
          <p>
            Total packages: {data.length}
            {data.length !== sortedData.length && ` (${sortedData.length})`}
          </p>
        </Stats>
        <Search setSelectedTags={setSelectedTags} />
      </Header>

      <Page>
        <GridWrapper>
          {sortedData.map(({ id, name, description }) => (
            <PackageCard
              key={`package-${id}`}
              name={name}
              description={description || ""}
              onClick={() => setShowPackage(id)}
            />
          ))}
        </GridWrapper>
      </Page>

      {showPackage !== null && (
        <Portal onClose={() => setShowPackage(null)}>
          <PackageModal
            data={data}
            id={showPackage}
            onSelect={(selected: number) => setShowPackage(selected)}
          />
        </Portal>
      )}
    </>
  );
};

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const Page = styled.div`
  padding: 2rem 2vw;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h1`
  text-align: center;
  vertical-align: middle;
  font-size: 48px;
  margin: 0;
  padding: 20px;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  height: 30px;
  margin-top: 10px;

  > p {
    margin: 0;
  }
`;

export default App;
