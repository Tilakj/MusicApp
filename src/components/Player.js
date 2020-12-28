import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";
// import { PlayAudio } from '../util';
const Player = ({
  currentSong,
  setIsPlaying,
  isPlaying,
  audioRef,
  setcurrentSong,
  songs,
  setSongs
}) => {
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  });

  const songSelectedHandler = nextPrev => {
    const newSongs = songs.map(s => {
      if (s.id === nextPrev.id) {
        return { ...s, active: true };
      } else {
        return { ...s, active: false };
      }
    });
    setSongs(newSongs);
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const timeUpdateHandler = e => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    // calc percentage
    const animationPercentage = Math.round(currentTime / duration * 100);
    console.log(animationPercentage);
    setSongInfo({ ...songInfo, currentTime, duration, animationPercentage });
  };
  const dragHandler = e => {
    setSongInfo({ ...songInfo, currentTime: e.target.value });
    audioRef.current.currentTime = e.target.value;
  };
  const songEndHandler = async () => {
    const index = songs.findIndex(song => song.id === currentSong.id);
    await setcurrentSong(songs[(index + 1) % songs.length]);
    songSelectedHandler(songs[(index + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };
  const getTime = totalSeconds => {
    // console.log(new Date(seconds * 1000).toISOString().substr(11, 8).toString())
    // let hours = Math.floor(totalSeconds / 3600);
    // totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    // If you want strings with leading zeroes:
    // hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return minutes + ":" + seconds;
  };
  const skipTrackHandler = async direction => {
    const index = songs.findIndex(song => song.id === currentSong.id);
    switch (direction) {
      case "skip-back":
        if ((index - 1) % songs.length < 0) {
          await setcurrentSong(songs[songs.length - 1]);
          songSelectedHandler(songs[songs.length - 1]);
        } else {
          await setcurrentSong(songs[(index - 1) % songs.length]);
          songSelectedHandler(songs[(index - 1) % songs.length]);
        }
        // PlayAudio(isPlaying, audioRef);
        if (isPlaying) audioRef.current.play();
        break;
      case "skip-forward":
        await setcurrentSong(songs[(index + 1) % songs.length]);
        songSelectedHandler(songs[(index + 1) % songs.length]);
        // PlayAudio(isPlaying, audioRef);
        if (isPlaying) audioRef.current.play();
        break;
      default:
        break;
    }
  };
  const animateTrack = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
    transition: "all 0.3s ease"
  };
  return (
    <div className="player-container">
      <div className="time-control">
        <p>
          {getTime(songInfo.currentTime)}
        </p>
        <div
          style={{
            background: `linear-gradient(to right,${currentSong
              .color[0]},${currentSong.color[1]})`
          }}
          className="track"
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div style={animateTrack} className="animate-track" />
        </div>
        <p>
          {songInfo.duration ? getTime(songInfo.duration) : "00:00"}
        </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      />
    </div>
  );
};
export default Player;
