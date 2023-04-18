import { useEffect, useState } from "react";
import { useHttp } from "./hooks/http.hook";
import { useBoardService } from "./services/useBoardService";

import Search from "./components/search/Search";
import Board from "./components/board/Board";

import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

const App = () => {
    const [query, setQuery] = useState("");
    const [allIssues, setAllIssues] = useState([]);
    const [openIssues, setOpenIssues] = useState([]);
    const [closedIssues, setClosedIssues] = useState([]);

    const { loading, error, clearError, getIssues } = useBoardService();

    const onRequest = async () => {
        // при вводе неправильного юрл выводить ошибку
        const data = await getIssues("https://github.com/facebook/react");

        setAllIssues(data.allIssues);
        setOpenIssues(data.openIssues);
        setClosedIssues(data.closedIssues);
    };

    return (
        <Container>
            <Search query={query} setQuery={setQuery} onRequest={onRequest} />

            <div className="general-info">Facebook &gt; React 194k stars</div>
            <Board />
        </Container>
    );
};

export default App;
