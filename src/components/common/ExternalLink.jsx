import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link, Flex } from "@chakra-ui/react";

const ExternalLink = ({ href, children }) => {
  return (
    <Link href={href} isExternal>
      <Flex gap="1">
        {children} <ExternalLinkIcon />
      </Flex>
    </Link>
  );
};

export default ExternalLink;
