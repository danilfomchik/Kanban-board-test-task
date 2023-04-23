import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import IssuesColumn from "../issuesColumn/IssuesColumn";

const Board = () => {
    // const allIssues = useSelector((state) => state.issues.allIssues);

    return (
        <Row>
            <Col>
                <IssuesColumn title="ToDo" />
            </Col>
            <Col>
                <IssuesColumn title="In Progress" />
            </Col>
            <Col>
                <IssuesColumn title="Done" />
            </Col>
        </Row>
    );
};

export default Board;
