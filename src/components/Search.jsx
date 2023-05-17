import React, { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Icon, Input } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import debounce from "../utils/debounce";
import { peopleSelector } from "../redux/selectors";
import {
  setSearch,
  getPeopleList,
  setPaging,
  setSorting,
} from "../redux/reducers/people";

const Search = () => {
  const dispatch = useDispatch();
  const { searchedText } = useSelector(peopleSelector);
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const onInputChange = (e) => {
    dispatch(setSearch(e.target.value));
    debouncedSearchFn();
  };

  const handleSearch = () => {
    dispatch(getPeopleList());
    dispatch(setPaging());
    dispatch(setSorting());
  };

  const debouncedSearchFn = useCallback(debounce(handleSearch), []);

  const clearInput = () => {
    dispatch(setSearch());
    handleSearch();
  };

  return (
    <Box pos="relative" display="inline-block">
      <Input
        ref={ref}
        type="text"
        placeholder="Search"
        width={["100%", "100%", "600px"]}
        my="5"
        h="48px"
        borderColor="blue.700"
        borderWidth="2px"
        value={searchedText}
        onChange={onInputChange}
      />
      {searchedText && (
        <Icon
          as={CloseIcon}
          pos="absolute"
          top="9"
          right="4"
          cursor="pointer"
          onClick={clearInput}
          zIndex={2}
        />
      )}
    </Box>
  );
};

export default Search;
