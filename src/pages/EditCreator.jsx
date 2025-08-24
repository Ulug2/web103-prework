import UpperPage from '../components/upperHomepage'
import { useState, useEffect} from 'react'
import { supabase } from "../client"
import './page-styles/EditCreator.css'
import { useParams, Link } from 'react-router'
import {Riple} from 'react-loading-indicators'
import { useNavigate } from 'react-router'


const EditCreator = () => {

    const {id} = useParams()
    const [creator, setCreator] = useState(null)
    const [loading, setIsLoading] = useState(true)
    const [err, setError] = useState(null)

    const fetchCreator = async () => {
        setIsLoading(true)

        try {
            const {data, error} = await supabase.from('creators').select('*')
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
        catch(e) {
            setError("Failed to fetch a creator")
            setIsLoading(false)
        }
    }

    useEffect(()=> {
        fetchCreator()
    }, [id])

    if (loading){
        return (
            <div className="loading-container">
                <h2>Loading creator...</h2>
                <Riple color="#4a90e2" size="medium" text="" textColor="" />
            </div>
        )
    }
  
    if (err) {
        return (
            <div className="error-container"> 
                <h2 style={{ backgroundColor: 'white' }}>Oops, something went wrong...</h2>
                <p>Error: {err}</p>
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

    return <EditCreatorForm creator={creator} creatorId={id} />
}

const EditCreatorForm = ({ creator, creatorId }) => {
    const navigate = useNavigate()
    const [name, setName] = useState(creator.name || '')
    const [description, setDescription] = useState(creator.description || '')
    const [imageURL, setImageURL] = useState(creator.imageURL || '')
    const [youtubeURL, setYoutubeURL] = useState(creator.youtubeURL || '')
    const [xURL, setXURL] = useState(creator.xURL || '')
    const [instagramURL, setInstagramURL] = useState(creator.instagramURL || '')
    const [isSubmitting, setIsSubmitting] = useState(false)



    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name.trim()){
            alert("Please enter a creator's name")
            return
        }

        if (!xURL.trim() && !instagramURL.trim() && !youtubeURL.trim()) {
            alert("Provide at least one of the creator's social media links.")
            return
        }

        setIsSubmitting(true)


        try {
            const {data, error} = await supabase.from('creators').update(
                {
                    name: name.trim(),
                    youtubeURL: youtubeURL.trim(),
                    description: description.trim(),
                    imageURL: imageURL.trim(),
                    xURL: xURL.trim(),
                    instagramURL: instagramURL.trim()
                }
            ).eq('id', creatorId)

            if (error) {
                console.error('Error updating creator:', error)
                console.error('Error details:', error.message)
                console.error('Error code:', error.code)
                alert(`Error updating creator: ${error.message}. Please try again.`)
            } 
            else {
                alert('Creator updated successfully!')
                navigate('/show')
            }

        }
        catch (error){
            console.error('Unexpected error:', error)
            alert('An unexpected error occurred. Please try again.')
        }
        finally {
            setIsSubmitting(false)
        }
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
                .eq('id', creatorId);

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
        <div className="edit-creator-container">
            <UpperPage/>
            <form onSubmit={handleSubmit} className='edit-creator-form'>
                <div className="edit-form-input">
                    <label>Name</label>
                    <input
                        type='text'
                        id="name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        required
                    />
                </div>

                <div className="edit-form-input">
                    <label>
                        Image
                        <p>Provide a link to an image of your creator. Be sure to include the http://</p>
                    </label>
                    <input
                        type='text'
                        id="image"
                        value={imageURL}
                        onChange={(e)=> setImageURL(e.target.value)}
                    />
                </div>

                <div className="edit-form-input">
                    <label>Description</label>
                    <input
                        type='text'
                        id="description"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="edit-social-section">
                    <h2>SOCIAL MEDIA LINKS</h2>
                    <p>Provide at least one of the creator's social media links.</p>
                </div>

                <div className="edit-form-input">
                    <label>Youtube</label>
                    <p>The creator's YouTube handle (without the @)</p>
                    <input
                        type='text'
                        id="youtubeURL"
                        value={youtubeURL}
                        onChange={(e)=> setYoutubeURL(e.target.value)}
                    />
                </div>

                <div className="edit-form-input">
                    <label>X</label>
                    <p>The creator's X handle (without the @)</p>
                    <input
                        type='text'
                        id="xURL"
                        value={xURL}
                        onChange={(e)=> setXURL(e.target.value)}
                    />
                </div>

                <div className="edit-form-input">
                    <label>Instagram</label>
                    <p>The creator's Instagram handle (without the @)</p>
                    <input
                        type='text'
                        id="instagramURL"
                        value={instagramURL}
                        onChange={(e)=> setInstagramURL(e.target.value)}
                    />
                </div>

                <div className="edit-form-buttons">
                    <button
                        type='submit'
                        className="edit-submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Updating..." : "Update"}
                    </button>
                    <button
                        type="button"
                        className="edit-delete-btn"
                        onClick={()=> {handleDelete()}}
                    >
                        DELETE
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditCreator;