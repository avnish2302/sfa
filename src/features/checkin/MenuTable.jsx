import styled from "styled-components";
import Table from "../../components/Table"; // Importing the existing Table component
import Button from "../../components/Button";

export default function MenuTable({rows, setRows, fileKey}) {

const formatPrice = (value) => value.replace(/[^0-9.]/g, "");

const updateRow = (index, key, value) => {
const copy = [...rows];

if (key === "price") value = formatPrice(value);

copy[index][key] = value;
setRows(copy);

};

const deleteRow = (index) =>
setRows(rows.filter((_, i) => i !== index));

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Cell>Category</Table.Cell>
          <Table.Cell>Product</Table.Cell>
          <Table.Cell>Price</Table.Cell>
          <Table.Cell>Image</Table.Cell>
          <Table.Cell>Action</Table.Cell>
        </Table.Header>

        <Table.Body
          data={rows}
          render={(row, i) => (
            <Table.Row key={i}>
              <Table.Cell>
                <Table.Input
                  value={row.category}
                  onChange={(e) => updateRow(i, "category", e.target.value)}
                />
              </Table.Cell>

              <Table.Cell>
                <Table.Input
                  value={row.product}
                  onChange={(e) => updateRow(i, "product", e.target.value)}
                />
              </Table.Cell>

              <Table.Cell>
                <Table.Input
                  value={row.price}
                  placeholder="₹"
                  onChange={(e) => updateRow(i, "price", e.target.value)}
                />
              </Table.Cell>

              <Table.Cell>
                <FileUploadWrapper>
                  {!row.image ? (
                    <FileButton>
                      Choose File
                      <Table.HiddenInput
                      key={fileKey}
                        type="file"
                        onChange={(e) =>
                          updateRow(i, "image", e.target.files[0])
                        }
                      />
                    </FileButton>
                  ) : (
                    <FileInfo>
                      <FileName>{row.image.name}</FileName>

                      <Table.ChangeLabel>
                        Change
                        <Table.HiddenInput
                          type="file"
                          onChange={(e) =>
                            updateRow(i, "image", e.target.files[0])
                          }
                        />
                      </Table.ChangeLabel>
                    </FileInfo>
                  )}
                </FileUploadWrapper>
              </Table.Cell>

              <Table.Cell>
                <Button variation="delete" onClick={() => deleteRow(i)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          )}
        />
      </Table>
    </>
  );
}

/* Styled Components for File Upload */
const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`;

const FileButton = styled.label`
  cursor: pointer;
  background-color: var(--color-grey-200);
  padding: 0.4rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 1.2rem;

  &:hover {
    background-color: var(--color-grey-300);
  }
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
`;

const FileName = styled.span`
  font-size: 1.2rem;
  word-break: break-word;
`;