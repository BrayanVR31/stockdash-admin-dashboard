import { Table, Skeleton, Box } from "@chakra-ui/react";

const TableSkeletonLoader = ({ rows = 5, columns = 5 }) => {
  // Column configurations with different widths for visual variety
  const columnWidths = [
    "180px", // Name column - wider
    "100px", // Price column
    "100px", // Price column
    "60px", // Quantity column - narrower
    "120px", // Actions column
  ];

  return (
    <Box
      w="full"
      border="1px"
      borderColor={{
        base: "gray.700",
        _dark: "gray.200",
      }}
      rounded="md"
      mt={4}
    >
      <Table.Root variant="line" rounded="md">
        <Table.Header
          bg={{
            base: "gray.700",
            _dark: "gray.200",
          }}
        >
          <Table.Row>
            {Array(columns)
              .fill(0)
              .map((_, colIndex) => (
                <Table.ColumnHeader key={colIndex}>
                  <Skeleton
                    height="20px"
                    width={columnWidths[colIndex % columnWidths.length]}
                  />
                </Table.ColumnHeader>
              ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Array(rows)
            .fill(0)
            .map((_, rowIndex) => (
              <Table.Row key={rowIndex}>
                {Array(columns)
                  .fill(0)
                  .map((_, colIndex) => (
                    <Table.Cell key={colIndex}>
                      <Skeleton
                        height="20px"
                        width={columnWidths[colIndex % columnWidths.length]}
                        css={{
                          base: {
                            "--start-color": "gray.100",
                            "--end-color": "gray.700",
                          },
                          _dark: {
                            "--start-color": "gray.300",
                            "--end-color": "gray.500",
                          },
                        }}
                      />
                    </Table.Cell>
                  ))}
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default TableSkeletonLoader;
