import styled from "styled-components";
import { useCartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const GST_RATE = 0.05; // 5%
const DELIVERY_CHARGE = 40;

const Checkout = () => {
  const { state } = useCartContext();
  const navigate = useNavigate();

    useEffect(() => {
    if (state.items.length === 0) {
      navigate("/");
    }
  }, [state.items, navigate]);
  
  const subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const gst = subtotal * GST_RATE;
  const total = subtotal + gst + DELIVERY_CHARGE;
  console.log(state.items);
  return (
    <Wrapper>
      <h2>Checkout</h2>

      {state.items.map((item) => (
        <Item key={item.id}>
          <span>{item.name} x {item.quantity}</span>
          <span>₹{item.price * item.quantity}</span>
        </Item>
      ))}

      <Divider />

      <Row>
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </Row>

      <Row>
        <span>GST (5%)</span>
        <span>₹{gst.toFixed(2)}</span>
      </Row>

      <Row>
        <span>Delivery</span>
        <span>₹{DELIVERY_CHARGE}</span>
      </Row>

      <Total>
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </Total>

      <PayButton
        onClick={() =>
          navigate("/success", {
            state: { items: state.items, subtotal, gst, total }
          })
        }
      >
        Proceed to Payment
      </PayButton>
    </Wrapper>
  );
};

export default Checkout;
const Wrapper = styled.div`
  max-width: 700px;
  margin: 80px auto;
  background: #1e1f22;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
`;

const Divider = styled.hr`
  margin: 25px 0;
  border: none;
  height: 1px;
  background: #444;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: #ccc;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  margin-top: 10px;
  color: #00e676;
`;

const PayButton = styled.button`
  width: 100%;
  margin-top: 30px;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(90deg, #ff4343, #ff8c42);
  color: white;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(255, 67, 67, 0.4);
  }
`;