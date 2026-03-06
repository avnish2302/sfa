import Button from "../../components/Button";
import Table from "../../components/Table";

export default function RecordInventoryCompetitorTable({ rows, setRows }) {
  const emptyRow = {
    category: "",
    product: "",
    sku: "",
    caseQty: "",
    bottleQty: "",
  };


  const handleChange = (i, key, value) => {
    const copy = [...rows];

    if (key === "caseQty" || key === "bottleQty") {
      copy[i][key] = value === "" ? "" : Number(value);
    } else {
      copy[i][key] = value;
    }

    setRows(copy);
  };

  const deleteRow = (i) => {
    setRows(rows.filter((_, idx) => idx !== i));
  };

  return (
    <Table>
      <Table.Header>
        <Table.Cell>Category</Table.Cell>
        <Table.Cell>Product</Table.Cell>
        <Table.Cell>SKU</Table.Cell>
        <Table.Cell>Case (Qty)</Table.Cell>
        <Table.Cell>Bottle (Qty)</Table.Cell>
        <Table.Cell>Action</Table.Cell>
      </Table.Header>

      <Table.Body
        data={rows}
        render={(row, i) => (
          <Table.Row key={i}>
            {Object.keys(emptyRow).map((key) => (
              <Table.Cell key={key}>
                <Table.Input
                  type={
                    key === "caseQty" || key === "bottleQty" ? "number" : "text"
                  }
                  value={row[key]}
                  onChange={(e) => handleChange(i, key, e.target.value)}
                />
              </Table.Cell>
            ))}

            <Table.Cell>
              <Button variation="delete" onClick={() => deleteRow(i)}>
                Delete
              </Button>
            </Table.Cell>
          </Table.Row>
        )}
      />
    </Table>
  );
}
