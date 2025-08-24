import { FaInfoCircle, FaPencilAlt} from "react-icons/fa"
import { useNavigate } from "react-router"

const CreatorCard = ({ creator }) => {

    const navigate = useNavigate()
    
    const cardStyle = {
        backgroundImage: creator.imageURL 
            ? `url(${creator.imageURL})` 
            : `url(https://img.freepik.com/premium-photo/abstract-dark-blue-blurred-gradient-background-wallpaper-product-presentation-decor-equipment_718526-13341.jpg?semt=ais_hybrid&w=740&q=80)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'multiply',
        backgroundColor: creator.imageURL ? 'rgba(0, 0, 0, 0.5)' : 'none'
    }
    
    return (
        <div className="creator-card" style={cardStyle}>
            <div className="header">
                <h2>{creator.name}</h2>
                <div>
                    <button 
                        onClick={() => {
                            navigate(`/view/${creator.id}`)
                        }}
                    ><FaInfoCircle/></button>
                    <button
                        onClick={() => {
                            navigate(`/edit/${creator.id}`)
                        }}
                    ><FaPencilAlt/></button>
                </div>
            </div>
            <div className="sm-icons">
                {creator.youtubeURL && (
                    <button onClick={() => window.open(`https://www.youtube.com/@${creator.youtubeURL}`, '_blank')}>
                        YouTube
                    </button>
                )}
                {creator.xURL && (
                    <button onClick={() => window.open(`https://twitter.com/${creator.xURL}`, '_blank')}>
                        X
                    </button>
                )}
                {creator.instagramURL && (
                    <button onClick={() => window.open(`https://instagram.com/${creator.instagramURL}`, '_blank')}>
                        Instagram
                    </button>
                )}
            </div>
            <p className="description">{creator.description}</p>
        </div>
    )
}

export default CreatorCard;