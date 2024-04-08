// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./ReentrancyGuard/ReentrancyGuard.sol";

contract RolesAndRights is ReentrancyGuard{
    uint256 private docterids;
    uint256 private patientids;

    address payable owner;

    constructor (){
        owner = payable(msg.sender);
        docterids = 0;
        patientids = 0;
    }

    // Patients
    struct Patient{
        uint256 patientId;
        string email;
        string [] approvedemails;
        uint256 [] tokenIds;
    }

    // Forlogging details on blockChain
    event PatientCreated(
        uint256 indexed patientId,
        string indexed email
    );

    // Keeping patients
    mapping (string => Patient) private Patients;

    // Docters
    struct Docter{
        uint256 docterId;
        string email;
        string [] approvedemails;
    }

    event DocterCreated(
        uint256 indexed docterId,
        string indexed email
    );

    // Keeping Track of central aprroveness
    mapping (string => mapping(string => bool)) private checkApproveness;

    // Keeping docters
    mapping (string => Docter) private Docters;

    // Function to create patient
    function createPatient(
        string memory email
    )public nonReentrant{
        patientids++;
        string [] memory approvedemails;
        uint256 [] memory tokenIds;
        Patients[email] = Patient(
            patientids,
            email,
            approvedemails,
            tokenIds
        );

        emit PatientCreated(
            patientids,
            email
        );
    }

    // Function to add documents
    function addDocuments(
        string memory email,
        uint256 tokenId
    )public nonReentrant{
        uint size = Patients[email].tokenIds.length;
        uint256 [] memory tokenIds = new uint256 [](size+1);  
        tokenIds[size] = tokenId;
        for(uint i = 0;i < size; i++){
            tokenIds[i] = Patients[email].tokenIds[i];
        }
        Patients[email].tokenIds = tokenIds;
    }

    // Function to approve Docter
    function approve(
        string memory emailD,
        string memory emailP
    )public nonReentrant{
        require(checkApproveness[emailD][emailP]==false,"Already Approved");
        checkApproveness[emailD][emailP] = true;

        uint size = Patients[emailP].approvedemails.length;
        string [] memory approvedemails = new string [](size+1);  
        approvedemails[size] = emailD;

        for(uint i = 0;i < size; i++){
            approvedemails[i] = Patients[emailP].approvedemails[i];
        }
        Patients[emailP].approvedemails = approvedemails;

        size = Docters[emailD].approvedemails.length;
        string [] memory approvedemails2 = new string [](size+1);  
        approvedemails2[size] = emailP; 

        for(uint i = 0;i < size; i++){
            approvedemails2[i] = Docters[emailD].approvedemails[i];
        }
        Docters[emailD].approvedemails = approvedemails2;
    }

    // Function to revoke
    function revoke(
        string memory emailD,
        string memory emailP
    )public nonReentrant{
        require(checkApproveness[emailD][emailP] == true,"Already Denied");
        checkApproveness[emailD][emailP] = false;
        uint size = Patients[emailP].approvedemails.length;
        string [] memory approvedemails = new string [](size-1);  
        uint256 currIndex = 0;
        for(uint i = 0;i < size; i++){
            if(keccak256(abi.encodePacked(Patients[emailP].approvedemails[i])) != keccak256(abi.encodePacked(emailD))){
                approvedemails[currIndex++] = Patients[emailP].approvedemails[i];
            }
        }
        Patients[emailP].approvedemails = approvedemails;

        size = Docters[emailD].approvedemails.length;
        string [] memory approvedemails2 = new string [](size-1);  
        currIndex = 0;
        for(uint i = 0;i < size; i++){
            if(keccak256(abi.encodePacked(Docters[emailD].approvedemails[i])) != keccak256(abi.encodePacked(emailP))){
                approvedemails2[currIndex++] = Docters[emailD].approvedemails[i];
            }
        }
        Docters[emailD].approvedemails = approvedemails2;
    }

    function createDocter(
        string memory email
    )public nonReentrant{
        docterids++;
        string [] memory approvedemails;

        Docters[email] = Docter(
            docterids,
            email,
            approvedemails
        );

        emit DocterCreated(
            docterids,
            email
        );
    }

    function getPatients(
        string memory email
    )public view returns(string [] memory){
        return Docters[email].approvedemails;
    }

    function getPatientDetails(
        string memory emailP,
        string memory emailD
    )public view returns(
        uint256 [] memory
    ){
        require(checkApproveness[emailD][emailP]==true,"Access Denied");
        return Patients[emailP].tokenIds;
    }

    function getDocters(
        string memory email
    )public view returns(string [] memory){
        return Patients[email].approvedemails;
    }
}