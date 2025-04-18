import { usePersistentFile, useDestroyUpload } from "@/hooks/useUpload";
import { Card, CardProgress, CardPicture, CardContent, CardSize } from "./Card";

type Props = {
  id: string;
  tmpId: string;
};

const ExistingCard = ({ id, tmpId }: Props) => {
  const { data } = usePersistentFile(id);
  const fullPath = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/public/images/${data.path}`;

  const { mutate: destroyFile } = useDestroyUpload(tmpId);

  return (
    <Card
      onRemove={() => {
        console.log("removing tmp id: ", tmpId);
        console.log("removing id: ", id);
        destroyFile(id);
      }}
      type="success"
    >
      <CardContent>
        <CardPicture imageUrl={fullPath} />
        <CardSize fileName={data.path} fileSize={data.size} />
      </CardContent>
      <CardProgress progressValue={100} type="success" />
    </Card>
  );
};

export default ExistingCard;
