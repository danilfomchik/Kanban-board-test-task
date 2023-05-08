import { useEffect, useState, createContext, useCallback } from "react";
import { useDispatch } from "react-redux";
import { observer } from "mobx-react-lite";

// import useStore from "./hooks/useStore";
import { useBoardService } from "./services/useBoardService";

import { IssuesProvider } from "./context/IssuesProvider";
import Search from "./components/search/Search";
import Board from "./components/board/Board";

import { Container } from "react-bootstrap";
import "./app.scss";

const App = () => {
    // const { cols } = useStore();

    const [columns, setColumns] = useState([
        { id: 0, title: "ToDo", state: "all", issues: [] },
        { id: 1, title: "In Progress", state: "open", issues: [] },
        { id: 2, title: "Done", state: "closed", issues: [] },
    ]);

    const [info, setInfo] = useState([]);
    const { loading, error, clearError, getIssues } = useBoardService();

    const onRequest = useCallback(async (query) => {
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
    });

    return (
        <Container>
            <Search handleRequest={onRequest} />

            {!loading && !error && info.full_name && (
                <div className="repo-info">
                    <div className="repo-info__path">
                        <a
                            href={`https://github.com/${info.owner}`}
                            target="_blanck"
                        >
                            <span>{info.owner}</span>
                        </a>
                        <span className="delimiter">&gt;</span>
                        <a
                            href={`https://github.com/${info.owner}/${info.repositoryName}`}
                            target="_blanck"
                        >
                            <span>{info.repositoryName}</span>
                        </a>
                    </div>
                    <i className="fas fa-star"></i>
                    <span>{Math.round(info.stars / 1000)}k stars</span>
                </div>
            )}
            <IssuesProvider
                value={{
                    info,
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
// export default observer(App);
