import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import IssuesColumn from "../issuesColumn/IssuesColumn";

const Board = () => {
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
