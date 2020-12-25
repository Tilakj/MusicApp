export const PlayAudio = (isPlaying, audioRef) => {
    if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise) {
            playPromise.then(() => {
                audioRef.current.play()
            })
        }
    }
}