import SectionField from "@/components/ui/SectionField";
import InputGroup from "@/components/ui/InputGroup";
import Email from "./Email";
import Password from "./Password";
import UserName from "./UserName";
import HasUserName from "./HasUserName";
import HasProfile from "./HasProfile";
import Profile from "./Profile";

const CreatingFields = () => {
  return (
    <>
      <SectionField title="Credenciales de usuario">
        <InputGroup>
          <Email />
          <Password />
        </InputGroup>
        <HasUserName field={<UserName />} />
      </SectionField>
      <SectionField title="Perfil de usuario">
        <HasProfile field={<Profile />} />
      </SectionField>
    </>
  );
};

export default CreatingFields;
