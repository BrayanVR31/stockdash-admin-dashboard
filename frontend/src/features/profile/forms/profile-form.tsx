import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks";

function ProfileForm() {
  const profile = useAppSelector((state) => state.profile);
  console.log({ profile });
  return (
    <form>
      <div className="mb-6 flex gap-x-8">
        {/** Email */}
        <div className="flex-1">
          <label className="block mb-2 text-neutral-600" htmlFor="email">
            Email
          </label>
          <Input id="email" />
        </div>
        {/** Username */}
        <div className="flex-1">
          <label className="block mb-2 text-neutral-600" htmlFor="username">
            Nombre de usuario
          </label>
          <Input id="username" />
        </div>
      </div>
    </form>
  );
}

export { ProfileForm };
