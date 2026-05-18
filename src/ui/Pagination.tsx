import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiEllipsisHorizontal,
} from "react-icons/hi2";
import { ReactNode } from "react";
import { useSearchParams } from "react-router";
import { useBreakpoint } from "../features/hooks/useBreakpoint";

type PaginationProps = {
  numPages: number;
};

function Pagination({ numPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });
  const currentPage = Number(searchParams.get("page")) || 1;
  const { md } = useBreakpoint();

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
  const maxVisible = !md ? 5 : 7;
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
    <div className="flex items-center justify-center gap-0.5 py-8">
      <PaginationBtn onClick={handleFirstPage} disabled={currentPage === 1}>
        <HiChevronDoubleLeft className="w-4 h-4" />
      </PaginationBtn>

      <PaginationBtn onClick={handlePrevPage} disabled={currentPage === 1}>
        <HiChevronLeft className="w-4 h-4" />
      </PaginationBtn>

      {startPage > 1 && (
        <span className="inline-flex items-center justify-center w-9 h-9 text-slate-400">
          <HiEllipsisHorizontal className="w-5 h-5" />
        </span>
      )}

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
        <span className="inline-flex items-center justify-center w-9 h-9 text-slate-400">
          <HiEllipsisHorizontal className="w-5 h-5" />
        </span>
      )}

      <PaginationBtn
        onClick={handleNextPage}
        disabled={currentPage === numPages}
      >
        <HiChevronRight className="w-4 h-4" />
      </PaginationBtn>

      <PaginationBtn
        onClick={handleLastPage}
        disabled={currentPage === numPages}
      >
        <HiChevronDoubleRight className="w-4 h-4" />
      </PaginationBtn>
    </div>
  );
}

type PaginationBtnProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: ReactNode;
};

function PaginationBtn({
  children,
  onClick,
  active,
  disabled,
}: PaginationBtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={active || disabled}
      className={[
        "inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium select-none transition-colors duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1",
        active
          ? "bg-slate-700 text-white shadow-sm cursor-default"
          : disabled
            ? "text-slate-300"
            : "text-slate-500 hover:bg-slate-100 cursor-pointer hover:text-slate-800",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default Pagination;
