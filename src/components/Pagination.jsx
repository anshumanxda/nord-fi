import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { setPaging, getPeopleList } from "../redux/reducers/people";
import { peopleSelector } from "../redux/selectors";

const Pagination = ({ ...rest }) => {
  const {
    paging: { currentPage, totalPage },
    requestState,
  } = useSelector(peopleSelector);
  const dispatch = useDispatch();

  const isLoading = requestState === "loading";
  const isNextDisabled = Math.ceil(totalPage / 10) === currentPage;

  const handlePrevious = () => {
    dispatch(setPaging(currentPage - 1));
    dispatch(getPeopleList());
  };
  const handleNext = () => {
    dispatch(setPaging(currentPage + 1));
    dispatch(getPeopleList());
  };

  return (
    <Flex justifyContent="space-between" {...rest}>
      <Button
        colorScheme="facebook"
        isDisabled={currentPage === 1}
        isLoading={isLoading}
        onClick={handlePrevious}
      >
        Previous
      </Button>
      <Button
        colorScheme="facebook"
        onClick={handleNext}
        isDisabled={isNextDisabled}
        isLoading={isLoading}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
