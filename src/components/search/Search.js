import React from "react";

import "./search.scss";

const Search = ({ query, setQuery, onRequest }) => {
    // const { loading, request, error, clearError } = useHttp();

    // const onRequest = async () => {
    //     const result = await request(
    //         "https://api.github.com/repos/facebook/react/issues"
    //     );

    //     setAllIssues(result);
    // };

    return (
        <div className="search">
            <input
                type="text"
                id="search"
                placeholder="Enter repo URL"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={onRequest}>Load issues</button>
        </div>
    );
};

export default Search;
