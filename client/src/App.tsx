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

  if (!data) return <div></div>;

  return (
    <div>
      <Header>
        <Heading>dkpg-status</Heading>
        <Input placeholder="Search..."></Input>
      </Header>
      <Page>
        <GridWrapper>
          {data
            .filter((e: any) => e.name.includes(search))
            ?.map(({ id, name, description }: any) => (
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

const Input = styled.input`
  height: 40px;
  width: 200px;
  font-size: 14;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

export default App;
