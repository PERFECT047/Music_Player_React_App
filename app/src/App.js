import React, {useState} from 'react';

//Adding Component
import Player from "./Components/Player";
import Song from "./Components/Song";
import Library from './Components/Library';

//Importing styles
import "./Styles/app.scss";

//Import Utils
import data from "./util";

const App = () => {
  
  //State
  const [songs, setsongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
      <Library songs={songs} currentSong={currentSong}/>
    </div>
  );
}

export default App;
