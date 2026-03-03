import styled from "styled-components";
import { useShops } from "../hooks/useShops";

export default function ShopName({ selectedShop, setSelectedShop }) {
  const { data: shops, isLoading, isError } = useShops();

  if (isLoading) return <p>Loading shops...</p>;
  if (isError) return <p>Failed to load shops</p>;

  return (
    <Wrapper>
      <Select
        value={selectedShop}
        onChange={(e) => setSelectedShop(e.target.value)}
      >
        <option value="">Select Shop</option>
        {shops.map((shop) => (
          <option key={shop.id} value={shop.id}>
            {shop.shop_name}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
}

/* Styled */
const Wrapper = styled.div`
  width: 100%;
`;

const Select = styled.select`
  padding: 0.8rem 1.2rem;
  width: 100%;
  border: 1px solid var(--border-color);
`;