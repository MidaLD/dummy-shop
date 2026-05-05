import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiEllipsisHorizontal,
} from "react-icons/hi2";
import { useSearchParams } from "react-router";
import PaginationBtn from "./PaginationBtn";
import { useIsMobile } from "../features/hooks/useIsMobile";

type PaginationProps = {
  numPages: number;
};

function Pagination({ numPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const currentPage = Number(searchParams.get("page")) || 1;
  const isMobile = useIsMobile();

  function handlePageChange(newPage: string) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", newPage);
      return params;
    });
  }

  function handlePrevPage() {
    if (currentPage > 1) handlePageChange((currentPage - 1).toString());
  }

  function handleNextPage() {
    if (currentPage < numPages) handlePageChange((currentPage + 1).toString());
  }

  function handleFirstPage() {
    if (currentPage > 1) handlePageChange("1");
  }

  function handleLastPage() {
    if (currentPage < numPages) handlePageChange(numPages.toString());
  }

  const pageNumbers = [];
  const maxVisible = isMobile ? 5 : 7;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 1;

  if (endPage > numPages) {
    endPage = numPages;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <PaginationBtn onClick={handleFirstPage} disabled={currentPage === 1}>
        <HiChevronDoubleLeft />
      </PaginationBtn>

      <PaginationBtn onClick={handlePrevPage} disabled={currentPage === 1}>
        <HiChevronLeft />
      </PaginationBtn>

      {startPage > 1 && <HiEllipsisHorizontal className="pagination-dots" />}

      {pageNumbers.map((page) => (
        <PaginationBtn
          key={page}
          onClick={() => handlePageChange(String(page))}
          active={page === currentPage}
        >
          {page}
        </PaginationBtn>
      ))}

      {endPage < numPages && (
        <HiEllipsisHorizontal className="pagination-dots" />
      )}

      <PaginationBtn
        onClick={handleNextPage}
        disabled={currentPage === numPages}
      >
        <HiChevronRight />
      </PaginationBtn>

      <PaginationBtn
        onClick={handleLastPage}
        disabled={currentPage === numPages}
      >
        <HiChevronDoubleRight />
      </PaginationBtn>
    </div>
  );
}

export default Pagination;
