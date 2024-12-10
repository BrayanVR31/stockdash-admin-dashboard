import {
  TableRoot,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@shared/ui";

export function Home() {
  return (
    <>
      <ProductList />
    </>
  );
}

function ProductList() {
  const products = [
    { id: 1, name: "Producto 01", price: 200, quantity: 100 },
    { id: 2, name: "Producto 02", price: 200, quantity: 100 },
  ];

  return (
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Precio</TableHeaderCell>
            <TableHeaderCell>Cantidad</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
}
