import './comp-styles/UpperHomepage.css'
import { useNavigate } from 'react-router';

function UpperPage() {

    let navigate = useNavigate();

    return (
    <div className='upper-homepage'>
        <h1>CREATORVERSE</h1>
        <div className='upper-buttons'>
        <button onClick={
                () => {
                    navigate("/show")
                }
                }
        >
            VIEW ALL CREATORS
        </button>
        <button 
            onClick={
                () => {
                    navigate("/add")
                }
            }>
            ADD A CREATOR
        </button>
        </div>
    </div>
    )
}

export default UpperPage;

