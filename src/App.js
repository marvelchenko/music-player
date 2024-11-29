import React, { useRef, useState, useEffect } from 'react';
import Player from './components/Player';
import { musicstore } from './components/MusicStore';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(musicstore[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioElem = useRef();

  // Update progress every time the song's currentTime changes
  useEffect(() => {
    const updateTime = () => {
      if (audioElem.current) {
        setCurrentTime(audioElem.current.currentTime);
        setDuration(audioElem.current.duration);
      }
    };

    // Update progress every 100ms
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, [audioElem]);

  // Handle when the song ends
  const handleSongEnd = () => {
    const currentIndex = musicstore.indexOf(currentSong);
    if (currentIndex < musicstore.length - 1) {
      // Move to next song if there's one
      const nextSong = musicstore[currentIndex + 1];
      setCurrentSong(nextSong); // Update the current song
      setIsPlaying(true)
    } else {
      // Stop if there's no next song
      setIsPlaying(false);
    }
  };

  // Play or pause the current song
  const togglePlayPause = () => {
    if (isPlaying) {
      audioElem.current.pause();
    } else {
      audioElem.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Function to go to the next song
  const nextSong = () => {
    const currentIndex = musicstore.indexOf(currentSong);
    if (currentIndex < musicstore.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentSong(musicstore[nextIndex]);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  // Function to go to the previous song
  const prevSong = () => {
    const currentIndex = musicstore.indexOf(currentSong);
    const prevIndex = (currentIndex - 1 + musicstore.length) % musicstore.length; // Circle back to the end when at the start
    setCurrentSong(musicstore[prevIndex]);
  };

  // Function to handle the progress bar click to seek to a specific time
  const handleProgressBarClick = (e) => {
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = e.target.clientWidth;
    const newTime = (clickPosition / progressBarWidth) * duration;
    audioElem.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play(); // Automatically start playing the song
    } else {
      audioElem.current.pause(); // Pause the song
    }
  }, [currentSong, isPlaying]);

  return (
    <>
      <div className="App">
        <audio
          ref={audioElem}
          src={currentSong.song}
          onEnded={handleSongEnd} // Call handleSongEnd when the song ends
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <Player
          song={currentSong}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          nextSong={nextSong}
          prevSong={prevSong}
          currentTime={currentTime}
          duration={duration}
          handleProgressBarClick={handleProgressBarClick}
        />
      </div>
    </>
  );
};

export default App;
