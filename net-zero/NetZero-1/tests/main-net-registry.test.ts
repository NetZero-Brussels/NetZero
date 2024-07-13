import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { UserRegistered } from "../generated/schema"
import { UserRegistered as UserRegisteredEvent } from "../generated/MainNetRegistry/MainNetRegistry"
import { handleUserRegistered } from "../src/main-net-registry"
import { createUserRegisteredEvent } from "./main-net-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let ID = BigInt.fromI32(234)
    let newUserRegisteredEvent = createUserRegisteredEvent(user, ID)
    handleUserRegistered(newUserRegisteredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("UserRegistered created and stored", () => {
    assert.entityCount("UserRegistered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "UserRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "UserRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ID",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
