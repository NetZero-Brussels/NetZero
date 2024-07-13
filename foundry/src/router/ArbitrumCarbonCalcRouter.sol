// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {TokenRouter} from "@hyperlane-xyz/core/contracts/token/libs/TokenRouter.sol";

contract ArbitrumCarbonCalcRouter is TokenRouter {

    constructor(address _mailbox) TokenRouter(_mailbox) {
        // 0x598facE78a4302f11E3de0bee1894Da0b2Cb71F8
    }

    // handle

    // dispatch

    /**
     * @dev Should transfer `_amountOrId` of tokens from `msg.sender` to this token router.
     * @dev Called by `transferRemote` before message dispatch.
     * @dev Optionally returns `metadata` associated with the transfer to be passed in message.
     */
    function _transferFromSender(
        uint256 _amountOrId
    ) internal virtual override returns (bytes memory metadata) {
        return abi.encode(_amountOrId);
    }

    /**
     * @dev Should transfer `_amountOrId` of tokens from this token router to `_recipient`.
     * @dev Called by `handle` after message decoding.
     * @dev Optionally handles `metadata` associated with transfer passed in message.
     */
    function _transferTo(
        address _recipient,
        uint256 _amountOrId,
        bytes calldata metadata
    ) internal virtual override {
        // do nothing
    }

    /**
     * @notice Returns the balance of `account` on this token router.
     * @param account The address to query the balance of.
     * @return The balance of `account`.
     */
    function balanceOf(address account) external view virtual override returns (uint256) {
        return 0;
    }
}
