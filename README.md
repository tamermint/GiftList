# Gift List

To get started with the repository, clone it and then run `npm install` in the top-level directory to install the depedencies.

There are three folders in this repository:

## Client

You can run the client from the top-level directory with `node client/index`. This file is a script which will send an HTTP request to the server.

Think of the client as the _prover_ here. It needs to prove to the server that some `name` is in the `MERKLE_ROOT` on the server.

## Server

You can run the server from the top-level directory with `node server/index`. This file is an express server which will be hosted on port 1225 and respond to the client's request.

Think of the server as the _verifier_ here. It needs to verify that the `name` passed by the client is in the `MERKLE_ROOT`. If it is, then we can send the gift!

## Utils

There are a few files in utils:

- The `niceList.json` which contains all the names of the people who deserve a gift this year (this is randomly generated, feel free to add yourself and others to this list!)
- The `example.js` script shows how we can generate a root, generate a proof and verify that some value is in the root using the proof. Try it out from the top-level folder with `node/example.js`
- The `MerkleTree.js` should look familiar from the Merkle Tree module! This one has been modified so you should not have to deal with any crypto type conversion. You can import this in your client/server
- The `verifyProof.js` should also look familiar. This was the last stage in the module. You can use this function to prove a name is in the merkle root, as show in the example.

## Changes Made

#### On the client side :

- `index.js` builds the tree, gets the proof and sends the proof and the name in the request body :

```js
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
```

#### On the server side :

- `index.js` - includes a hardcoded root - derived modifying the niceList.json and using the getRoot function. It also verifies the proof and sends a gift

```js
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
```

## Closing Thoughts

- We shouldn't be hardcoding root but rather building it when we get the name. Both the client and the server should have access to a state trie - we don't have a persistent db yet

- This was simpler than the last module :)
