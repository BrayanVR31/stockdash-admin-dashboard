import InputGroup from "@/components/ui/InputGroup";
import Name from "./Name";
import Lastname from "./Lastname";
import PhoneNumber from "./PhoneNumber";
import HasImage from "./HasImage";
import AvatarImage from "./AvatarImage";

const Profile = () => {
  return (
    <>
      <InputGroup>
        <Name />
        <Lastname />
      </InputGroup>
      <PhoneNumber />
      <HasImage field={<AvatarImage />} />
    </>
  );
};

export default Profile;
