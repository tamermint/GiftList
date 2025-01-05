const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "492e1960aa22cc1fd53dbe9213ab9d7c6e62faf231fb0257301f8bcf4041ba03";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const proof = body.proof;
  const name = body.name;

  // TODO: prove that a name is in the list
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
