import React, {useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons"

const Player = ({currentSong, isPlaying, setIsPlaying}) => {
    //ref

    const audioRef = useRef(null);
    //Event Handlers

    const playSongHandler = () => {
        if(isPlaying){
            setIsPlaying(!isPlaying);
            audioRef.current.pause();
        }else{
            audioRef.current.play(); 
            setIsPlaying(!isPlaying);
        }

     }

     const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime: currentTime, duration});
     }

     const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + (("0" + Math.floor(time % 60)).slice(-2))
        )
     }

     const dragHandler = (e) => {
         audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
     }
     //State
     const [songInfo, setSongInfo] = useState({
         currentTime: 0,
         duration: 0,
        });

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input onChange={dragHandler} min={0} max={songInfo.duration} type="range" value={songInfo.currentTime} />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />   
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} controls src={currentSong.audio}></audio>
        </div>
    );
};

export default Player;