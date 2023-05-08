import React, { memo } from "react";
import { Button } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import "./search.scss";

const Search = memo(({ query, setQuery, handleRequest }) => {
    return (
        <div className="search">
            <Formik
                initialValues={{
                    search: "",
                    // search: "https://github.com/facebook/react",
                }}
                validationSchema={yup.object({
                    search: yup.mixed().required("Required field!"),
                })}
                onSubmit={(values) => {
                    handleRequest(values.search);
                }}
            >
                <Form className="search-form">
                    <div className="search-form__group">
                        <Field
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Enter repo URL"
                            className="search-form__input"
                        />

                        <Button
                            className="search-form__btn"
                            type="submit"
                            variant="light"
                        >
                            Load issues
                        </Button>
                    </div>

                    <ErrorMessage name="search">
                        {(msg) => (
                            <div className="search-form__error">{msg}</div>
                        )}
                    </ErrorMessage>
                </Form>
            </Formik>
        </div>
    );
});

export default Search;
