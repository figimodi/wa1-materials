import Nav from 'react-bootstrap/Nav';

function Sidebar() {
    return (
      <aside className='col-md-3'>
        <Nav className="d-none d-md-block bg-light" id="sidebar">
            <div className='list-group list-group-flush '>
            <Nav.Item>
                <Nav.Link id="filter-all" className='list-group-item active'>All</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link id="filter-favourites" className='list-group-item'>Favourites</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link id="filter-best" className='list-group-item'>Best Rated</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link id="filter-seen-last-month" className='list-group-item'>Seen Last Month</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link id="filter-unseen" className='list-group-item'>Unseen</Nav.Link>
            </Nav.Item>
            </div>
            
        </Nav>
      </aside>
    );
  }
  
  export default Sidebar;