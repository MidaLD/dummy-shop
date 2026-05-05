import { ReactNode } from "react";

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
      className={`pagination-btn ${active ? "pagination-btn--active" : ""} `}
      disabled={active || disabled}
    >
      {children}
    </button>
  );
}

export default PaginationBtn;
