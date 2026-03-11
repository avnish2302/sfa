import ShopName from "../components/ShopName";
import Button from "../components/Button";
import Card from "../components/Card";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCheckinSummary, checkout } from "../services/apiCheckout";
import useActiveCheckin from "../hooks/useActiveCheckin";

export default function CheckOut() {
  const { checkinId, shopId, clearCheckin } = useActiveCheckin();
  
  const { data: summary, isLoading } = useQuery({
    queryKey: ["checkinSummary", checkinId],
    queryFn: () => getCheckinSummary(checkinId),
    enabled: !!checkinId,
  });

  const checkoutMutation = useMutation({
    mutationFn: () => checkout(checkinId),

    onSuccess: () => {
      clearCheckin();
      toast.success("Checkout successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSave = () => {
    if (!checkinId) {
      toast.error("No active check-in");
      return;
    }

    checkoutMutation.mutate();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Wrapper>
      <Title>Check-Out</Title>

      <ShopName selectedShop={{id : shopId}} disabled />

      <Card width="100rem">
        <Section>
          <h2>Activity Summary</h2>

          <Grid>
            <GridItem>Entered Inventory</GridItem>
            <GridItem>: {summary?.inventoryEntered ?? 0}</GridItem>

            <GridItem>Collected Cash</GridItem>
            <GridItem>: {summary?.cashCollected ?? 0} Rs</GridItem>

            <GridItem>Promotion Given</GridItem>
            <GridItem>:</GridItem>
          </Grid>
        </Section>

        <Section>
          <h2>Pending</h2>
          <p>1. No collections</p>
        </Section>

        <ButtonWrapper>
          <Button
            variation="primary"
            size="md"
            onClick={handleSave}
            disabled={checkoutMutation.isPending}
          >
            {checkoutMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </ButtonWrapper>
      </Card>
    </Wrapper>
  );
}

/* ================= STYLES ================= */

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 1.6rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-brown-700);
`;

const Section = styled.section`
  margin-bottom: 2.4rem;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-brown-700);
    margin-bottom: 1.2rem;
    text-decoration: underline;
  }

  p {
    font-size: 1.8rem;
    color: var(--color-brown-600);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1rem;
`;

const GridItem = styled.div`
  font-size: 1.8rem;
  color: var(--color-brown-600);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
