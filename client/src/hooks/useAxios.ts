import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (baseUrl: string) => {
  const [url] = useState(baseUrl);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios(url);
        setData(result.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [url]);

  return data;
};

export default useAxios;
