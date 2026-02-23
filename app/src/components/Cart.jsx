import styled from "styled-components";
import { useCartContext } from "../context/CartContext";
import { BASE_URL } from "../App";
import { useState } from "react";
import { useEffect } from "react";
import { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { state, dispatch } = useCartContext();
  const [isOpen, setIsOpen] = useState(false);

  const [animateBadge, setAnimateBadge] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.items.length > 0) {
      setAnimateBadge(true);

      const timer = setTimeout(() => {
        setAnimateBadge(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [state.items.length]);

  const total = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <>
      <Overlay $open={isOpen} onClick={() => setIsOpen(false)} />
      <CartContainer $open={isOpen}>
        <CartHeader>
          🛒 Your Cart
          <CloseButton onClick={() => setIsOpen(false)}>✕</CloseButton>
        </CartHeader>

        <ItemsWrapper>
          {state.items.length === 0 && <Empty>Cart is empty</Empty>}
          <CartItems>
            {state.items.map((item) => (
              <CartItem key={item.id}>
                <ItemImage>
                  <img src={BASE_URL + item.image} alt={item.name} />
                </ItemImage>

                <ItemDetails>
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>

                  <QuantityControl>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "DECREASE_QTY",
                          payload: item.id,
                        })
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch({
                          type: "INCREASE_QTY",
                          payload: item.id,
                        })
                      }
                    >
                      +
                    </button>
                  </QuantityControl>
                </ItemDetails>

                <RemoveButton
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: item.id,
                    })
                  }
                >
                  ✕
                </RemoveButton>
              </CartItem>
            ))}
          </CartItems>
        </ItemsWrapper>

        {state.items.length > 0 && (
          <CartFooter>
            <Summary>
              <TotalRow>
                <span>Total</span>
                <span>₹{total}</span>
              </TotalRow>

              <CheckoutButton onClick={()=>navigate("/checkout")}>Proceed to Checkout</CheckoutButton>

              <ClearButton onClick={() => dispatch({ type: "CLEAR_CART" })}>
                Clear Cart
              </ClearButton>
            </Summary>
          </CartFooter>
        )}
      </CartContainer>


      <FloatingCartButton onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "✕" : "🛒"}
        {state.items.length > 0 && (
          <CartBadge $animate={animateBadge}>{state.items.length}</CartBadge>
        )}
      </FloatingCartButton>
    </>
  );
};

export default Cart;

const Overlay = styled.div`
  display: ${({ $open }) => ($open ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;
const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #00c853;
  color: white;
  width: 22px;
  height: 22px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  animation: ${({ $animate }) => ($animate ? bounce : "none")} 0.5s ease;
`;

const CartContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 380px;
  display: flex;
  flex-direction: column;
  padding: 25px;

  background: linear-gradient(
    145deg,
    rgba(28, 28, 28, 0.98),
    rgba(18, 18, 18, 0.98)
  );

  backdrop-filter: blur(20px);
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.6);

transform: ${({ $open }) =>
  $open ? "translateX(0) scale(1)" : "translateX(100%) scale(0.98)"};

transform-origin: right center;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 999;
`;

const CartHeader = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: 600;

  position: relative; 
`;

const ItemsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;

  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
const bounce = keyframes`
  0% { transform: scale(1); }
  30% { transform: scale(1.3); }
  50% { transform: scale(0.9); }
  70% { transform: scale(1.15); }
  100% { transform: scale(1); }
`;
const Empty = styled.p`
  opacity: 0.7;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 12px;
  transition: 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CartFooter = styled.div`
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ItemImage = styled.div`
  img {
    width: 55px;
    height: 55px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const ItemDetails = styled.div`
  flex: 1;

  h4 {
    font-size: 14px;
    margin-bottom: 4px;
  }

  p {
    font-size: 13px;
    color: #ff8c42;
    font-weight: 600;
    margin-bottom: 8px;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    width: 25px;
    height: 25px;
    border-radius: 6px;
    border: none;
    background: #ff4343;
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s ease;

    &:hover {
      background: #ff8c42;
    }
  }

  span {
    font-size: 14px;
    font-weight: 600;
  }
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #ff4343;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const Summary = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(90deg, #ff4343, #ff8c42);
  color: white;
  margin-bottom: 10px;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 67, 67, 0.5);
  }
`;

const ClearButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: #333;
  color: white;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: #444;
  }
`;

const FloatingCartButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(90deg, #ff4343, #ff8c42);
  border: none;
  color: white;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  font-size: 22px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 10px 30px rgba(255, 67, 67, 0.5);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

const CloseButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    border: none;
    color: white;
    font-size: 22px;
    cursor: pointer;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4343;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 50%;
  min-width: 20px;
  text-align: center;
`;
