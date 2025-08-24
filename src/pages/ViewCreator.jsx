import { Link } from "react-router"
import {supabase} from '../client'
import { useEffect, useState } from "react"
import {Riple} from 'react-loading-indicators'
import { useParams } from "react-router"
import { FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa'
import './page-styles/ViewCreator.css'
import { useNavigate } from "react-router"

const ViewCreator = () => {
    const { id } = useParams() 
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [creator, setCreator] = useState(null)
    const navigate = useNavigate()

    const fetchCreator = async () => {
        setIsLoading(true)

        try {
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                setError(error.message)
                setIsLoading(false)
                return
            }

            setCreator(data)
            setIsLoading(false)

        } 
        catch(err) {
            setError("Failed to load creator")
            setIsLoading(false)
        }
    }


    useEffect(() => {
        fetchCreator()
    }, [id]) 

    if (isLoading){
        return (
            <div className="loading-container">
                <h2>Loading creator...</h2>
                <Riple color="#4a90e2" size="medium" text="" textColor="" />
            </div>
        )
    }
  
    if (error) {
        return (
            <div className="error-container"> 
                <h2>Oops, something went wrong...</h2>
                <p>Error: {error}</p>
            </div>
        )
    }
  
    if (!creator){
        return (
            <div className="not-found-container">
                <h2>No creator found...</h2>
                <Link to="/show" className="back-link">← Back to All Creators</Link>
            </div>
        )
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${creator.name}? This action cannot be undone.`
        );
        
        if (!confirmDelete) {
            return;
        }

        try {
            const { error } = await supabase
                .from('creators')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Delete error:', error);
                alert(`Failed to delete creator: ${error.message}`);
                return;
            }

            alert(`${creator.name} has been deleted successfully!`);
            navigate("/show");
        }
        catch(e) {
            console.error('Unexpected delete error:', e);
            alert(`An unexpected error occurred: ${e.message}`);
        }
    }


    return (
        <div className="view-creator-page">
            <Link to="/show" className="back-link">← Back to All Creators</Link>
            
            <div className="creator-container">
                <div className="creator-image">
                    <img 
                        src={creator.imageURL || 'https://via.placeholder.com/400x500?text=No+Image'} 
                        alt={creator.name}
                    />
                </div>
                
                <div className="creator-info">
                    <h1 className="creator-name">{creator.name}</h1>
                    <p className="creator-description">{creator.description}</p>
                    
                    <div className="social-links">
                        {creator.youtubeURL && (
                            <a href={`https://www.youtube.com/@${creator.youtubeURL}`} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="social-link youtube-link">
                                <FaYoutube className="social-icon" />
                                <span>@{creator.youtubeURL}</span>
                            </a>
                        )}
                        
                        {creator.xURL && (
                            <a href={`https://twitter.com/${creator.xURL}`} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="social-link twitter-link">
                                <FaTwitter className="social-icon" />
                                <span>@{creator.xURL}</span>
                            </a>
                        )}
                        
                        {creator.instagramURL && (
                            <a href={`https://instagram.com/${creator.instagramURL}`} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="social-link instagram-link">
                                <FaInstagram className="social-icon" />
                                <span>@{creator.instagramURL}</span>
                            </a>
                        )}
                    </div>
                    
                    <div className="action-buttons">
                        <button className="edit-btn"
                            onClick={() => {
                                navigate(`/edit/${id}`)
                            }}
                        >EDIT</button>
                        <button
                            type='button'
                            className="delete-btn"
                            onClick={() => {handleDelete()}}
                        >
                            DELETE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCreator;