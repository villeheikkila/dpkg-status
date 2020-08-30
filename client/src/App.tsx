import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PackageCard from "./components/PackageCard";
import Portal from "./components/Portal";
import PackageModal from "./components/PackageModal";
import useAxios from "./hooks/useAxios";
import Search, { Tag } from "./components/Search";

interface Package {
  alternatives: number[] | null;
  dependencies: number[] | null;
  description: string | null;
  id: number;
  name: string;
  tags: number[];
}

const App = () => {
  const data: Package[] = useAxios("http://localhost:2222/api/packages");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [showModal, setShowModal] = useState<number | null>(null);

  if (!data) return <div>Loading</div>;

  const filteredData =
    selectedTags.length === 0
      ? data
      : data.filter(({ tags }: any) => {
          const data = selectedTags.map(({ id }: any) => tags.includes(id));
          return data.every((check: boolean) => check === true);
        });

  const sortedData = filteredData.sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  );

  return (
    <>
      <Header>
        <Heading>dkpg-status</Heading>
        <Search setSelectedTags={setSelectedTags} />

        <Stats>
          <p>Total packages: {data.length}</p>
          <p>Currently showing: {sortedData.length}</p>
        </Stats>
      </Header>
      <Page>
        <GridWrapper>
          {sortedData.map(({ id, name, description }) => (
            <PackageCard
              key={`package-${id}`}
              name={name}
              description={description || ""}
              onClick={() => setShowModal(id)}
            />
          ))}
        </GridWrapper>
      </Page>
      {showModal !== null && (
        <Portal onClose={() => setShowModal(null)}>
          <PackageModal
            data={data}
            id={showModal}
            onSelect={(selected: number) => setShowModal(selected)}
          ></PackageModal>
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
  padding: 2rem;
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
