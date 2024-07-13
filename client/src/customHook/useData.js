// src/hooks/useData.js
import { useQuery } from '@tanstack/react-query';

const fetchProducts = async () => {
  const response = await fetch("https://jazzy-mern.onrender.com/api/products");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.products;
};

const useData = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 3600000, // 1 hour in milliseconds
  });
};

export default useData;
