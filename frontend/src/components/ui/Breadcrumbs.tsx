import { Breadcrumb, HStack } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router";
import { Fragment, JSX } from "react";
import { TbHome } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { HiMiniSlash } from "react-icons/hi2";

const matchIcon: Record<string, JSX.Element> = {
  dashboard: <TbHome />,
  account: <FaRegUser />,
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnames = pathname.split("/").filter((path) => path);
  console.log(pathnames);
  return (
    <>
      <Breadcrumb.Root size="md">
        <Breadcrumb.List>
          {pathnames.map((pathname, index) => {
            const routePath = `/${pathnames.slice(0, index + 1).join("/")}`;
            return (
              <Fragment key={pathname}>
                <Breadcrumb.Item>
                  <Breadcrumb.Link
                    color={{
                      _dark: "colorPalette.100/70",
                      _light: "colorPalette.700",
                    }}
                    _hover={{
                      color: {
                        _dark: "colorPalette.200",
                        _light: "colorPalette.700/70",
                      },
                    }}
                    textTransform="capitalize"
                    asChild
                  >
                    <NavLink to={routePath}>
                      {matchIcon[pathname]}
                      {pathname}
                    </NavLink>
                  </Breadcrumb.Link>
                </Breadcrumb.Item>
                {index + 1 !== pathnames.length && (
                  <Breadcrumb.Separator>
                    <HiMiniSlash />
                  </Breadcrumb.Separator>
                )}
              </Fragment>
            );
          })}
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </>
  );
};

export default Breadcrumbs;
