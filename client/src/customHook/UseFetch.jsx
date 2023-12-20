import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error,setError] = useState(false)

  let fetchedData = async () => {
    try {
      setIsLoading(true);
      let fetchRequest = await fetch(url);
      let fetchResponse = await fetchRequest.json();
      setData(fetchResponse.products);
    //   console.log(fetchResponse.products);
    } catch (error) {
      console.log(error.message);
      setError(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchedData();
  }, [url]);

  return { data, loading,error };
};

export default useFetch;