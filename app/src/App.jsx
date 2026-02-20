import styled from "styled-components";
import { useEffect, useState } from "react";
import BrandLogo from "./assets/logo.png";
import SearchResults from "./components/SearchResults";
// wherever there is user typed data like input, textarea we use "value" and "onChange" to trace the input typed by user
// just to get full control of what user is typing (for complete control)
// but in case of button we are just responsding to the action done by user so "onClick" (control is by default)

// export const BASE_URL = "http://localhost:9000";
export const BASE_URL = "https://foodzone-application.onrender.com";

const App = () => {
  // All hooks at top
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        setError("Unable to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []);
  // use dependency array [] to run use effect only once

  console.log(data);

  const filters = ["All", "Breakfast", "Lunch", "Dinner"];

  // AFTER all hooks
 if (error) {
  return (
    <StatusContainer>
      <ErrorCard>
        <h2>⚠️ Something went wrong</h2>
        <p>{error}</p>
        <RetryButton onClick={() => window.location.reload()}>
          Try Again
        </RetryButton>
      </ErrorCard>
    </StatusContainer>
  );
}

if (loading) {
  return (
    <StatusContainer>
      <Loader />
      <LoadingText>Loading delicious food...</LoadingText>
    </StatusContainer>
  );
}

  return (
    <>
      <Container>
        <TopBar>
          <Logo>
            <img src={BrandLogo} alt="Food Zone Logo" />
          </Logo>

          <Searchbar>
            <input
              type="text"
              placeholder="Search Food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Searchbar>
        </TopBar>

        <FilterContainer>
          {filters.map((value) => (
            <Button
              key={value}
              $active={active === value}
              onClick={() => setActive(value)}
            >
              {value}
            </Button>
          ))}
        </FilterContainer>
      </Container>

      <SearchResults
        data={data}
        filters={active}
        search={search}
      ></SearchResults>
    </>
  );
};

export default App;
const Container = styled.div`
  margin: 0 auto;
  padding: 0 60px;
`;

const TopBar = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Logo = styled.div`
  img {
    height: 40px;
  }
`;

const Searchbar = styled.div`
  input {
    width: 285px;
    height: 40px;
    background-color: transparent;
    border: 1px solid #ff4343;
    color: white;
    border-radius: 6px;
    font-size: 15px;
    padding: 0 15px;
    outline: none;
    transition: 0.2s ease;
  }

  input::placeholder {
    color: #aaa;
  }

  input:focus {
    border-color: #ff6b6b;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 8px 18px;

  /* $opencurlybrace{  }closecurlybraces */
  /* Run javascript here */

  /* ({$active})=>() */
  /* take the $active value from the props  */

  background-color: ${({ $active }) => ($active ? "#ff4343" : "#444")};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s ease;

  &:hover {
    background-color: #ff4343;
  }
`;

const StatusContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  color: white;
`;

const Loader = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid #444;
  border-top: 6px solid #ff4343;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #ccc;
`;

const ErrorCard = styled.div`
  background-color: #2a2a2a;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);

  h2 {
    margin-bottom: 15px;
    color: #ff6b6b;
  }

  p {
    margin-bottom: 20px;
    color: #ccc;
  }
`;

const RetryButton = styled.button`
  padding: 10px 20px;
  background-color: #ff4343;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s ease;

  &:hover {
    background-color: #ff6b6b;
  }
`;