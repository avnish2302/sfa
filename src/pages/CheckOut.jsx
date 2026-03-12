import ShopName from "../components/ShopName";
import Button from "../components/Button";
import Card from "../components/Card";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCheckinSummary, checkout } from "../services/apiCheckout";
import useActiveCheckin from "../hooks/useActiveCheckin";
import { getPromotions } from "../services/apiPromotions";
import { useState } from "react";
import Modal from "../components/Modal";
import { getOwnInventory } from "../services/apiInventory";
import { getCollection } from "../services/apiCollection";

export default function CheckOut() {
  const { checkinId, shopId, clearCheckin } = useActiveCheckin();
  const [showPromotion, setShowPromotion] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showCollection, setShowCollection] = useState(false);

  const { data: summary, isLoading } = useQuery({
    queryKey: ["checkinSummary", checkinId],
    queryFn: () => getCheckinSummary(checkinId),
    enabled: !!checkinId,
  });

  const { data: promotions = [] } = useQuery({
    queryKey: ["promotions", checkinId],
    queryFn: () => getPromotions(checkinId),
    enabled: showPromotion && !!checkinId,
  });

  const { data: inventory = [] } = useQuery({
    queryKey: ["inventory", checkinId],
    queryFn: () => getOwnInventory(checkinId),
    enabled: showInventory && !!checkinId,
  });

  const { data: collection = [] } = useQuery({
    queryKey: ["collection", checkinId],
    queryFn: () => getCollection(checkinId),
    enabled: showCollection && !!checkinId,
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
    <>
      <Wrapper>
        <Title>Check-Out</Title>

        <ShopName selectedShop={{ id: shopId }} disabled />

        <Card width="100rem">
          <Section>
            <h2>Activity Summary</h2>

            <Grid>
              <GridItem>Entered Inventory</GridItem>
              <GridItem>
                :{" "}
                <ViewLink onClick={() => setShowInventory(true)}>
                  Click to view Inventory (Own)
                </ViewLink>
              </GridItem>

              <GridItem>Collected Cash</GridItem>
              <GridItem>
                :{" "}
                <ViewLink onClick={() => setShowCollection(true)}>
                  Click to view collection
                </ViewLink>
              </GridItem>

              <GridItem>Promotion Given</GridItem>
              <GridItem>
                :{" "}
                <ViewLink onClick={() => setShowPromotion(true)}>
                  Click to view promotion
                </ViewLink>
              </GridItem>
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

      {showPromotion && (
        <Modal
          title="Promotions"
          onClose={() => setShowPromotion(false)}
          data={
            promotions.length
              ? {
                  Party: promotions[0].party,
                  Category: promotions[0].category,
                  Brand: promotions[0].brand,
                  SKU: promotions[0].sku,
                  From: new Date(promotions[0].start_date).toLocaleDateString(),
                  To: new Date(promotions[0].end_date).toLocaleDateString(),
                  Scheme: promotions[0].scheme,
                }
              : { Info: "No Info" }
          }
        />
      )}
      {showInventory && (
        <Modal
          title="Entered Inventory"
          onClose={() => setShowInventory(false)}
          data={
            inventory.length
              ? inventory.reduce((acc, i) => {
                  acc[`${i.product_name} - Receipt`] = i.receipt;
                  acc[`${i.product_name} - Cases Warm`] = i.cases_warm;
                  acc[`${i.product_name} - Cases Cold`] = i.cases_cold;
                  acc[`${i.product_name} - Bottles Warm`] = i.bottles_warm;
                  acc[`${i.product_name} - Bottles Cold`] = i.bottles_cold;
                  return acc;
                }, {})
              : { Info: "No Info" }
          }
        />
      )}
      {showCollection && (
        <Modal
          title="Collections"
          onClose={() => setShowCollection(false)}
          data={
            collection.length
              ? {
                  Invoice: collection[0].invoice_no,
                  Remarks: collection[0].remark,
                  "Payment Mode": collection[0].payment_mode,
                  Amount: collection[0].amount,
                }
              : { Info: "No Info" }
          }
        />
      )}
    </>
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

const ViewLink = styled.span`
  color: var(--color-brown-600);
  cursor: pointer;
  text-decoration: underline;
`;
