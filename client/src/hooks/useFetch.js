import { useState, useEffect } from "react";

export default function useFetch(fetchFn, params = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchFn(params)
      .then((res) => {
        if (mounted) setData(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, [JSON.stringify(params)]);

  return { data, loading, error };
}