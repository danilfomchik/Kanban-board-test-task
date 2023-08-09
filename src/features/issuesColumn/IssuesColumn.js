import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

import { Droppable, Draggable } from "react-beautiful-dnd";

import "./issue-column.scss";

const IssuesColumn = ({ title, issues, column }) => {
    const issuesLoadingStatus = useSelector(
        (state) => state.issues.issuesLoadingStatus
    );

    const loadingMessage = issuesLoadingStatus === "loading" && (
        <h1>Loading...</h1>
    );

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

                        {issuesLoadingStatus === "idle" &&
                            issues.map((issue, index) => (
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
                                                        {issue.created_at}
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
