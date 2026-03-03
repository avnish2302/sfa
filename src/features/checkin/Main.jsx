import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Card from "../../components/Card";
import styled from "styled-components";
import { toast } from "react-toastify";

export default function Main() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const notListed = watch("notListed");

  const onSubmit = () => {
    toast.success("Saved successfully!");
    //console.log("saved");
  };

  return (
    <div>
      <Gap/>
      <Card width="100rem">
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* ---------------- NOT LISTED ---------------- */}
          <CheckboxWrapper>
            <Label>Not listed above</Label>
            <input type="checkbox" {...register("notListed")} />
          </CheckboxWrapper>

          {/* ---------------- CONDITIONAL FIELDS ---------------- */}
          {notListed && (
            <>
              <Select {...register("licenseType", { required: true })}>
                <option value="">License Type</option>
                <option>Outlet</option>
                <option>Wholesale (L1)</option>
                <option>Bond</option>
                <option>Other</option>
              </Select>

              <Select {...register("channel", { required: true })}>
                <option value="">Channel</option>
                <option>On-Trade</option>
                <option>Off-Trade</option>
                <option>Others</option>
              </Select>

              <Select {...register("area", { required: true })}>
                <option value="">Area</option>
                <option>North</option>
                <option>District</option>
                <option>Cluster</option>
              </Select>

              <Input
                placeholder="Licensee Name"
                {...register("licenseeName", {
                  required: true,
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only letters allowed",
                  },
                })}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                }}
              />
            </>
          )}

          {/* ---------------- SAVE BUTTON ---------------- */}
          <ButtonWrapper>
            <Button type="submit" variant="primary" size="md" disabled={!isValid}>
              Save
            </Button>
          </ButtonWrapper>
        </Form>
      </Card>
    </div>
  );
}

/* Styled Components */


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const Select = styled.select`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-main);
`;

const Input = styled.input`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-main);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Gap = styled.div`
margin-bottom : 110px;

`