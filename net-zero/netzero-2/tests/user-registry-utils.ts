import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  UserRegistered,
  PointsUpdated,
  Deposit,
  Withdrawal,
  UserInfoUpdated
} from "../generated/UserRegistry/UserRegistry"

export function createUserRegisteredEvent(
  user: Address,
  ID: BigInt
): UserRegistered {
  let userRegisteredEvent = changetype<UserRegistered>(newMockEvent())

  userRegisteredEvent.parameters = new Array()

  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("ID", ethereum.Value.fromUnsignedBigInt(ID))
  )

  return userRegisteredEvent
}

export function createPointsUpdatedEvent(
  user: Address,
  points: BigInt
): PointsUpdated {
  let pointsUpdatedEvent = changetype<PointsUpdated>(newMockEvent())

  pointsUpdatedEvent.parameters = new Array()

  pointsUpdatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  pointsUpdatedEvent.parameters.push(
    new ethereum.EventParam("points", ethereum.Value.fromUnsignedBigInt(points))
  )

  return pointsUpdatedEvent
}

export function createDepositEvent(user: Address, amount: BigInt): Deposit {
  let depositEvent = changetype<Deposit>(newMockEvent())

  depositEvent.parameters = new Array()

  depositEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  depositEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return depositEvent
}

export function createWithdrawalEvent(
  user: Address,
  amount: BigInt
): Withdrawal {
  let withdrawalEvent = changetype<Withdrawal>(newMockEvent())

  withdrawalEvent.parameters = new Array()

  withdrawalEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawalEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawalEvent
}

export function createUserInfoUpdatedEvent(user: Address): UserInfoUpdated {
  let userInfoUpdatedEvent = changetype<UserInfoUpdated>(newMockEvent())

  userInfoUpdatedEvent.parameters = new Array()

  userInfoUpdatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return userInfoUpdatedEvent
}
