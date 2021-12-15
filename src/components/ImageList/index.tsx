import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
};

export default function ImageList({ children }: Props) {
  return <ListStyle>{children}</ListStyle>;
}

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;

  & > * {
    padding: 0.25rem;
    background: #333;
    color: #00fa9a;
    margin-bottom: 1rem;
    border-radius: 10px 10px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      border-radius: 8px 8px 0 0;
    }
  }

  @media (max-width: 1000px) {
    & > * img {
      width: 600px;
    }
  }
  @media (max-width: 650px) {
    & > * img {
      width: 400px;
    }
  }
`;
