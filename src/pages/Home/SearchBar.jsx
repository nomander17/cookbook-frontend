import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export default function SearchBar({ setPosts }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const authHeader = useAuthHeader();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        if (debouncedQuery) {
          response = await axios.post(
            `/posts/search`,
            {
              query: debouncedQuery,
            },
            {
              headers: {
                Authorization: authHeader,
              },
            }
          );
        } else {
          response = await axios.get("/posts", {
            headers: {
              Authorization: authHeader,
            },
          });
        }
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        if (error.response) {
          console.error(error.response.data);
        }
      }
    };

    fetchPosts();
  }, [debouncedQuery]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    setDebouncedQuery(query);
  };

  return (
    <div className="mt-4 w-2/3 mx-auto">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 text-white flex items-center ps-3 pointer-events-none">
          <Search />
        </div>
        <input
          type="search"
          className="text-offwhite focus:outline-none focus:ring-2 focus:ring-blue-500 block w-full p-4 ps-10 text-sm rounded-lg bg-background"
          placeholder="Search for recipes..."
          value={query}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
