const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // Use the name, use the index, build the proof
  const tree = new MerkleTree(niceList);
  const name = "Vivek Mitra";
  const index = niceList.findIndex((n) => n === name);
  const proof = tree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof: proof,
    name: name,
  });
  console.log(gift);
}

main();
