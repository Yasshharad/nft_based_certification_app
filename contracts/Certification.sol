// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Certification is ERC721 {
    uint256 private _tokenIdCounter;
    mapping(uint256 => CertificationData) private _certifications;

    struct CertificationData {
        string title;
        address recipientAddress; // Updated field
        address recipient; // New field
        string issuer;
        string metadata;
    }

    constructor() ERC721("Certification", "CERT") {}

    // Function to issue a new certification
    function issueCertification(
        address recipientAddress, // Updated parameter
        string memory title,
        string memory issuer,
        string memory metadata
    ) external returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _safeMint(recipientAddress, tokenId);
        _tokenIdCounter++;
        _certifications[tokenId] = CertificationData(title, recipientAddress, msg.sender, issuer, metadata);
        return tokenId;
    }

    function checkCertificationExists(uint256 tokenId) internal view returns (bool) {
        return bytes(_certifications[tokenId].title).length != 0;
    }

    // Function to retrieve certification details
    function getCertification(uint256 tokenId)
        external
        view
        returns (
            string memory title,
            address recipientAddress, // Updated return value
            address recipient, // New return value
            string memory issuer,
            string memory metadata
        )
    {
        require(checkCertificationExists(tokenId), "Certification does not exist");
        CertificationData memory certification = _certifications[tokenId];
        return (certification.title, certification.recipientAddress, certification.recipient, certification.issuer, certification.metadata);
    }
}
