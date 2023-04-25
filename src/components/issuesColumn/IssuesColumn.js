import React from "react";
import { Card } from "react-bootstrap";

import { useBoardService } from "../../services/useBoardService";

const IssuesColumn = ({ title, data, loading, error }) => {
    // const { loading, error, clearError } = useBoardService();

    // console.log(loading, error);

    const renderIssues = (issues) => {
        return issues.map((issue) => {
            return (
                <Card key={issue.id}>
                    <Card.Body>
                        <Card.Title>{issue.title}</Card.Title>
                        <Card.Text className="mb-2">
                            <a href={issue.user_url} target="_blanck">
                                {issue.user_name}
                            </a>{" "}
                            | Comments: {issue.comments}
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        });
    };

    const issues = renderIssues(data);

    const errorMessage = error && <h1>Something went wrong!</h1>;
    const loadingMessage = loading && <h1>Loading...</h1>;

    return (
        <div className="issues-column m-2">
            <div className="title">{title}</div>

            {issues}
            {errorMessage}
            {loadingMessage}
        </div>
    );
};

export default IssuesColumn;
