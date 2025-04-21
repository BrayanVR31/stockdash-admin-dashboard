import { useSupplierList } from "@/hooks/useSupplier";
import {
  Table,
  Row,
  CellPic,
  Cell,
  CellStatus,
  CellDate,
} from "@/components/table";
import headings from "./supplierHeadings";
import { Ellipsis } from "lucide-react";

const SupplierTable = () => {
  const { data } = useSupplierList();
  return (
    <Table
      totalResults={data.total}
      data={data.results}
      colHeadings={headings}
      renderRows={(data) =>
        data.map(({ _id, name, image, contact, deletedAt, createdAt }) => (
          <Row key={_id}>
            <CellPic src={image?.path} title={name} />
            <Cell>{contact?.email || "Sin información"}</Cell>
            <Cell>{contact?.phoneNumber || "Sin información"}</Cell>
            <CellDate date={createdAt} />
            <CellStatus isActive={!!!deletedAt} />
            <Cell>
              <button className="btn btn-sm btn-circle btn-soft btn-primary">
                <Ellipsis className="w-4.5" />
              </button>
            </Cell>
          </Row>
        ))
      }
    />
  );
};

export default SupplierTable;
