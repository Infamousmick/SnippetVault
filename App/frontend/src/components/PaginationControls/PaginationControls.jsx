import { useContext } from "react";
import MyButton from "../MyButton/MyButton";
import { SnippetContext } from "../../context/SnippetContext/SnippetContext";

const PaginationControls = () => {
  const { page, totalPages, setPage } = useContext(SnippetContext);
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-4">
      <MyButton
        onClick={handlePrevPage}
        disabled={page === 1}
        className="pagination-btn"
      >
        Previous
      </MyButton>

      <span className="text-secondary small">
        Page {page} of {totalPages}
      </span>

      <MyButton
        onClick={handleNextPage}
        disabled={page >= totalPages}
        className="pagination-btn"
      >
        Next
      </MyButton>
    </div>
  );
};

export default PaginationControls;
