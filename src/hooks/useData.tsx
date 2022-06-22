import { useEffect, useState } from "react";

const useData = (URL: string) => {
  const [data, setData] = useState<[{ [key: string]: any }]>();

  useEffect(() => {
    let fetchData = async () => {
      const response: Response = await fetch(URL);
      const data = await response.json();

      setData(data.data);
    };

    fetchData();
    
  }, [URL]); // Fetching & updaing data

  return data;
};

export default useData;
