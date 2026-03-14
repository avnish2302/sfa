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
  <Modal title="Promotions" onClose={() => setShowPromotion(false)}>
    {promotions.length === 0 && <div>No Info</div>}

    {promotions.map((p, index) => (
      <div key={index}>
        <Row>
          <div>Party</div>
          <div>: {p.party}</div>
        </Row>

        <Row>
          <div>Category</div>
          <div>: {p.category}</div>
        </Row>

        <Row>
          <div>Brand</div>
          <div>: {p.brand}</div>
        </Row>

        <Row>
          <div>SKU</div>
          <div>: {p.sku}</div>
        </Row>

        <Row>
          <div>From</div>
          <div>: {new Date(p.start_date).toLocaleDateString()}</div>
        </Row>

        <Row>
          <div>To</div>
          <div>: {new Date(p.end_date).toLocaleDateString()}</div>
        </Row>

        <Row>
          <div>Scheme</div>
          <div>: {p.scheme}</div>
        </Row>
      </div>
    ))}
  </Modal>
)}
     {showInventory && (
  <Modal title="Entered Inventory" onClose={() => setShowInventory(false)}>
    {inventory.length === 0 && <div>No Info</div>}

    {inventory.map((i, index) => (
      <div key={index}>
        <Row>
          <div>Product</div>
          <div>: {i.product_name}</div>
        </Row>

        <Row>
          <div>Receipt</div>
          <div>: {i.receipt}</div>
        </Row>

        <Row>
          <div>Cases Warm</div>
          <div>: {i.cases_warm}</div>
        </Row>

        <Row>
          <div>Cases Cold</div>
          <div>: {i.cases_cold}</div>
        </Row>

        <Row>
          <div>Bottles Warm</div>
          <div>: {i.bottles_warm}</div>
        </Row>

        <Row>
          <div>Bottles Cold</div>
          <div>: {i.bottles_cold}</div>
        </Row>
      </div>
    ))}
  </Modal>
)}
      {showCollection && (
  <Modal title="Collections" onClose={() => setShowCollection(false)}>
    {collection.length === 0 && <div>No Info</div>}

    {collection.map((c) => (
      <div key={c.id}>
        <Row>
          <div>Invoice</div>
          <div>: {c.invoice_no}</div>
        </Row>

        <Row>
          <div>Remark</div>
          <div>: {c.remark}</div>
        </Row>

        <Row>
          <div>Payment Mode</div>
          <div>: {c.payment_mode}</div>
        </Row>

        <Row>
          <div>Amount</div>
          <div>: {c.amount}</div>
        </Row>
      </div>
    ))}
  </Modal>
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

const Row = styled.div`
  display: grid;
  grid-template-columns: 160px auto;
  gap: 8px;
  font-size: 1.5rem;
`;
