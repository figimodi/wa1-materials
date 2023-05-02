import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Record from './Record'

function Page() {
    return (
        <div className="col-md-9" id="page">
            <h1 className="mb-2" id="filter-title">All</h1>

            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Favourite</th>
                    <th>View Date</th>
                    <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    <Record title="Pulp Fiction" favourite="true" date="14/07/2000" rating="5"/>               
                </tbody>
            </Table>

            <Button variant='primary' className='fixed-right-bottom btn-lg'>
                &#43;
            </Button>
        </div>
    );
  }
  
  export default Page;