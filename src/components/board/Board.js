import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import { useIssuesContext } from "../../context/IssuesProvider";
import { IssuesContext } from "../../App";
import { useBoardService } from "../../services/useBoardService";

import IssuesColumn from "../issuesColumn/IssuesColumn";

const Board = () => {
    // const allIssues = useSelector((state) => state.issues.allIssues);
    const { allIssues, openIssues, closedIssues } = useIssuesContext();
    const { loading, error, clearError } = useBoardService();

    console.log("allIssues-->", allIssues);
    console.log("openIssues-->", openIssues);
    console.log("closedIssues-->", closedIssues);

    return (
        <Row>
            <Col>
                <IssuesColumn
                    title="ToDo"
                    loading={loading}
                    error={error}
                    data={allIssues}
                />
            </Col>
            <Col>
                <IssuesColumn
                    title="In Progress"
                    loading={loading}
                    error={error}
                    data={openIssues}
                />
            </Col>
            <Col>
                <IssuesColumn
                    title="Done"
                    loading={loading}
                    error={error}
                    data={closedIssues}
                />
            </Col>
        </Row>
    );
};

export default Board;
