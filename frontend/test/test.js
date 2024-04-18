const { expect } = require("chai");

describe("RolesAndRights contract", function () {
  let rolesAndRightsContract;
  let owner;
  let docter;
  let patient;

  beforeEach(async function () {
    const RolesAndRights = await ethers.getContractFactory("RolesAndRights");
    rolesAndRightsContract = await RolesAndRights.deploy();

    [owner, docter, patient] = await ethers.getSigners();
  });

  describe("Function createPatient", function () {
    it("Should create a new patient", async function () {
      await rolesAndRightsContract.createPatient("patient@test.com");

      const patientDetails =
        await rolesAndRightsContract.getPatients("patient@test.com");
      expect(patientDetails[0]).to.equal(patient.address);
    });
  });

  describe("Function createDocter", function () {
    it("Should create a new doctor", async function () {
      await rolesAndRightsContract.createDocter("doctor@test.com");

      const doctorDetails =
        await rolesAndRightsContract.getDocters("doctor@test.com");
      expect(doctorDetails[0]).to.equal(docter.address);
    });
  });

  describe("Function approve", function () {
    it("Should approve a doctor for a patient", async function () {
      await rolesAndRightsContract.createDocter("doctor@test.com");
      await rolesAndRightsContract.createPatient("patient@test.com");

      await rolesAndRightsContract.approve(
        "doctor@test.com",
        "patient@test.com"
      );

      const patientDetails =
        await rolesAndRightsContract.getPatients("patient@test.com");
      expect(patientDetails.approvedemails[0]).to.equal("doctor@test.com");
    });
  });

  describe("Function revoke", function () {
    it("Should revoke approval of a doctor for a patient", async function () {
      await rolesAndRightsContract.createDocter("doctor@test.com");
      await rolesAndRightsContract.createPatient("patient@test.com");
      await rolesAndRightsContract.approve(
        "doctor@test.com",
        "patient@test.com"
      );

      await rolesAndRightsContract.revoke(
        "doctor@test.com",
        "patient@test.com"
      );

      const patientDetails =
        await rolesAndRightsContract.getPatients("patient@test.com");
      expect(patientDetails.approvedemails).to.be.empty;
    });
  });

  describe("Function addDocuments", function () {
    it("Should add documents to a patient", async function () {
      await rolesAndRightsContract.createPatient("patient@test.com");

      await rolesAndRightsContract.addDocuments(
        "patient@test.com",
        "https://example.com/document.pdf"
      );

      const patientDetails =
        await rolesAndRightsContract.getPatients("patient@test.com");
      expect(patientDetails.urls[0]).to.equal(
        "https://example.com/document.pdf"
      );
    });
  });

  describe("Function donateMoney", function () {
    it("Should donate money to the contract", async function () {
      const amount = ethers.parseEther("1");

      await rolesAndRightsContract.createPatient("patient@test.com");

      const tx = await rolesAndRightsContract.donateMoney(
        "patient@test.com",
        false,
        { value: amount }
      );

      const receipt = await tx.wait();
      expect(receipt.events[0].args.email).to.equal("patient@test.com");
      expect(receipt.events[0].args.money).to.equal(amount);
    });
  });

  describe("Function withdraw", function () {
    it("Should allow the owner to withdraw funds", async function () {
      const initialBalance = await ethers.provider.getBalance(owner.address);

      await rolesAndRightsContract.withdraw();

      const finalBalance = await ethers.provider.getBalance(owner.address);
      expect(finalBalance.gt(initialBalance)).to.be.true;
    });
  });
});
