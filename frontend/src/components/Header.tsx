import { NavLink } from "react-router";
import { ReactNode } from "react";
import { House, FolderClosed, FolderPlus } from "lucide-react";
import { useSplitRoute } from "@/hooks/useSplitRoute";
import { useSystemStore } from "@/store/systemStore";

interface Props {
  title: string;
  description?: string;
  leftSide: ReactNode;
}

const Header = ({ title, leftSide, description = "" }: Props) => {
  const { joined, splitted } = useSplitRoute();
  const pageTitle = useSystemStore((state) => state.pageTitle);
  return (
    <div>
      {/** Route tree links */}
      <div className="breadcrumbs text-sm mb-4">
        <ul>
          <li>
            <NavLink to="/dashboard">
              <House className="w-4" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/dashboard/${splitted?.[0]}`}>
              <FolderClosed className="w-4" />
              <span>{pageTitle}</span>
            </NavLink>
          </li>
          {joined.includes("form") && (
            <li>
              <NavLink to={`/dashboard/${splitted?.[0]}/form`}>
                <FolderPlus className="w-4" />
                <span>Crear</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      {/** Header dashboard page */}
      <div className="flex items-end justify-between">
        <h4 className="text-2xl font-bold">{title}</h4>
        <div>{leftSide}</div>
      </div>
      <p className="text-sm text-base-content my-4 mb-10">{description}</p>
    </div>
  );
};

export default Header;
