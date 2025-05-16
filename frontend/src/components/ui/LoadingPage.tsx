import { Dialog, Portal, ProgressCircle, Text, VStack } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <Dialog.Root defaultOpen size="full" motionPreset="slide-in-bottom">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body display="flex" alignItems="center">
              <VStack
                minH="md"
                flex="1"
                justifyContent="center"
                alignItems="center"
              >
                <ProgressCircle.Root colorPalette="blue" value={null} size="xl">
                  <ProgressCircle.Circle>
                    <ProgressCircle.Track />
                    <ProgressCircle.Range />
                  </ProgressCircle.Circle>
                </ProgressCircle.Root>
                <Text fontWeight="normal" fontSize="md">
                  Cargado página
                </Text>
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default LoadingPage;
