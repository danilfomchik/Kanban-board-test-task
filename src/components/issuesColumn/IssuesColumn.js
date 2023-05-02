import React, { useEffect } from "react";
import { Card } from "react-bootstrap";

import { Droppable, Draggable } from "react-beautiful-dnd";

import { useIssuesContext } from "../../context/IssuesProvider";
import { useBoardService } from "../../services/useBoardService";

const IssuesColumn = ({ title, data, column, setColumns }) => {
    // console.log(column.id);

    const {
        status: { loading, error, clearError },
    } = useIssuesContext();

    const errorMessage = error && <h1>Something went wrong!</h1>;
    const loadingMessage = loading && <h1>Loading...</h1>;

    return (
        <div className="issues-column m-2">
            <div className="title">{title}</div>

            {!error && !loading && (
                <Droppable droppableId={`${column.id}`}>
                    {(droppableProvided, droppableSnapshot) => (
                        <div
                            className="issue-card"
                            ref={droppableProvided.innerRef}
                            {...droppableProvided.droppableProps}
                        >
                            {data.map((issue, index) => (
                                <Draggable
                                    key={issue.id}
                                    draggableId={`${issue.id}`}
                                    index={index}
                                >
                                    {(draggableProvided, draggableSnapshot) => (
                                        <div
                                            className="issue-card"
                                            ref={draggableProvided.innerRef}
                                            {...draggableProvided.draggableProps}
                                            {...draggableProvided.dragHandleProps}
                                        >
                                            <Card>
                                                <Card.Body>
                                                    <Card.Title>
                                                        {issue.title}
                                                    </Card.Title>
                                                    <Card.Text className="mb-2">
                                                        <a
                                                            href={
                                                                issue.user_url
                                                            }
                                                            target="_blanck"
                                                        >
                                                            {issue.user_name}
                                                        </a>{" "}
                                                        | Comments:{" "}
                                                        {issue.comments}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            )}

            {errorMessage}
            {loadingMessage}
        </div>
    );
};

export default IssuesColumn;
