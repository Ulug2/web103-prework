import UpperPage from '../components/upperHomepage'
import { useState } from 'react'
import { supabase } from "../client"
import './page-styles/AddCreator.css'
import { useNavigate } from 'react-router'


const AddCreator = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [youtubeURL, setYoutubeURL] = useState('')
    const [xURL, setXURL] = useState('')
    const [instagramURL, setInstagramURL] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const nav = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name.trim()){
            alert("Please enter a creator's name")
            return
        }

        if (!xURL && !instagramURL && !youtubeURL) {
            alert("Provide at least one of the creator's social media links.")
            return
        }

        setIsSubmitting(true)


        try { ///???????
            const {data, error} = await supabase.from('creators').insert([
                {
                    name: name.trim(),
                    youtubeURL: youtubeURL.trim(),
                    description: description.trim(),
                    imageURL: imageURL.trim(),
                    xURL: xURL.trim(),
                    instagramURL: instagramURL.trim()
                }
            ])

            if (error) {
                console.error('Error adding creator:', error)
                console.error('Error details:', error.message)
                console.error('Error code:', error.code)
                alert(`Error adding creator: ${error.message}. Please try again.`)
            } 
            else {
                alert('Creator added successfully!')
                setName('')
                setDescription('')
                setImageURL('')
                setYoutubeURL('')
                setXURL('')
                setInstagramURL('')
                nav('/show')
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


    return (

        
        <div>
            <UpperPage/>
            <form onSubmit={handleSubmit} className='form'>
                <div className="form-input">
                    <label>Name</label>
                    <input
                        type='text'
                        id="name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-input">
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

                <div className="form-input">
                    <label>Description</label>
                    <input
                        type='text'
                        id="description"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <h2>SOCIAL MEDIA LINKS</h2>
                    <p>Provide at least one of the creator's social media links.</p>
                </div>

                <div className="form-input">
                    <label>Youtube</label>
                    <p>The creator's YouTube handle (without the @)</p>
                    <input
                        type='text'
                        id="youtubeURL"
                        value={youtubeURL}
                        onChange={(e)=> setYoutubeURL(e.target.value)}
                    />
                </div>

                <div className="form-input">
                    <label>X</label>
                    <p>The creator's X handle (without the @)</p>
                    <input
                        type='text'
                        id="xURL"
                        value={xURL}
                        onChange={(e)=> setXURL(e.target.value)}
                    />
                </div>

                <div className="form-input">
                    <label>Instagram</label>
                    <p>The creator's Instagram handle (without the @)</p>
                    <input
                        type='text'
                        id="instagramURL"
                        value={instagramURL}
                        onChange={(e)=> setInstagramURL(e.target.value)}
                    />
                </div>

                <div className="form-submit-button">
                    <button
                        type='submit'
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCreator;