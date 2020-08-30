import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (baseUrl: string) => {
  const [url, setUrl] = useState(baseUrl);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(url);

        setData(result.data.data);
      } catch (error) {}
    };

    fetchData();
  }, [url]);

  return data;
};

export default useAxios;
