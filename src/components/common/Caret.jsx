import React from "react";
import { Icon } from "@chakra-ui/react";

import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

const Caret = ({ permutation, name, sortValue }) => {
  if (sortValue !== name) return;

  return <Icon as={permutation === "asc" ? AiFillCaretDown : AiFillCaretUp} />;
};

export default Caret;
