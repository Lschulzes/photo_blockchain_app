import styled from "styled-components";
export default styled.nav`
  background: #333;
  padding: 0rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    max-width: 60px;
  }

  .account {
    &-details {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    &-address {
      color: #aaa;
    }
  }
`;
