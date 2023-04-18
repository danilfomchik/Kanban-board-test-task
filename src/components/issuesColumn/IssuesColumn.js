import React from "react";
import { Card } from "react-bootstrap";

const IssuesColumn = ({ title, issues }) => {
    return (
        <div className="issues-column m-2">
            <div className="title">{title}</div>

            <Card>
                <Card.Body>
                    <Card.Title>Some issue title</Card.Title>
                    <Card.Text className="mb-2">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>Some issue title</Card.Title>
                    <Card.Text className="mb-2">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Card.Title>Some issue title</Card.Title>
                    <Card.Text className="mb-2">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default IssuesColumn;
