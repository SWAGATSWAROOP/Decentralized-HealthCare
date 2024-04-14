// Import required libraries
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Describe the contract and its tests
describe("RolesAndRights contract", function () {
  let rolesAndRightsContract;
  let owner;
  let docter;
  let patient;

  // Deploy the contract before each test
  beforeEach(async function () {
    const RolesAndRights = await ethers.getContractFactory("RolesAndRights");
    rolesAndRightsContract = await RolesAndRights.deploy();

    // Get accounts
    [owner, docter, patient] = await ethers.getSigners();
  });

  // Test cases
  describe("Function createPatient", function () {
    it("Should create a new patient", async function () {
      await rolesAndRightsContract
        .connect(patient)
        .createPatient("patient@test.com");
      const patientDetails =
        await rolesAndRightsContract.getPatients("patient@test.com");
      expect(patientDetails[0]).to.equal(patient.address);
    });
  });

  describe("Function createDocter", function () {
    it("Should create a new docter", async function () {
      await rolesAndRightsContract
        .connect(docter)
        .createDocter("docter@test.com");
      const docterDetails =
        await rolesAndRightsContract.getDocters("docter@test.com");
      expect(docterDetails[0]).to.equal(docter.address);
    });
  });

  // Add more test cases for other functions as needed
});
