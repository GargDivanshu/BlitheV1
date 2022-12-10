import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import MasonryLayout from './MasonryLayout';
import { client } from './../client';
import Spinner from './Spinner'
import {searchQuery} from './../utilities/data';
import { feedQuery } from './../utilities/data';


const Feed = () => {
    const [loading, setLoading] = useState(false);
    const {categoryId} = useParams();
    const [pins, setPins] = useState(null);
    useEffect(() => {
        setLoading(true);
        if(categoryId) {
            const query = searchQuery(categoryId);

            client.fetch(query).then((data) => {
              setPins(data);
              setLoading(false);
            })
        } else {
          client.fetch(feedQuery).then((data) => {
            setPins(data); 
            setLoading(false);
          });
        }
    }, [categoryId])

    if(loading) return <Spinner message="we are adding new ideas to your feed" />
  return (
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Feed