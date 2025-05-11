import { useParams } from "react-router";
import { Stack } from "@chakra-ui/react";
import { useGetUser } from "@/hooks/useUser";
import PersonalInfo from "@/features/Account/components/form/PersonalInfo";

const EditingFields = () => {
  const params = useParams();
  const { data } = useGetUser(params);
  return (
    <Stack
      direction={{
        base: "column",
        md: "row",
      }}
      gap="6"
    >
      <PersonalInfo />
    </Stack>
  );
};

export default EditingFields;
