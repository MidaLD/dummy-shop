import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/shopSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { HiMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";
import { useIsSmallMobile } from "../hooks/useIsSmallMobile";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react"; // eslint-disable-line no-unused-vars
import { useIsMobile } from "../hooks/useIsMobile";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const searchQuery = useSelector((store) => store.shop.searchQuery);
  const isSmallMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  function handleOnChange(e) {
    if (page !== "1") {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }

    if (location.pathname !== "/") navigate("/");

    queryClient.cancelQueries({ queryKey: ["search"] });
    dispatch(setSearchQuery(e.target.value));
  }

  function handleClearSearchQuery() {
    dispatch(setSearchQuery(""));
  }

  function handleOpenSearch() {
    setIsSearchOpen(true);
  }

  return (
    <div className="search-box">
      <HiMagnifyingGlass
        onClick={isSmallMobile ? handleOpenSearch : null}
        className="header-icon header-icon-search"
      />

      {isSmallMobile ? (
        <AnimatePresence mode="wait">
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.2, type: "tween" }}
              className="search-popup-box"
            >
              <div>
                <HiMagnifyingGlass className="header-icon header-icon-search" />
                <input
                  onFocus={handleClearSearchQuery}
                  onChange={handleOnChange}
                  className="search-input"
                  name="search"
                  type="text"
                  placeholder="Search"
                  autoComplete="off"
                  value={searchQuery}
                />

                {searchQuery && (
                  <button
                    className="clear-button"
                    onClick={handleClearSearchQuery}
                  >
                    Clear
                  </button>
                )}
              </div>

              <button onClick={() => setIsSearchOpen(false)}>
                <HiOutlineXMark className="header-icon" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <input
          onFocus={handleClearSearchQuery}
          onChange={handleOnChange}
          className="search-input"
          name="search"
          type="text"
          placeholder="Search"
          autoComplete="off"
          value={searchQuery}
        />
      )}
    </div>
  );
}

export default Search;
