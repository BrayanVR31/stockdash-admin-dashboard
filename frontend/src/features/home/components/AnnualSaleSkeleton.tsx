import { Card, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const AnnualSaleSkeleton = () => {
  return (
    <Card.Root h="full">
      <Card.Body justifyContent="center">
        <SkeletonText noOfLines={12} />
      </Card.Body>
    </Card.Root>
  );
};

export default AnnualSaleSkeleton;
