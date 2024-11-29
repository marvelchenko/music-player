import './Player.css';
import { ProgressBar } from 'react-bootstrap';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { FaPlayCircle } from 'react-icons/fa';
import { FaCirclePause } from 'react-icons/fa6';

const Player = ({ song, isPlaying, togglePlayPause, nextSong, prevSong, currentTime, duration, handleProgressBarClick }) => {
    const progress = (currentTime / duration) * 100;
  return (
    <div className="custom-container w-100 w-sm-50 w-md-50">
      <div className="img-icon">
        <div className="img">
          <img src={song.img} alt={song.title} />
        </div>
        <h3>{song.artist}</h3>
        <p>{song.title}</p>
      </div>
      <div className="player-progress">
        <ProgressBar now={progress} variant="danger" className='progress' onClick={handleProgressBarClick}  />
      </div>

      <div className="player-icon">
        <TbPlayerTrackPrevFilled className="text-danger p-icon" onClick={nextSong} />
        <button onClick={togglePlayPause} className="btn">
          {isPlaying ? (
            <FaCirclePause className="p-iconCircle text-danger" />
          ) : (
            <FaPlayCircle className="p-iconCircle text-danger" />
          )}
        </button>
        <TbPlayerTrackNextFilled className="p-icon text-danger" onClick={prevSong} />
      </div>
    </div>
  );
};

export default Player;
