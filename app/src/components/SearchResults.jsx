import { BASE_URL } from "../App";
import BackGroundImage from "../assets/bg.png";
import styled from "styled-components";

const SearchResults = ({ data: foods, filters: type, search }) => {
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
    <FoodContainer>
      <FoodCards>
        {filteredData?.map((food) => (
          <Card key={food.name}>
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
          </Card>
        ))}
      </FoodCards>
    </FoodContainer>
  );
};

export default SearchResults;

const FoodContainer = styled.main`
  width: 100%;
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
`;

const Card = styled.div`
  width: 100%;
`;

const CardContent = styled.div`
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 16px;

  background:
    radial-gradient(80% 220% at -15% -10%, #98f9ff 0%, transparent 100%),
    radial-gradient(80% 200% at 110% 110%, #eabfff 0%, transparent 100%),
    #1c1c1c;

  background-clip: padding-box, border-box;
  background-origin: border-box;

  display: flex;
  gap: 15px;
  align-items: center;

  transition: 0.3s ease;
  &:hover {
    transform: translateY(-4px);
  }
`;

const FoodImage = styled.div`
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
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

const Button = styled.button`
  align-self: flex-end;
  width: fit-content;
  padding: 6px 12px;

  background-color: #ff4343;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: 0.2s ease;
  font-weight: 600;
  transition: 0.3s ease-in;
  &:hover {
    background-color: #00ff88;
    color: black;
    font-weight: 700;
    transition: 0.3s ease-in;
  }
`;
