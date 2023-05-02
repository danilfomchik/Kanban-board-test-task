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

    const [columns, setColumns] = useState([
        { id: 0, title: "ToDo", state: "open", issues: [] },
        { id: 1, title: "In Progress", state: "open", issues: [] },
        { id: 2, title: "Done", state: "closed", issues: [] },
    ]);

    const [info, setInfo] = useState([]);

    const { loading, error, clearError, getIssues } = useBoardService();

    const onRequest = async (query) => {
        clearError();

        const { info, issues } = await getIssues(query);

        setColumns(
            columns.map((column, i) => {
                return {
                    ...column,
                    issues: issues[i],
                };
            })
        );

        setInfo(info);
        setIssues(issues);
    };

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
            <IssuesProvider
                // value={{ issues, status: { loading, error, clearError } }}
                value={{
                    columns,
                    setColumns,
                    status: { loading, error, clearError },
                }}
            >
                <Board />
            </IssuesProvider>
        </Container>
    );
};

export default App;
