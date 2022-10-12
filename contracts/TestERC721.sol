// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TestERC721 is ERC721, Ownable {
    using Counters for Counters.Counter;

    uint256 public constant CAP = 10000;

    bool public publicMintEnabled;

    Counters.Counter private _tokenIdCounter;
    string private _baseUri;

    constructor(
        string memory name,
        string memory symbol,
        bool _publicMintEnabled,
        string memory __baseUri
    ) ERC721(name, symbol) {
        _baseUri = __baseUri;
        publicMintEnabled = _publicMintEnabled;
        for (uint8 i = 0; i < 10; i++) {
            mint(msg.sender);
        }
    }

    function mint(address to) public {
        if (!publicMintEnabled) {
            require(msg.sender == owner(), "TestERC721: Public mint disabled");
        }
        _mint(to);
    }

    function ownerMint(address to) public onlyOwner {
        _mint(to);
    }

    function _mint(address to) private {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId < CAP, "TestERC721: Cap reached");
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overridden in child contracts.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseUri;
    }
}
