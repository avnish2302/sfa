import styled, { css } from "styled-components";

function Button({ children, variation = "primary", size = "sm", ...props }) {
  return (
    <StyledButton $variation={variation} $size={size} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  border: none;
  border-radius: 4px; /* matches Tailwind rounded */
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease;

  ${(props) => sizes[props.$size]}
  ${(props) => variations[props.$variation]}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

/* ===== Sizes (Match Tailwind px scale) ===== */

const sizes = {
  sm: css`
    padding: 4px 12px;
    font-size: 12px;
  `,
  md: css`
    padding: 8px 16px;
    font-size: 14px;
  `,
  lg: css`
    padding: 10px 25px;
    font-size: 16px;
  `,
};

/* ===== Variations (Exact Amber Feel) ===== */

const variations = {

     primary: css`
    background-color: #1d6617; /* amber-800 */
    color: white;

    &:hover {
      background-color: #113f0d; /* amber-900 */
    }

  `,
    primaryBlue: css`
    background-color: #3240c0; /* amber-800 */
    color: white;

    &:hover {
      background-color: #202a7e; /* amber-900 */
    }

  `,
  
  primaryBrown: css`
    background-color: #92400e; /* amber-800 */
    color: white;

    &:hover {
      background-color: #78350f; /* amber-900 */
    }

  `,

  edit: css`
    background-color: #1e3a8a;
    color: #dbeafe;
    margin-right: 5px;

    &:hover {
      background-color: #172554;
    }
  `,

  saveEdit: css`
    background-color: #14532d;
    color: #dcfce7;
    margin-right: 5px;

    &:hover {
      background-color: #052e16;
    }
  `,

  delete: css`
    background-color: #7f1d1d;
    color: #fee2e2;

    &:hover {
      background-color: #450a0a;
    }
  `,

  neutral: css`
    background-color: #27272a;
    color: var(--color-grey-200);

    &:hover {
      background-color: #3f3f46;
    }
  `,
};

export default Button;
