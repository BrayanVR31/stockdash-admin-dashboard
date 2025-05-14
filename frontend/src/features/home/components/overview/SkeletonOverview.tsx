import { Card, SkeletonText } from "@chakra-ui/react";

const SkeletonOverview = () => {
  return (
    <Card.Root>
      <Card.Body>
        <SkeletonText noOfLines={3} />
      </Card.Body>
    </Card.Root>
  );
};

export { SkeletonOverview };
