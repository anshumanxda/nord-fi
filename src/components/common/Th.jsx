import React from "react";
import { Th as CTh } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

import Caret from "./Caret";

import { peopleSelector } from "../../redux/selectors";
import { setSorting } from "../../redux/reducers/people";

const Th = ({ children, name = "" }) => {
  const dispatch = useDispatch();
  const {
    sorting: { sortBy, permutation },
  } = useSelector(peopleSelector);

  const handleSort = (e) => {
    if (name) {
      const sortBy = e.currentTarget.dataset.sort_by;
      dispatch(
        setSorting({
          sortBy,
          permutation: permutation === "asc" ? "desc" : "asc",
        })
      );
    }
  };

  return (
    <CTh
      data-sort_by={name}
      onClick={handleSort}
      whiteSpace="nowrap"
      cursor={name ? "pointer" : "default"}
      userSelect="none"
    >
      {children}
      <Caret name={name} sortValue={sortBy} permutation={permutation} />
    </CTh>
  );
};

export default Th;
