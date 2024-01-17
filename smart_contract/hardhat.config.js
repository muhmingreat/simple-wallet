require("@nomiclabs/hardhat-waffle");
//eth-sepolia.g.alchemy.com/v2/eCBBAN7YS4dbDK4X6SnndGa7AB5ZH4cP
/** @type import('hardhat/config').HardhatUserConfig */
https: module.exports = {
  solidity: "0.8.0",
  networks: {
    sapolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/eCBBAN7YS4dbDK4X6SnndGa7AB5ZH4cP",
      accounts: [
        "5dff357b6b6e7938ca51f301dfe507e0cae08304fbf30fcc8d03c326db9e1434",
      ],
    },
  },
};
