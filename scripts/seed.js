db.roles.insertMany([
  {
    name: "admin",
    description:
      "Tiene acceso completo al sistema, incluyendo la administración de usuarios, configuraciones del sistema, gestión de todos los módulos.",
    permissions: {
      users: { "*": true },
      categories: { "*": true },
      suppliers: { "*": true },
      products: { "*": true },
      sales: { "*": true },
      purchases: { "*": true },
      roles: { "*": true },
      "upload-image": { "*": true },
    },
  },
  {
    name: "manager",
    description:
      "Puede gestionar operaciones administrativas como ventas, productos, compras, proveedores pero tiene acceso limitado a las configuraciones del sistema.",
    permissions: {
      sales: { "*": true },
      purchases: { "*": true },
      categories: { "*": true },
      suppliers: { "*": true },
      products: { "*": true },
      "upload-image": { "*": true },
    },
  },
  {
    name: "employee",
    description:
      "Puede visualizar productos, registrar ventas pero no puede modificar todos los módulos principales del sistema (usuarios, proveedores, categorías, etc.).",
    permissions: {
      categories: { view: true },
      products: {
        view: true,
      },
      sales: {
        view: true,
        edit: true,
        create: true,
      },
      "upload-image": { "*": true },
    },
  },
]);
