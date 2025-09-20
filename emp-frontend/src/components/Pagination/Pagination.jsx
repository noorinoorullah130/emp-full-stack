import React from "react";

const Pagination = () => {
    return (
        <footer className="pagination-footer">
            <button>Prev</button>
            <p>Page 1 of 10</p>
            <button>Next</button>

            <select className="items-per-page">
                <option value="" disabled>
                    10
                </option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </footer>
    );
};

export default Pagination;
