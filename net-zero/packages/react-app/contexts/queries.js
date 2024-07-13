import { gql } from '@apollo/client';

export const GET_USER_REGISTERED_EVENTS = gql`
  query GetUserRegisteredEvents {
    userRegistereds(first: 5) {
      id
      user
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

export const GET_POINTS_UPDATED_EVENTS = gql`
  query GetPointsUpdatedEvents {
    pointsUpdateds(first: 5) {
      id
      user
      points
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

export const GET_DEPOSIT_EVENTS = gql`
  query GetDepositEvents {
    deposits(first: 5) {
      id
      user
      amount
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

export const GET_WITHDRAWAL_EVENTS = gql`
  query GetWithdrawalEvents {
    withdrawals(first: 5) {
      id
      user
      amount
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

export const GET_USER_INFO_UPDATED_EVENTS = gql`
  query GetUserInfoUpdatedEvents {
    userInfoUpdateds(first: 5) {
      id
      user
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;
