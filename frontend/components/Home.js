import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Link } from "react-router-dom";
import { Row, Col, Card, Nav, Button,  } from 'react-bootstrap'

const Home = ({ marketplace, nft }) => {
  
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
    <div className="container my-5">
    <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 className="display-4 fw-bold lh-1">Discover, collect, and sell extraordinary NFTs</h1>
        <p className="lead">Explore on the world's first Music NFT marketplace.</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
          <button type="button"  className="btn btn-dark btn-lg px-4 me-md-2 fw-bold">
          <Nav.Link as={Link} to="/create">
          Mint NFTs
              </Nav.Link></button>
          <button type="button" className="btn btn-outline-secondary btn-lg px-4">
          <Nav.Link as={Link} to="/explore">
          Explore NFTs
              </Nav.Link>
          </button>
        </div>
      </div>
      <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img className="rounded-lg-3" src="assets/img/home.jpg" alt="" width="720"/>
      </div>
    </div>
  </div>

<div> 
  <h2  className="display-4 fw-bold lh-1 ">
    Trending NFTs
  </h2>
</div>
    <div className="flex justify-center ">
      {items.length > 0 ?
        <div className="px-5 container ">
          <Row xs={1} md={2} lg={4} className="g-4 py-5 ">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden ">
                <Card className = "rounded-3 border shadow">
                <video width="auto" height={200} controls controlsList="nodownload" >
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
export default Home