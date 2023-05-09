import React, { useEffect } from "react";
import { Card } from "react-bootstrap";

import { Droppable, Draggable } from "react-beautiful-dnd";

import { getOpenDate } from "../../helpers/helpers";
import { useIssuesContext } from "../../context/IssuesProvider";
import { useBoardService } from "../../services/useBoardService";

import "./issue-column.scss";

const IssuesColumn = ({ title, data, column }) => {
    const {
        status: { loading, error },
    } = useIssuesContext();

    const loadingMessage = loading && <h1>Loading...</h1>;

    return (
        <div className="issues-column">
            <h4 className="title">{title}</h4>

            <Droppable droppableId={`${column.id}`}>
                {(droppableProvided, droppableSnapshot) => (
                    <div
                        className="issue-cards"
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                    >
                        {loadingMessage}

                        {!error &&
                            !loading &&
                            data.map((issue, index) => (
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
                                                    <Card.Text>
                                                        #{issue.number}
                                                        {getOpenDate(
                                                            issue.created_at
                                                        )}
                                                    </Card.Text>
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
        </div>
    );
};

export default IssuesColumn;
