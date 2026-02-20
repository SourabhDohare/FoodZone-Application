import styled from "styled-components";
import { useEffect, useState } from "react";
import BrandLogo from "./assets/logo.png";
import SearchResults from "./components/SearchResults";
// wherever there is user typed data like input, textarea we use "value" and "onChange" to trace the input typed by user
// just to get full control of what user is typing (for complete control)
// but in case of button we are just responsding to the action done by user so "onClick" (control is by default)

export const BASE_URL = "http://localhost:9000";

const App = () => {
  // ✅ All hooks at top
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
    return <div> {error}</div>;
  }

  if (loading) {
    return <div>loading.....</div>;
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
