import { SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useSidebar } from "../context";

const SkeletonMenu = () => {
  const { isCollapsed } = useSidebar();
  return (
    <>
      <SkeletonCircle size="10" />
      {isCollapsed && <SkeletonText noOfLines={2} />}
    </>
  );
};

export default SkeletonMenu;
