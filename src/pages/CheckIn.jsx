import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import RecordInventoryOwn from "../features/checkin/RecordInventoryOwn";
import RecordInventoryCompetitor from "../features/checkin/RecordInventoryCompetitor";
import ShowCase from "../features/checkin/Showcase";
import Menu from "../features/checkin/Menu";
import Promotions from "../features/checkin/Promotions";
import Collection from "../features/checkin/Collection";
import AssetAssignment from "../features/checkin/AssetAssignment";
import Main from "../features/checkin/Main";
import ShopName from "../components/ShopName";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createCheckin } from "../services/apiCheckin";
import Button from "../components/Button";
import { toast } from "react-toastify";
import useActiveCheckin from "../hooks/useActiveCheckin";

export default function CheckIn() {
  const navigate = useNavigate();
  const { tab = "main" } = useParams();
  const { checkinId, shopId, startCheckin } = useActiveCheckin();
  const [selectedShop, setSelectedShop] = useState(
    shopId ? { id: shopId } : null,
  );

  const checkinMutation = useMutation({
    mutationFn: createCheckin,
    onSuccess: (data) => {
      const id = data.checkin_id;
      startCheckin({
        checkinId: id,
        shopId: selectedShop,
      });
      toast.success("Check-in started");
    },
    onError: (error) => {
      toast.error(error.message || "Punch-In required before Check_In");
    },
    onSettled: () => {
      clickLock.current = false;
    },
  });

  const handleShopSelect = (shopId) => {
    setSelectedShop(shopId);
  };

  const tabs = [
    { key: "main", label: "Main" },
    { key: "record-inventory-own", label: "Record Inventory Own" },
    {
      key: "record-inventory-competitor",
      label: "Record Inventory Competitor",
    },
    { key: "showcase", label: "Showcase" },
    { key: "menu", label: "Menu" },
    { key: "asset-assignment", label: "Asset Assignment" },
    { key: "promotions", label: "Promotions" },
    { key: "collection", label: "Collection" },
  ];

  const clickLock = useRef(false);

  return (
    <Wrapper>
      <Title>Check-In</Title>
      <Row>
        <ShopName
          selectedShop={selectedShop}
          setSelectedShop={handleShopSelect}
        />

        <Button
          variation="primary"
          size="md"
          disabled={!selectedShop?.id || checkinMutation.isPending || checkinId}
          onClick={() => {
            if (clickLock.current) return;

            clickLock.current = true;

            if (checkinId) {
              toast.error("You are already checked in to a shop");
              clickLock.current = false;
              return;
            }

            if (!navigator.geolocation) {
              toast.error("Geolocation not supported by your browser");
              clickLock.current = false;
              return;
            }

            navigator.geolocation.getCurrentPosition(
              (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                checkinMutation.mutate({
                  shop_id: selectedShop.id,
                  latitude,
                  longitude,
                });
              },
              (error) => {
                toast.error("Unable to get location. Please enable GPS");
                clickLock.current = false;
                console.error(error);
              },
            );
          }}
        >
          {checkinMutation.isPending ? "Checking in..." : "Check-In"}
        </Button>
      </Row>
      <Tabs>
        {tabs.map((t) => (
          <TabButton
            key={t.key}
            $active={tab === t.key}
            data-active={tab === t.key}
            onClick={() => navigate(`/checkin/${t.key}`)}
          >
            {t.label}
          </TabButton>
        ))}
      </Tabs>

      {tab === "main" && <Main checkinId={checkinId} />}
      {tab === "record-inventory-own" && (
        <RecordInventoryOwn checkinId={checkinId} />
      )}
      {tab === "record-inventory-competitor" && (
        <RecordInventoryCompetitor checkinId={checkinId} />
      )}
      {tab === "showcase" && <ShowCase checkinId={checkinId} />}
      {tab === "menu" && <Menu checkinId={checkinId} />}
      {tab === "asset-assignment" && <AssetAssignment checkinId={checkinId} />}
      {tab === "promotions" && <Promotions checkinId={checkinId} />}
      {tab === "collection" && <Collection checkinId={checkinId} />}
    </Wrapper>
  );
}

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

const Tabs = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 1.6rem;
`;

const TabButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 1.3rem;
  transition: all 0.2s ease;
  background-color: ${({ $active }) =>
    $active ? "var(--color-brown-100)" : "var(--color-grey-200)"};
  color: ${({ $active }) =>
    $active ? "var(--color-brown-700)" : "var(--text-primary)"};

  ${({ $active }) =>
    $active &&
    `
    font-weight: 500;
  `}

  &:not([data-active="true"]):hover {
    background-color: var(--color-brown-100);
  }
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
