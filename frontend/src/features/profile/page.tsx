import { CircleUserRound, BookText, Settings } from "lucide-react";
import { NavTabs, Tab, TabContent } from "@/components/ui/nav-tabs";
import { ProfileCover } from "./components";
import { ProfileForm } from "./forms";

function Home() {
  const profileTabs: Tab[] = [
    { label: "Perfil", refId: "profile", icon: <CircleUserRound /> },
    {
      label: "Información personal",
      refId: "personal-info",
      icon: <BookText />,
    },
    {
      label: "Configuraciones del sistema",
      refId: "app-settings",
      icon: <Settings />,
    },
  ];
  return (
    <div>
      <main className="bg-white max-w-screen-lg mx-auto rounded-xl overflow-hidden min-h-screen">
        <ProfileCover />
        <div className="pl-80 pr-20 mt-8">
          <NavTabs tabs={profileTabs} initialTab="profile">
            <TabContent id="profile">
              <div className="mt-8">
                <ProfileForm />
              </div>
            </TabContent>
            <TabContent id="personal-info">Personal info</TabContent>
            <TabContent id="app-settings">General settings</TabContent>
          </NavTabs>
        </div>
      </main>
    </div>
  );
}

export { Home };
