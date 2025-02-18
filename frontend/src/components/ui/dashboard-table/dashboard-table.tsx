import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  getDeepValues,
  getDeepValueFromObj,
  GenericObject,
} from "@/lib/object";

interface Props<T> {
  objectKeys: string[];
  headerCols: string[];
  data: T;
}

const DashboardTable = <T,>({ objectKeys, headerCols, data }: Props<T[]>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headerCols.map((col) => (
            <TableHead key={col}>{col}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((data) => (
          <TableRow
            key={`header-row-${getDeepValueFromObj(
              data as GenericObject,
              "_id"
            )}`}
          >
            {getDeepValues(data as GenericObject, ...objectKeys).map(
              (item, index) => (
                <TableCell key={`cell-[${index}]-${item}`}>
                  {(item as unknown as string) || "Sin especificar"}
                </TableCell>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export { DashboardTable };
