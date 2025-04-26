import {
  Flex,
  Stack,
  SkeletonCircle,
  Skeleton,
  SkeletonText,
  VStack,
  StackSeparator,
  Box,
} from "@chakra-ui/react";

const SkeletonAccountForm = () => {
  return (
    <Stack>
      {/** Upload image */}
      <Stack
        direction={{
          base: "column",
          md: "row",
        }}
        justify="space-between"
        mb={8}
      >
        <Stack
          alignItems={{
            base: "start",
            md: "center",
          }}
          width="xs"
          direction={{
            base: "column",
            md: "row",
          }}
          gap="5"
        >
          <SkeletonCircle size="16" />
          <SkeletonText noOfLines={2} />
        </Stack>
        <Stack
          mt={{
            base: "5",
            md: "0",
          }}
          direction={{
            base: "row",
            md: "row",
          }}
          align={{
            base: "start",
            md: "center",
          }}
        >
          <Skeleton width="120px" height="8" />
          <Skeleton width="120px" height="8" />
        </Stack>
      </Stack>
      <Stack gap={5} separator={<StackSeparator />}>
        <Stack
          direction={{
            base: "column",
            md: "row",
          }}
          gap={5}
        >
          <Skeleton
            flex={{
              base: "none",
              md: "1",
            }}
            height="8"
          />
          <Skeleton
            flex={{
              base: "none",
              md: "1",
            }}
            height="8"
          />
        </Stack>
        <Box width="1/3">
          <SkeletonText noOfLines={2} />
        </Box>
        <Box width="1/2">
          <SkeletonText noOfLines={2} />
        </Box>
        <Stack
          direction={{
            base: "column",
            md: "row",
          }}
          gap={5}
        >
          <Skeleton
            flex={{
              base: "none",
              md: "1",
            }}
            height="8"
          />
          <Skeleton
            flex={{
              base: "none",
              md: "1",
            }}
            height="8"
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export { SkeletonAccountForm };
