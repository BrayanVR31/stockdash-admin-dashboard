import { Card, Stat } from "@chakra-ui/react";
import { BsBoxes } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineCategory, MdOutlineFactory } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { PiUsersFour } from "react-icons/pi";

type Props = {
  title: string;
  value: number;
  type: OverviewType;
};

type OverviewType =
  | "products"
  | "sales"
  | "categories"
  | "suppliers"
  | "purchases"
  | "users";
type OverviewMatcher = Record<
  OverviewType,
  {
    icon: IconType;
    unit: string;
    color: string;
  }
>;

const overviewMatch: OverviewMatcher = {
  products: {
    icon: BsBoxes,
    unit: "Uds.",
    color: "blue.fg",
  },
  categories: {
    icon: MdOutlineCategory,
    unit: "tipos",
    color: "pink.fg",
  },
  sales: {
    icon: GiTakeMyMoney,
    unit: "ventas",
    color: "yellow.fg",
  },
  suppliers: {
    icon: MdOutlineFactory,
    unit: "registrados",
    color: "orange.fg",
  },
  purchases: {
    icon: AiOutlineShoppingCart,
    unit: "compras",
    color: "teal.fg",
  },
  users: {
    icon: PiUsersFour,
    unit: "registrados",
    color: "purple.fg",
  },
};

const OverviewCard = ({ title, value, type }: Props) => {
  const Icon = overviewMatch[type].icon;
  const unit = overviewMatch[type].unit;
  return (
    <Card.Root
      variant="subtle"
      borderBottom="lg"
      borderBottomColor={overviewMatch[type].color}
    >
      <Card.Body>
        <Stat.Root>
          <Stat.Label color={overviewMatch[type].color}>
            <Icon /> {title}
          </Stat.Label>
          <Stat.ValueText alignItems="baseline" color="gray.fg">
            {value}
            <Stat.ValueUnit>{unit}</Stat.ValueUnit>
          </Stat.ValueText>
        </Stat.Root>
      </Card.Body>
    </Card.Root>
  );
};

export default OverviewCard;
