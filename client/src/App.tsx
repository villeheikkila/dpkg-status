import React, {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  RefObject,
} from "react";
import styled from "styled-components";
import axios from "axios";
import Package from "./components/Package";

const useAxios = (baseUrl: string) => {
  const [url, setUrl] = useState(baseUrl);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return data;
};

const App = () => {
  const data: any = useAxios("http://localhost:2222/api/packages");
  const [search, setSearch] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {}, []);

  if (!data) return <div></div>;

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = inputRef?.current?.value || "";
      setSearch(value);
    }
  };

  const sortedData = data
    .filter((e: any) => e.name.includes(search))
    .sort((a: any, b: any) => a.name > b.name);

  return (
    <div>
      <Header>
        <Heading>dkpg-status</Heading>
        <Input placeholder="Search..." ref={inputRef} onKeyPress={onKeyPress} />
        <Stats>
          <p>Total packages: {data.length}</p>
          <p>Currently showing: {sortedData.length}</p>
        </Stats>
      </Header>
      <Page>
        <GridWrapper>
          {sortedData?.map(({ id, name, description }: any) => (
            <Package
              key={`package-${id}`}
              name={name}
              description={description}
            ></Package>
          ))}
        </GridWrapper>
      </Page>
    </div>
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
  height: 200px;
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

export default App;
