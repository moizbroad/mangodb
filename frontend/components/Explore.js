import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Link } from "react-router-dom";
import { Row, Col, Card,  Button, Nav  } from 'react-bootstrap'

const Explore = ({ marketplace, nft }) => {
  
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
 
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image
        })
      }
    }
    setLoading(false)
    setItems(items)
  }

  const buyMarketItem = async (item) => {
    
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait()
    loadMarketplaceItems()
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
<>
<div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="assets/img/home.jpg" height = {500} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
      <h1 className="display-4 fw-bold lh-1">Find your favourite NFT here.</h1>
      </div>
    </div>
    <div className="carousel-item">
      <img src="assets/img/c7.jpg" height = {500}  className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
      <h1 className="display-4 fw-bold lh-1">Find your favourite NFT here.</h1>
      </div>
    </div>
    <div className="carousel-item">
      <img src="assets/img/c8.jpg" height = {500} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
      <h1 className="display-4 fw-bold lh-1">Find your favourite NFT here.</h1>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>



    <div className="flex justify-center">
      {items.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card >
                <video width="auto" height={200} controls controlsList="nodownload">
                <source src={item.image} type="video/mp4"/>
                </video>
                  {/* <Card.Img variant="top" src={item.image} /> */}
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => buyMarketItem(item)} variant="outline-dark" size="md">
                        Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
    </>
  );
}
export default Explore