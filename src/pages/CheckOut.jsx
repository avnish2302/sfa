import ShopName from "../components/ShopName";
import Button from "../components/Button";
import Card from "../components/Card"; // Importing Card Component
import styled from "styled-components";
import { toast } from "react-toastify";

export default function CheckOut() {

  const handleSave = () => {
    toast.success("Saved successfully!");
    
  };

  return (
    <Wrapper>
      <ShopName />
      <Card width="100rem">
        {/* ---------- ACTIVITY SUMMARY ---------- */}
        <Section>
          <h2>Activity Summary</h2>
          <Grid>
            <GridItem>Entered Inventory</GridItem>
            <GridItem>: 0 </GridItem>
            <GridItem>Collected Cash</GridItem>
            <GridItem>: 0 Rs</GridItem>
            <GridItem>Promotion Given</GridItem>
            <GridItem>: </GridItem>
          </Grid>
        </Section>

        {/* ---------- PENDING ---------- */}
        <Section>
          <h2>Pending</h2>
          <p>1. No collections</p>
        </Section>

        {/* ---------- SHOP STATS ---------- */}
        <ShopStats>
          <Stat>
            <StatLabel>Shops Visited</StatLabel>
            <Input
              type="number"
              min="0"
            />
          </Stat>

          <Stat>
            <StatLabel>Shops Pending</StatLabel>
            <Input
              type="number"
              min="0"
            />
          </Stat>
        </ShopStats>

        {/* ---------- SAVE BUTTON ---------- */}
        <ButtonWrapper>
          <Button variant="primary" size="md" onClick={handleSave}>
            Save
          </Button>
        </ButtonWrapper>

      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2.4rem;
  background-color: var(--bg-main);
  color: var(--text-primary);
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

const ShopStats = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Stat = styled.div`
  text-align: center;
  margin-right: 2rem;
`;

const StatLabel = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-brown-700);
  margin-bottom: 1.2rem;
  text-decoration: underline;
`;

const StatValue = styled.p`
  font-size: 2rem;

  color: var(--color-brown-700);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Timestamp = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: var(--color-zinc-400);
`;

const Input = styled.input`
  width: 100px;
  padding: 0.6rem;
  text-align: center;
  border: 1px solid var(--border-color);
`;