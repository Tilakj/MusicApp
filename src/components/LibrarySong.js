import React from 'react'
// import { PlayAudio } from '../util'
export default function LibrarySong({ song, songs, setSongs, setcurrentSong, audioRef, isPlaying }) {
    const songSelectedHandler = async () => {
        await setcurrentSong(song);
        const newSongs = songs.map(s => {
            if (s.id === song.id) {
                return { ...s, active: true }
            }
            else {
                return { ...s, active: false }
            }
        })
        setSongs(newSongs);
        // PlayAudio(isPlaying, audioRef);
        if (isPlaying) 
         audioRef.current.play();

    }
    return (
        <div onClick={songSelectedHandler} className={`library-song ${song.active && 'selected'}`}>
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}
