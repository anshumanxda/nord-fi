import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Heading } from "@chakra-ui/react";

import { peopleSelector } from "../../redux/selectors";
import { getPeopleList } from "../../redux/reducers/people";

import Table from "../../components/Table";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { currentPage, requestState } = useSelector(peopleSelector);

  useEffect(() => {
    //for search
    dispatch(getPeopleList());
  }, []);

  return (
    <Box
      width={["100%", "100%", "1280px"]}
      my="8"
      px={["5", "5", "0"]}
      mx="auto"
    >
      <Heading mb="5" fontSize="5xl" color="blue.700" textDecor="underline">
        STAR WARS
      </Heading>

      <Search />

      <Table />

      <Pagination mt="10" />
    </Box>
  );
};

export default Home;
