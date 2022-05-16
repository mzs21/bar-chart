import { json } from "d3";
import { useEffect, useState } from "react";

const useData = (URL: string) => {
  const [data, setData] = useState<[{ [key: string]: any }]>();

  useEffect(() => {
    json(URL).then((data: { [key: string]: any }) => setData(data.data));
  }, [URL]); // Fetching & updaing data

  return data;
};

export default useData;

