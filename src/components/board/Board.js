import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

import { reorderColumnList, changeIssuesState } from "../../helpers/helpers";

import { useIssuesContext } from "../../context/IssuesProvider";
import { IssuesContext } from "../../App";
import { useBoardService } from "../../services/useBoardService";

import IssuesColumn from "../issuesColumn/IssuesColumn";

import "./board.scss";

const Board = () => {
    const {
        columns,
        setColumns,
        status: { error },
    } = useIssuesContext();

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
            const newIssues = reorderColumnList(
                sourceCol.issues,
                source.index,
                destination.index
            );

            setColumns((prevCols) =>
                prevCols.map((column, i) => {
                    return column.id === sourceCol.id
                        ? { ...column, issues: newIssues }
                        : column;
                })
            );

            return;
        }

        // If the user moves from one column to another
        const [removed] = sourceCol.issues.splice(source.index, 1);
        destinationCol.issues.splice(
            destination.index,
            0,
            changeIssuesState(removed, destinationCol.state)
        );

        setColumns((prevCols) =>
            prevCols.map((column, i) => {
                if (column.id === sourceCol.id) {
                    return { ...column, issues: sourceCol.issues };
                } else if (column.id === destinationCol.id) {
                    return { ...column, issues: destinationCol.issues };
                } else {
                    return column;
                }
            })
        );
    };

    const errorMessage = error && (
        <h4 style={{ color: "red", padding: "0px" }}>Incorrect URL!</h4>
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Row className="board">
                {errorMessage}
                {columns.map((column) => {
                    return (
                        <Col key={column.id}>
                            <IssuesColumn
                                title={column.title}
                                data={column.issues}
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
