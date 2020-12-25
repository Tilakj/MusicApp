import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({ songs, setSongs, setcurrentSong, audioRef, isPlaying, libraryStatus }) => {
    return (
        <div className={`library ${libraryStatus && 'active-library'}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {
                    songs.map(song => (
                        <LibrarySong
                            key={song.id}
                            song={song}
                            songs={songs}
                            setSongs={setSongs}
                            audioRef={audioRef}
                            setcurrentSong={setcurrentSong}
                            isPlaying={isPlaying} />
                    ))
                }
            </div>
        </div>
    )
}
export default Library;

