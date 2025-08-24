import UpperPage from '../components/upperHomepage'
import CreatorCard from '../components/creatorCard'
import './page-styles/ShowCreators.css'
import { useEffect, useState } from 'react'
import { supabase } from '../client'
import {Riple} from 'react-loading-indicators'

const ShowCreators = () => {

  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCreators = async () => {
    setLoading(true)

    try {
      const { data, error } = await supabase.from('creators').select("*")
      
      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      const sortedCreators = (data || []).sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      )

      setCreators(sortedCreators)
      setLoading(false)
    }
    catch (err) {
      setError('Failed to fetch creators')
      setLoading(false)
    }
  }



  useEffect(() => {
    fetchCreators()
  }, [])


  if (loading){
    return (
      <div className='homepage'>
        <UpperPage/>  
        <h2>Loading All Creators</h2>
        <Riple color="#190fd6" size="medium" text="" textColor="" />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className='homepage'> 
        <UpperPage/>  
        <h2>Oops, something went wrong... </h2>
        <p>Error: {error}</p>
      </div>
    )
  }
  
  if (creators.length === 0){
    return (
      <div className='homepage'>
        <UpperPage/>  
        <h2>No creators found...</h2>
      </div>
    )
  }

  return (
      <div className='homepage'>
        <UpperPage/>  
        <div className='bottom-page'>
            <h2>All Creators</h2>
            <div className='creators-grid'>
              {creators.map(creator => (
                <CreatorCard
                  key= {creator.id}
                  creator = {creator}
                />
              ))}
            </div>
        </div>
      </div>
  )
}

export default ShowCreators

