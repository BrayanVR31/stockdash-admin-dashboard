import { Box, Center, Spinner, Text } from "@chakra-ui/react";

interface Props {
  message?: string;
}

const LoadingOverlaySpinner = ({ message = "Cargando información" }: Props) => {
  return (
    <Box pos="absolute" inset="0" bg="bg/80">
      <Center h="full">
        <Spinner size="lg" color="purple.500" />
        <Text ml="4" fontSize="md">
          {message}
        </Text>
      </Center>
    </Box>
  );
};

export default LoadingOverlaySpinner;

/*
import { useState } from "react";
import {
  Spinner,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  VStack,
  useColorModeValue,
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
} from "@chakra-ui/react";

// Loading Overlay Component
const LoadingOverlay = ({ isOpen, message = "Procesando..." }) => {
  const spinnerColor = useColorModeValue("blue.500", "blue.200");
  const textColor = useColorModeValue("gray.700", "gray.100");
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Modal
      isOpen={isOpen}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isCentered
      size="xs"
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(2px)" />
      <ModalContent
        bg={bgColor}
        boxShadow="lg"
        borderRadius="lg"
        p={6}
        width="auto"
      >
        <VStack gap={4}>
          <Spinner
            borderWidth="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color={spinnerColor}
            size="xl"
          />
          <Text fontWeight="medium" color={textColor}>
            {message}
          </Text>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

*/
