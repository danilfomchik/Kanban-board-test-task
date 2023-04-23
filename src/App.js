import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// import { useHttp } from "./hooks/http.hook";
import { useBoardService } from "./services/useBoardService";
import { getRepository } from "./helpers/helpers";
// import { handleSearch, fetchIssues } from "./store/boardSlice";

import Search from "./components/search/Search";
import Board from "./components/board/Board";

import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

const App = () => {
    // https://github.com/facebook/react
    // const [query, setQuery] = useState("https://github.com/facebook/react");
    const [issues, setIssues] = useState(null);
    const [info, setInfo] = useState([]);

    const { loading, error, clearError, getIssues } = useBoardService();

    const onRequest = async (query) => {
        // при вводе неправильного юрл выводить ошибку
        const { info, issues } = await getIssues(query);

        setInfo(info);
        setIssues(issues);
    };

    return (
        <Container>
            <Search handleRequest={onRequest} />

            {!loading && !!issues && (
                <div className="general-info">
                    <a href={info.full_name_url} target="_blanck">
                        {info.owner} &gt; {info.repositoryName}{" "}
                    </a>
                    {Math.round(info.stars / 1000)}k stars
                </div>
            )}
            <Board />
        </Container>
    );
};

export default App;
