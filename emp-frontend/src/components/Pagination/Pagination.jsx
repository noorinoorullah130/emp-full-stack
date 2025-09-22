import React from "react";

const Pagination = ({
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    totalItems,
    whichPage,
}) => {
    const totalPages = Math.ceil(totalItems / limit);

    const handleSelectChange = (e) => {
        const newLimit = parseInt(e.target.value, 10);
        setLimit(newLimit);

        // Reset to first page if current page exceeds new total pages
        if (currentPage > Math.ceil(totalItems / newLimit)) {
            setCurrentPage(1);
        }
    };

    const totalRecordsUpToCurrentPage =
        currentPage * limit > totalItems ? totalItems : currentPage * limit;

    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const nextPage = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <footer className="pagination-footer">
            <button onClick={prevPage} disabled={currentPage === 1}>
                Prev
            </button>

            <p>
                Page {currentPage} of {totalPages}
            </p>

            <button onClick={nextPage} disabled={currentPage === totalPages}>
                Next
            </button>

            <select
                className="items-per-page"
                value={limit}
                onChange={handleSelectChange}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>

            <p>
                Total {whichPage}: {totalItems} - ({totalRecordsUpToCurrentPage}{" "}
                of {totalItems})
            </p>
        </footer>
    );
};

export default Pagination;
