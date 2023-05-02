import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faUser } from '@fortawesome/free-solid-svg-icons'


function Header() {
    return (
      <Navbar bg="primary" variant="dark" sticky="top" className="justify-content-around">
        <Navbar.Brand href="#home">
            <FontAwesomeIcon icon={faFilm}/> Film Library
        </Navbar.Brand>
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="light">Search</Button>
        </Form>
        <Navbar.Text>
            <FontAwesomeIcon icon={faUser} size="lg"/> User
        </Navbar.Text>
      </Navbar>
    );
  }
  
  export default Header;