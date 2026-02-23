import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useCartContext } from "../context/CartContext";
import { generateInvoice } from "../utils/generateInvoice";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useCartContext();

  const orderData = location.state;

  const [isVerifying, setIsVerifying] = useState(true);
  const [isPaid, setIsPaid] = useState(false);

  const [orderId] = useState(
    `FZ-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`
  );

  useEffect(() => {
    if (!orderData) {
      navigate("/");
    }
  }, [orderData, navigate]);

  useEffect(() => {
    if (orderData) {
      setTimeout(() => {
        setIsVerifying(false);
        setIsPaid(true);
        dispatch({ type: "CLEAR_CART" });
      }, 3000);
    }
  }, [orderData, dispatch]);

  if (!orderData) return null;

  const { items, subtotal, gst, total } = orderData;

  const upiId = "9503241604@ybl";
  const upiString = `upi://pay?pa=${upiId}&pn=FoodZone&am=${total}&cu=INR`;

  return (
    <Wrapper>
      <Card>
        {!isPaid && <h2>Complete Your Payment</h2>}

        <Amount>₹{total.toFixed(2)}</Amount>

        {!isPaid && (
          <>
            <QRCodeSVG value={upiString} size={220} />
            <p>Scan using any UPI app</p>
            <Status>Verifying Payment...</Status>
          </>
        )}

        {isPaid && (
          <>
            <Success>✅ Payment Verified Successfully!</Success>
            <OrderText>Order ID: {orderId}</OrderText>

            <DownloadButton
              onClick={() =>
                generateInvoice({
                  items,
                  customer: {
                    name: "Sourabh Dohare",
                    phone: "9503241604",
                    address: "Pune, Maharashtra, India",
                  },
                  orderId,
                  paymentId: `PAY-${Date.now()}`,
                  deliveryFee: 30,
                })
              }
            >
              Download Invoice
            </DownloadButton>
          </>
        )}
      </Card>
    </Wrapper>
  );
};

export default OrderSuccess;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #121212;
`;

const Card = styled.div`
  background: #1e1f22;
  padding: 40px;
  border-radius: 20px;
  width: 500px;
  text-align: center;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
`;

const Amount = styled.h1`
  color: #00e676;
  margin: 20px 0;
`;

const Status = styled.p`
  margin-top: 20px;
  color: orange;
  font-weight: 600;
`;

const Success = styled.h3`
  color: #00e676;
  margin: 20px 0;
`;

const OrderText = styled.p`
  font-weight: bold;
  margin-bottom: 20px;
`;

const DownloadButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  background: linear-gradient(90deg, #ff4343, #ff8c42);
  color: white;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;
