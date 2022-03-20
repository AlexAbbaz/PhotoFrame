import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Frame } from './Frame.jsx';
import './index.css';

const App = () => {
    const [requestedPhotos, setRequestedPhotos] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(true);
    const [post, setPost] = useState(null);
    const [likedPhotosNumber, setLikedPhotosNumber] = useState(0);
    const [filtre, setFiltre] = useState('')

    let likedPhotosKeys = Object.keys(sessionStorage);

    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setPost(response.data);
        })
    }, [requestedPhotos, filtre]);

    const baseURL = "https://pixabay.com/api/?key=26010289-3e3cfc78eadc7e784cf9b62fa&image_type=photo&q="
        .concat(requestedPhotos)
        .concat("&order=")
        .concat(filtre);

    const typed = (text) => {
        setSearch(text);
    }

    const validate = () => {
        setRequestedPhotos(search);
        setSearch('');
    }

    if (!post) return null;

    const photosList = post.hits.map(item =>
        <Frame
            src={item.webformatURL}
            alt={item.tags}
            idNumber={item.id}
            key={item.id}
            likeP={() => setLikedPhotosNumber(likedPhotosNumber + 1)}
            dislikeP={() => setLikedPhotosNumber(likedPhotosNumber - 1)}
        />
    )


    const likedPhotos = likedPhotosKeys.map(item =>
        <Frame
            src={sessionStorage.getItem(item)}
            alt={item}
            idNumber={item}
            key={item}
            likeP={() => setLikedPhotosNumber(likedPhotosNumber + 1)}
            dislikeP={() => setLikedPhotosNumber(likedPhotosNumber - 1)}
        />
    )

    return (
        <div>
            <div className='nave'>
                <button onClick={() => setPage(true)}>Photos</button>
                <button onClick={() => setPage(false)}>MyPhotos</button>
            </div>
            {page ?
                <div>
                    <div className='search'>
                        <input
                            value={search}
                            onChange={(ev) => typed(ev.target.value)}
                            onKeyPress={(ev) => { if (ev.key === 'Enter') { validate() } }}
                        />
                        <button onClick={validate}>
                            +
                        </button>
                        <select name='filtre' onChange={(e) => setFiltre(e.target.value)} value={filtre}>
                            <option value={''}>Default</option>
                            <option value={'latest'}>Date</option>
                        </select>
                    </div>
                    <div className='cadre'>
                        {photosList}
                    </div>
                </div>
                :
                <div className='cadre'>
                    {likedPhotos}
                </div>
            }
        </div>
    )
}


export { App };