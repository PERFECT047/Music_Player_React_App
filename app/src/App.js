import React, {useState, useRef} from 'react';

//Adding Component
import Player from "./Components/Player";
import Song from "./Components/Song";
import Library from './Components/Library';

//Importing styles
import "./Styles/app.scss";

//Import Utils
import data from "./util";

const App = () => {
      //ref

      const audioRef = useRef(null);
  
  //State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
   });
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: currentTime, duration});
 }

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
      <Library setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong}/>
      <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} controls src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
