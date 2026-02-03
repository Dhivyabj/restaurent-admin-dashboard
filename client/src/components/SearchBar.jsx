import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import api from "../services/api";

export default function SearchBar({ setResults }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      api.get(`/menu/search?q=${debouncedQuery}`).then(res => setResults(res.data));
    } else {
      api.get("/menu").then(res => setResults(res.data));
    }
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      placeholder="Search menu..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      className="border p-2 rounded w-full"
    />
  );
}