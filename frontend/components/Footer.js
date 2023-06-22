import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import market from "./market.png";

const Footer = ({ web3Handler, account }) => {
  return (
// {/* <div className = "Fixed-bottom"> */}
    <>
    <footer style={{position:"absolute",left:"0",bottom:"0",right:"0",  width : "100%", padding:"60" }}  className="Fixed-bottom footer mt-auto py-3 bg-light" >
hammad ali
    {/* <Navbar  expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="">
          <img src={market} width="40" height="40" className="" alt="" />
          &nbsp; Music NFTs  
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          Developed By : <a href="#login"> Hammad Ali & Hamas Ali</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}
    {/* </div> */}
    </footer>
    </>
  );
};

export default Footer;
