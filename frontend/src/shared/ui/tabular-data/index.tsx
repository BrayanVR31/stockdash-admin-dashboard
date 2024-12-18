import {
  TableRoot,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@shared/ui";

// Types
interface Props<DataType> {
  dataRows: DataType[]; // Array of body cells
  objectKeysRows: string[]; // Object keys in each object iteration
  headingRows: string[]; // Array of heading cells name
}

export function TabularData<Data>({
  headingRows,
  dataRows,
  objectKeysRows,
}: Props<Data>) {
  
  return (
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            {headingRows.map((index, heading) => (
              <TableHeaderCell key={`head-cell-${index}`}>
                {heading}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(dataRows as Object[]).map((index, row) => (
            <TableRow>
              <TableCell>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
}
