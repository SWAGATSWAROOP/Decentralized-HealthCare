# Decentralized-HealthCare

Decentralized-HealthCare is a blockchain-enabled healthcare platform that leverages distributed ledger technology and IPFS for secure storage and sharing of medical data.  It enables patients and healthcare providers to manage and exchange medical records with full transparency and integrity.  The project is hosted on GitHub under the MIT License, and a live demo of the deployed application is available at [decentralized-health-care.vercel.app](https://decentralized-health-care.vercel.app) .

## Key Features

* **Secure Record Storage:** Patients can upload medical records (e.g. reports, images) to IPFS, ensuring data is stored in a decentralized and tamper-proof manner.
* **Blockchain Integrity:** A Solidity smart contract on Ethereum (via Alchemy/Ethers.js) anchors record metadata on-chain for immutable audit trails.
* **Role-Based Access:** The system defines roles (patients, doctors, etc.) so that only authorized users can access or update a patient’s data.
* **Web3 Authentication:** Users connect their Web3 wallet (e.g. MetaMask) to authenticate and sign transactions, integrating seamlessly with the dApp.
* **Transparent Workflows:** All actions (uploads, access requests) are recorded on-chain, providing transparency and trust in the healthcare workflow.
* **Extensible Architecture:** Built with standard web3 technologies, making it easy to extend or integrate new features (e.g. added nodes, new smart contracts, analytics).

## Tech Stack

* **Frontend:** React.js (JavaScript, JSX) for building a responsive UI.
* **Backend:** Node.js with Express for REST APIs and handling file uploads.
* **Blockchain:** Solidity smart contracts deployed on Ethereum (e.g. via Alchemy RPC).
* **Web3 Libraries:** Ethers.js for blockchain interactions and MetaMask for user wallet access.
* **Decentralized Storage:** IPFS for storing and retrieving encrypted medical files.
* **Other Tools:** Standard JavaScript (Node.js) tooling, along with CSS for styling.

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SWAGATSWAROOP/Decentralized-HealthCare.git
   cd Decentralized-HealthCare
   ```
2. **Backend Setup:**

   ```bash
   cd backend
   npm install
   # Create a .env file if required (e.g. for Alchemy API key, contract addresses)
   npm start
   ```
3. **Frontend Setup:**

   ```bash
   cd ../frontend
   npm install
   npm start
   ```
4. **Environment Variables:** Configure any needed environment variables (e.g. `ALCHEMY_API_URL`, smart contract addresses) as required by the code. Consult any `.env.example` files or comments in the code for guidance.
5. **Dependencies:** Ensure you have Node.js (LTS version) and npm/yarn installed. You may also need a local Ethereum wallet (MetaMask) and access to a testnet (e.g. Sepolia via Alchemy) for full functionality.

## Usage

* After running both backend and frontend, open your browser to `http://localhost:3000` (or the port displayed).
* Connect your Ethereum wallet (e.g. MetaMask) when prompted.
* Register or log in as a **Patient** or **Doctor**.
* **Patients** can upload and manage their medical records. Each upload will store the file on IPFS and record a reference on the blockchain.
* **Doctors** can request access to patient data (via blockchain transactions) and view records once access is granted.
* All blockchain transactions (uploads, permissions) occur on the connected network. Check your wallet or a block explorer (via Alchemy) to verify events.
* For advanced usage, inspect the Solidity contract in `backend/contracts/` (if available) to understand on-chain logic.
* Refer to the live demo for a workflow example: [decentralized-health-care.vercel.app](https://decentralized-health-care.vercel.app) .

## Live Demo

A live version of the application is deployed and can be accessed at: [decentralized-health-care.vercel.app](https://decentralized-health-care.vercel.app) . This demo runs the same code with a connected Ethereum provider (via Alchemy) and showcases the app’s functionality in a test environment.

## Contributing

Contributions are welcome! To contribute, please:

* Fork the repository on GitHub and create a feature branch (`git checkout -b feature/my-feature`).
* Commit your changes with clear descriptions. For example:

  ```bash
  git commit -m "Add feature X to handle medical record upload"
  ```
* Push your branch and open a Pull Request against the `main` branch.
* Ensure your code is well-documented and follows existing style conventions.
* You can open an issue to discuss major features or bugs before implementing them.
* We encourage tests and clear commit messages for review.

By participating, you agree that your contributions will be licensed under the project’s MIT License.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for full details.

## Contact / Credits

* **Author:** Swagat Swarup Parida – MERN Stack & Blockchain Developer.
* **GitHub:** [@SWAGATSWAROOP](https://github.com/SWAGATSWAROOP) (this repository).
* **LinkedIn:** [swagatswaroopparida](https://www.linkedin.com/in/swagatswaroopparida/) .

Feel free to open issues or pull requests on GitHub for questions or suggestions. Maintainer contact is available via the above LinkedIn or GitHub profile. Thank you for your interest in Decentralized-HealthCare!
