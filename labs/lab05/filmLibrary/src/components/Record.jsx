import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function Record({title, favourite, date, rating}) {
    return (
        <tr>
            <td>{title}</td>
            <td>{favourite}</td>
            <td>{date}</td>
            <td>{Array(rating).map((key) => {
                <FontAwesomeIcon icon={faStar} key={key} size="lg"/>
            })}</td>
        </tr>
    );
}

export default Record;