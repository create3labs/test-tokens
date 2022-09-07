pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestERC721A is ERC721A, Ownable {
    bool public publicMintEnabled;

    string private _baseUri;

    constructor(
        string memory name,
        string memory symbol,
        bool _publicMintEnabled,
        string memory __baseUri
    ) ERC721A(name, symbol) {
        _baseUri = __baseUri;
        publicMintEnabled = _publicMintEnabled;
        mint(10);
    }

    function mint(uint256 quantity) public payable {
        if (!publicMintEnabled) {
            require(msg.sender == owner(), "TestERC721A: Public mint disabled");
        }
        _mint(msg.sender, quantity);
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
