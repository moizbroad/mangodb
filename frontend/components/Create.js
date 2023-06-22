import { useState } from "react";
import { ethers } from "ethers";
import { Row, Form, Button } from "react-bootstrap";
import { create as ipfsHttpClient } from "ipfs-http-client";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState("");
  // const [video, setvideo] = useState('')
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    var allowedExtensions = /(\.jpg|\.mp4|\.mp3|\.mkv)$/i;
    // && typeof file ==allowedExtensions
    if (typeof file !== "undefined") {
      if (typeof file !== allowedExtensions) {
        try {
          const result = await client.add(file);
          console.log(result);
          setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
        } catch (error) {
          console.log("ipfs image upload error: ", error);
        }
      } else {
        alert("invalid file type");
      }
    }
  };
  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      const result = await client.add(
        JSON.stringify({ image, price, name, description })
      );
      mintThenList(result);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
      alert("Error!");
    }
  };
  const mintThenList = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
    // mint nft
    await (await nft.mint(uri)).wait();
    // get tokenId of new nft
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait();
    alert("NFT Minted");
  };

  function fileValidation() {
    var fileInput = document.getElementById("file");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.jpg|\.mp4|\.mkv)$/i;

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    } else {
      // uploadToIPFS();
      // // Image preview
      // if (fileInput.files && fileInput.files[0]) {
      //   var reader = new FileReader();
      //   reader.onload = function(e) {
      //     document.getElementById(
      //       'imagePreview').innerHTML =
      //       '<video src="' + e.target.result
      //       + '"/>';
      //   };
      //   reader.readAsDataURL(fileInput.files[0]);
      // }
    }
  }

  return (
    <>
      <div className="px-4 py-3 my-5 text-center">
        <img
          className="d-block mx-auto mb-4"
          src="https://i0.wp.com/www.nftgators.com/wp-content/uploads/2021/12/image.png?resize=800%2C417&ssl=1"
          // src = "public\assets\img\create2.jpg"
          alt=""
        />
        <h1 className="display-5 fw-bold">Mint / Create your Music NFTs</h1>
      </div>

      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 mx-auto"
            style={{ maxWidth: "1000px" }}
          >
            <div className="content mx-auto">
              <Row className="g-4">
                <Form.Control
                  type="file"
                  required
                  name="file"
                  id="file"
                  accept=".mp3, .mp4"
                  // onChange={fileValidation}
                  onChange={uploadToIPFS}
                />
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  size="lg"
                  required
                  type="text"
                  placeholder="Name"
                />
                <Form.Control
                  onChange={(e) => setDescription(e.target.value)}
                  size="lg"
                  required
                  as="textarea"
                  placeholder="Description"
                />
                <Form.Control
                  onChange={(e) => setPrice(e.target.value)}
                  size="lg"
                  required
                  type="number"
                  placeholder="Price in ETH"
                />
                <div className="d-grid px-0">
                  <Button onClick={createNFT} variant="primary" size="lg">
                    Create & List NFT!
                  </Button>
                </div>
              </Row>
            </div>
          </main>
        </div>
      </div>
      <br />
    </>
  );
};

export default Create;
