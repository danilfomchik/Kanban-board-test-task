import { Container } from "react-bootstrap";

import Search from "./features/search/Search";
import Board from "./features/board/Board";
import RepoInfo from "./features/repoInfo/RepoInfo";

import "./app.scss";

const App = () => {
    const defaultColumns = [
        { id: 0, title: "ToDo", state: "all", issues: [] },
        { id: 1, title: "In Progress", state: "open", issues: [] },
        { id: 2, title: "Done", state: "closed", issues: [] },
    ];

    return (
        <Container>
            <Search defaultColumns={defaultColumns} />
            <RepoInfo />

            <Board />
        </Container>
    );
};

export default App;
