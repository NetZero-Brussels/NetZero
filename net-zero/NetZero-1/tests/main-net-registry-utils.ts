import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  UserRegistered,
  PointsAdded,
  PointsSubtracted,
  Deposit,
  Withdrawal,
  UserInfoUpdated
} from "../generated/MainNetRegistry/MainNetRegistry"

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

export function createPointsAddedEvent(
  user: Address,
  points: BigInt
): PointsAdded {
  let pointsAddedEvent = changetype<PointsAdded>(newMockEvent())

  pointsAddedEvent.parameters = new Array()

  pointsAddedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  pointsAddedEvent.parameters.push(
    new ethereum.EventParam("points", ethereum.Value.fromUnsignedBigInt(points))
  )

  return pointsAddedEvent
}

export function createPointsSubtractedEvent(
  user: Address,
  points: BigInt
): PointsSubtracted {
  let pointsSubtractedEvent = changetype<PointsSubtracted>(newMockEvent())

  pointsSubtractedEvent.parameters = new Array()

  pointsSubtractedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  pointsSubtractedEvent.parameters.push(
    new ethereum.EventParam("points", ethereum.Value.fromUnsignedBigInt(points))
  )

  return pointsSubtractedEvent
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
