import styled from "styled-components";

export const FormContainer = styled.div`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: ${(props) => props.theme['gray-100']};
      font-size: 1.125rem;
      font-weight: 700;
      flex-wrap: wrap;
`

const BaseInput = styled.input`
      background-color: transparent;
      height: 2.5rem;
      border: 0;
      border-bottom: 2px solid ${(props) => props.theme['gray-500']};
      font-weight: 700;
      font-size: 1.125rem;
      padding: 0 0.5rem;
      color: ${(props) => props.theme['gray-100']};

      &::placeholder{
            color: ${(props) => props.theme['gray-500']};
      }

      &:focus{
            box-shadow: none;
            border-bottom: 2px solid ${(props) => props.theme['green-500']};
      }

      &::-webkit-calendar-picker-indicator{
            display: none !important;
      }
`

export const TaskInput = styled(BaseInput)`
      flex: 1;
`

export const MinutesAmountInput = styled(BaseInput)`
      width: 4rem;
`