import { useEffect, useState } from "react";
import apiRequest from "../apiRequest";

export default function useRequest(method, endpoint, params) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest(method, endpoint, params)
      .then(response => {
        setData(response);
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  return [data, loading];
}