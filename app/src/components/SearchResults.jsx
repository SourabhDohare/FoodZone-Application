import { BASE_URL } from "../App";
import BackGroundImage from "../assets/bg.png";
import styled from "styled-components";
import { useCartContext } from "../context/CartContext";
import { useToast } from "./ToastProvider";

const SearchResults = ({ data: foods, filters: type, search }) => {
  const { state, dispatch } = useCartContext();
  const { addToast } = useToast();
  const filteredData = foods?.filter((food) => {
    if (search.trim() !== "") {
      return food.name.toLowerCase().includes(search.toLowerCase());
    }
    if (type === "All") {
      return true;
    }
    return food.type?.toLowerCase() === type.toLowerCase();
  });

  return (
    <>
      <FoodContainer>
        <FoodCards>
          {filteredData?.map((food) => {
            const itemInCart = state.items.find((item) => item.id === food.id);

            const quantity = itemInCart ? itemInCart.quantity : 0;

            return (
              <Card key={food.id}>
                <CardContent>
                  <FoodImage>
                    <img src={BASE_URL + food.image} alt={food.name} />
                  </FoodImage>

                  <ItemContent>
                    <h3>{food.name}</h3>
                    <p>{food.text}</p>
                    <Button>{"$ " + food.price.toFixed(2)}</Button>
                  </ItemContent>
                </CardContent>

                {quantity === 0 ? (
                  <AddToCartButton
                    onClick={() => {
                      dispatch({ type: "ADD_TO_CART", payload: food });
                      addToast(`${food.id} added to cart`);
                    }}
                  >
                    Add to Cart
                  </AddToCartButton>
                ) : (
                  <QuantityStepper>
                    <StepperButton
                      onClick={() =>
                        dispatch({
                          type: "DECREASE_QTY",
                          payload: food.id,
                        })
                      }
                    >
                      −
                    </StepperButton>

                    <QuantityNumber>{quantity}</QuantityNumber>

                    <StepperButton
                      onClick={() =>
                        dispatch({
                          type: "INCREASE_QTY",
                          payload: food.id,
                        })
                      }
                    >
                      +
                    </StepperButton>
                  </QuantityStepper>
                )}
              </Card>
            );
          })}
        </FoodCards>
      </FoodContainer>
    </>
  );
};

export default SearchResults;

const QuantityStepper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  background: linear-gradient(90deg, #ff4343, #ff8c42);
  padding: 12px 20px;
  border-radius: 14px;
  font-weight: 600;
  color: white;
  margin-top: 12px;
  transition: 0.3s ease;
`;

const StepperButton = styled.button`
  background: white;
  color: #ff4343;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    transform: scale(1.15);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const QuantityNumber = styled.span`
  min-width: 24px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  transition: 0.2s ease;
`;

const FoodContainer = styled.main`
  min-height: calc(100vh - 238px);

  background-image: url(${BackGroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const FoodCards = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 30px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    padding: 30px 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;
const Card = styled.div`
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.35s ease;
  position: relative;

  &:hover {
    transform: translateY(-8px);
  }
`;
const CardContent = styled.div`
  border-radius: 18px;
  padding: 18px;

  background: linear-gradient(
    145deg,
    rgba(40, 40, 40, 0.95),
    rgba(25, 25, 25, 0.95)
  );

  display: flex;
  gap: 18px;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const FoodImage = styled.div`
  overflow: hidden;
  border-radius: 12px;

  img {
    width: 110px;
    height: 110px;
    object-fit: cover;
    border-radius: 12px;
    transition: 0.4s ease;

    @media (max-width: 480px) {
      width: 100%;
      height: 200px;
    }
  }
`;

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: white;
  }

  p {
    font-size: 15px;
    color: #ccc;
  }
`;
const Button = styled.div`
  align-self: flex-start;
  padding: 6px 14px;
  border-radius: 20px;

  background: linear-gradient(45deg, #ff4343, #ff8c42);
  color: white;
  font-size: 13px;
  font-weight: 600;

  box-shadow: 0 5px 15px rgba(255, 67, 67, 0.4);
`;

const AddToCartButton = styled.button`
  margin-top: 12px;
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  color: white;
  box-shadow: 0 6px 20px rgba(255, 67, 67, 0.4);

  background: linear-gradient(90deg, #ff4343, #ff8c42);

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(255, 67, 67, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }
`;
