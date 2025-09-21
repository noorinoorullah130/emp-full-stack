import React, { useState } from "react";

const Pagination = ({
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    totalPages,
    totalItems,
}) => {
    const prevPage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const nextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const handleSelectChange = (e) => {
        const { value } = e.target;
        setLimit(value);
    };

    return (
        <footer className="pagination-footer">
            <button onClick={() => prevPage()} disabled={currentPage === 1}>
                Prev
            </button>
            <p>
                Page {currentPage} of {totalPages}
            </p>
            <button
                onClick={() => nextPage()}
                disabled={currentPage === totalPages}
            >
                Next
            </button>

            <select
                className="items-per-page"
                value={limit}
                onChange={(e) => handleSelectChange(e)}
            >
                <option value="5">5</option>
                <option value="10" defaultValue={true}>
                    10
                </option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>

            <p>Total Items: {totalItems}</p>
        </footer>
    );
};

export default Pagination;
