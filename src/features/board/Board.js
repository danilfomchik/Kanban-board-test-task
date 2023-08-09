import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

import { reorderIssues, moveIssue } from "./issuesSlice";

import { onReorderColumnIssues, onMoveIssues } from "./helpers";

import IssuesColumn from "../issuesColumn/IssuesColumn";

import "./board.scss";

const Board = () => {
    const issuesLoadingStatus = useSelector(
        (state) => state.issues.issuesLoadingStatus
    );
    const columns = useSelector((state) => state.issues.columns);

    const dispatch = useDispatch();

    const onDragEnd = (result) => {
        const { destination, source } = result;

        // If user tries to drop in an unknown destination
        if (!destination) return;

        // if the user drags and drops back in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // If the user drops within the same column but in a different position
        const sourceCol = columns[source.droppableId];
        const destinationCol = columns[destination.droppableId];

        if (sourceCol.id === destinationCol.id) {
            const reorderedIssues = onReorderColumnIssues(
                sourceCol,
                source.index,
                destination.index
            );

            dispatch(reorderIssues({ sourceCol, reorderedIssues }));

            return;
        } else {
            // If the user moves from one column to another
            const { newSourceCol, newDestinationCol } = onMoveIssues(
                sourceCol,
                source,
                destinationCol,
                destination
            );

            dispatch(
                moveIssue({
                    newSourceCol,
                    newDestinationCol,
                })
            );

            return;
        }
    };

    const errorMessage = issuesLoadingStatus === "error" && (
        <h4 style={{ color: "red", padding: "0px 5px 15px", margin: 0 }}>
            Incorrect URL!
        </h4>
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {errorMessage}
            <Row className="board">
                {columns.map((column) => {
                    return (
                        <Col key={column.id}>
                            <IssuesColumn
                                title={column.title}
                                issues={column.issues}
                                column={column}
                            />
                        </Col>
                    );
                })}
            </Row>
        </DragDropContext>
    );
};

export default Board;
