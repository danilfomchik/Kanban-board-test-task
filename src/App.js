import { useEffect, useState, createContext } from "react";
import { useDispatch } from "react-redux";

// import { useHttp } from "./hooks/http.hook";
import { useBoardService } from "./services/useBoardService";
import { getRepository } from "./helpers/helpers";
// import { handleSearch, fetchIssues } from "./store/boardSlice";

import { IssuesProvider } from "./context/IssuesProvider";
import Search from "./components/search/Search";
import Board from "./components/board/Board";

import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

const App = () => {
    const [issues, setIssues] = useState({
        allIssues: [],
        openIssues: [],
        closedIssues: [],
    });
    const [info, setInfo] = useState([]);

    const { loading, error, clearError, getIssues } = useBoardService();

    const onRequest = async (query) => {
        // при вводе неправильного юрл выводить ошибку
        const { info, issues } = await getIssues(query);

        setInfo(info);
        setIssues(issues);
    };

    useEffect(() => {
        console.log(issues.length);
    });

    return (
        <Container>
            <Search handleRequest={onRequest} />

            {/* переделать */}
            {/* {!loading && issues.length > 0 && ( */}
            <div className="general-info">
                <a href={info.full_name_url} target="_blanck">
                    {info.owner} &gt; {info.repositoryName}{" "}
                </a>
                {Math.round(info.stars / 1000)}k stars
            </div>
            {/* )} */}
            {/* переделать */}
            <IssuesProvider value={issues}>
                <Board />
            </IssuesProvider>
        </Container>
    );
};

export default App;
