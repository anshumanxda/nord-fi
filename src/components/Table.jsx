import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Table as CTable,
  Tbody,
  Td,
  Thead,
  Tr,
  Spinner,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { AiFillAndroid, AiFillQuestionCircle } from "react-icons/ai";
import { HiUser } from "react-icons/hi";

import ExternalLink from "./common/ExternalLink";
import Th from "./common/Th";

import { peopleSelector } from "../redux/selectors";

const Table = () => {
  const { data, requestState } = useSelector(peopleSelector);
  const isLoading = requestState === "loading";

  if (requestState === "error")
    return (
      <Flex justifyContent="center" alignItems="center" h="60vh">
        Something went wrong
      </Flex>
    );

  return (
    <Box
      width={["100%", "100%", "1280px"]}
      overflowX="auto"
      overflowY="auto"
      h="60vh"
      justifyContent="center"
      alignItems="center"
      display={isLoading || !data?.length ? "flex" : "block"}
    >
      {isLoading ? (
        <Spinner size="xl" color="blue.700" />
      ) : !data?.length ? (
        <Flex alignItems="center" flexDir="column">
          <Icon
            as={WarningTwoIcon}
            width="30px"
            height="30px"
            color="yellow.400"
          />
          <Text mt="2">No result found</Text>
        </Flex>
      ) : (
        <CTable variant="striped">
          <Thead position="sticky" top="0" bg="white">
            <Tr>
              <Th>S. No.</Th>
              <Th name="name">Name</Th>
              <Th name="height">Height</Th>
              <Th name="mass">Mass</Th>
              <Th name="hair_color">Hair Color</Th>
              <Th name="skin_color">Skin Color</Th>
              <Th name="eye_color">Eye Color</Th>
              <Th name="birth_year">BirTh Year</Th>
              <Th name="gender">Gender</Th>
              <Th name="homeworld">Homeworld</Th>
              <Th>Films</Th>
              <Th>Species</Th>
              <Th>Vehicle</Th>
              <Th>Starships</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item, index) => {
              const currentSpecies = item.species?.[0]
                ?.split("/species/")[1]
                ?.split("/")[0];

              return (
                <Tr key={item.created} whiteSpace="nowrap">
                  <Td>{index + 1}</Td>
                  <Td>
                    {item.name}
                    <Icon
                      as={
                        currentSpecies === "1"
                          ? HiUser
                          : currentSpecies === "2"
                          ? AiFillAndroid
                          : AiFillQuestionCircle
                      }
                      ml="2"
                      color={
                        currentSpecies === "1"
                          ? "black"
                          : currentSpecies === "2"
                          ? "green"
                          : "yellow.400"
                      }
                    />
                  </Td>
                  <Td>{item.height}</Td>
                  <Td>{item.mass}</Td>
                  <Td>{item.hair_color}</Td>
                  <Td>{item.skin_color}</Td>
                  <Td>{item.eye_color}</Td>
                  <Td>{item.birth_year}</Td> <Td>{item.gender}</Td>
                  <Td>
                    <ExternalLink href={item.homeworld}>
                      {item.homeworld}
                    </ExternalLink>
                  </Td>
                  <Td>
                    {!item.films.length && "N/A"}
                    <ol>
                      {item.films?.map((film) => (
                        <li key={item.created + film}>
                          <ExternalLink href={film}>{film}</ExternalLink>
                        </li>
                      ))}
                    </ol>
                  </Td>
                  <Td>
                    {!item.species.length && "N/A"}
                    {item.species?.map((species) => (
                      <ExternalLink key={item.created + species} href={species}>
                        {species}
                      </ExternalLink>
                    ))}
                  </Td>
                  <Td>
                    {!item.vehicles.length && "N/A"}
                    <ol>
                      {item.vehicles?.map((vehicle) => (
                        <li key={item.created + vehicle}>
                          <ExternalLink href={vehicle}>{vehicle}</ExternalLink>
                        </li>
                      ))}
                    </ol>
                  </Td>
                  <Td>
                    {!item.starships.length && "N/A"}
                    <ol>
                      {item.starships?.map((starships) => (
                        <li key={item.created + starships}>
                          <ExternalLink href={starships}>
                            {starships}
                          </ExternalLink>
                        </li>
                      ))}
                    </ol>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </CTable>
      )}
    </Box>
  );
};

export default Table;
