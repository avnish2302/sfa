import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { toast } from "react-toastify";
import {savePromotions} from "../../services/apiPromotions"
import { useMutation } from "@tanstack/react-query";

export default function Promotions({checkinId}) {
  const {register, handleSubmit, reset, formState: { isValid }} = useForm({ mode: "onChange" })

  const promotionsMutation = useMutation({
    mutationFn: savePromotions,
    onSuccess: () => {
      toast.success("Saved successfully!");
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  // Form submit
  const onSubmit = (data) => {
    promotionsMutation.mutate({
      checkinId,
      data
    })
  }


  return (
    <>
      <Card width="100rem">
        <Title>Promotions</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="date"
            {...register("start_date", { required: true })}
            placeholder="From Date"
          />

          <InputField
            type="date"
            {...register("end_date", { required: true })}
            placeholder="To Date"
          />

          <InputField
            {...register("party", { required: true })}
            placeholder="Party"
          />

          <Select {...register("category", { required: true })}>
            <option value="">Select Category</option>
            <option>Beer</option>
            <option>Vodka</option>
            <option>Rum</option>
          </Select>

          <InputField {...register("brand")} placeholder="Brand(s)" />

          <Select {...register("sku", { required: true })}>
            <option value="">Select SKU</option>
            <option>Q</option>
            <option>P</option>
            <option>N</option>
            <option>All</option>
            <option>500</option>
          </Select>

          <Textarea
            {...register("scheme", { required: true })}
            placeholder="Scheme / Promotion"
          />

          <Button
  type="submit"
  variation="primary"
  size="md"
  disabled={!isValid || promotionsMutation.isPending}
  style={{ width: "100%" }}
>
  {promotionsMutation.isPending ? "Saving..." : "Save"}
</Button>
        </Form>
      </Card>
    </>
  );
}


const Title = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-brown-700);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const InputField = styled.input`
  padding: 0.8rem 1.2rem;

  border: 1px solid var(--border-color);
  background-color: var(--bg-main);
`;

const Select = styled.select`
  padding: 0.8rem 1.2rem;

  border: 1px solid var(--border-color);
  background-color: var(--bg-main);
`;

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  
  border: 1px solid var(--border-color);
  background-color: var(--bg-main);
`;
