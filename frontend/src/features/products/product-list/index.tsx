import { NavLink } from "react-router";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/dashboard-crud";
import { useProduct } from "@/hooks";

const ProductList = () => {
  const { getList: products } = useProduct();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="dark:text-gray-200">Nombre</TableHead>
          <TableHead className="dark:text-gray-200">Cantidad</TableHead>
          <TableHead className="dark:text-gray-200">Precio venta</TableHead>
          <TableHead className="dark:text-gray-200">Precio compra</TableHead>
          <TableHead className="dark:text-gray-200">Status</TableHead>
          <TableHead className="dark:text-gray-200">Opciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.data.results.map((product) => (
          <TableRow key={product._id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.price.sale}</TableCell>
            <TableCell>{product.price.purchase}</TableCell>
            <TableCell>
              <StatusBadge variant={product.status ? "success" : "danger"}>
                {product.status ? "En venta" : "En borrador"}
              </StatusBadge>
            </TableCell>
            <TableCell>
              <Button variant="ghost">
                <Trash2 />
              </Button>
              <Button variant="ghost">
                <NavLink to={{ pathname: `./${product._id}` }}>
                  <Pencil />
                </NavLink>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductList;
