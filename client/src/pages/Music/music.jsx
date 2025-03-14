import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Search from './images/Search.png';
import music1 from './images/music1.png';
import music2 from './images/music2.png';
import music3 from './images/music3.png';
import music4 from './images/music4.png';
import music5 from './images/music5.png';
import Play from './images/Play.png';
import Stop from './images/Stop.png';
import skipforward from './images/skipforward.png';
import skipbackward from './images/skipbackward.png';
import levaEternity from './audio/levaEternity.mp3';
import reflected from './audio/reflected.mp3';
import ToTheSoul from './audio/ToTheSoul.mp3';
import theBeatOfNature from './audio/theBeatOfNature.mp3';
import atmospherepiano from './audio/atmospherepiano.mp3';

const songsData = [
  {
    title: 'Leva - Eternity',
    author: 'lemonmusicstudio',
    image: music1,
    audio: levaEternity,
  },
  {
    title: 'Reflected Light',
    author: 'SergePavkinMusic',
    image: music2,
    audio: reflected,
  },
  {
    title: 'A call to the soul',
    author: 'markotopa',
    image:  music3,
    audio:  ToTheSoul,
  },
  {
    title: 'The Beat of Nature',
    author: 'Olexy',
    image:  music4,
    audio:  theBeatOfNature,
  },
  {
    title: 'Atmosphere Piano',
    author: 'The_Mountain',
    image:  music5,
    audio:  atmospherepiano,
  },
  
];

function Music() {
  const [selectedSong, setSelectedSong] = useState(songsData[0]);
  const [audioRef, setAudioRef] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isStopped, setIsStopped] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songsData);

 
  const playNextSong = () => {
    const currentIndex = songsData.findIndex((song) => song === selectedSong);
    if (currentIndex < songsData.length - 1) {
      handleSelectSong(songsData[currentIndex + 1]);
    }
  }

  useEffect(() => {
    if (audioRef) {
      audioRef.addEventListener('loadedmetadata', () => {
        const audioDuration = audioRef.duration;
        setDuration(audioDuration);
      });

      audioRef.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.currentTime);
      });

      audioRef.addEventListener('ended', () => {
        playNextSong();
      });
    }
  }, [audioRef, selectedSong]);

  const handleSelectSong = (song) => {
    if (audioRef) {
  
      audioRef.pause();
      audioRef.currentTime = 0;
      setSelectedSong(song);
      audioRef.src = song.audio;
      audioRef.load();
      audioRef.play().catch((error) => {
        console.error("Error while playing audio:", error);
      });
  
      setIsPlaying(true);
    }
  };
  const stopAudio = () => {
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const playAudio = () => {
    if (audioRef) {
      if (audioRef.paused) {
        audioRef.play().catch((error) => {
          console.error("Error while playing audio:", error);
        });
      } else {
        audioRef.pause();
      }
      setIsPlaying(!audioRef.paused);
    }
  };

  const skipForward = () => {
    if (audioRef) {
      audioRef.currentTime += 10; 
    }
  };

  const skipBackward = () => {
    if (audioRef) {
      audioRef.currentTime -= 10; 
    }
  };
  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    const filtered = songsData.filter((song) =>
      song.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  return (
    
      <div className={styles.bodyBlock}>
      <div className={styles.oval}></div>
      <div className={styles.pageHeader}>Muzyka</div>
      <div className={styles.searchApp}>
        <div className={styles.searchContainer}>
          <img src={Search} alt="Search" className={styles.searchIcon} />
          <input
  type="text"
  placeholder="Wyszukaj audio"
  value={searchText}
  onChange={handleSearch}
  className={styles.searchInput}
/>

        </div>
      </div>
      <div className={styles.selectMusic}>
        <p className={styles.medetetion}>Do medytacji</p>
        <p className={styles.pText}>Odprężające</p>
        <p className={styles.pText}>Do nauki</p>
        <p className={styles.pText}>Dźwięki</p>
        <div className={styles.songsContainer}>
        <div className={styles.songList}>
        
        <div className={styles.songListContainer}>
  <ul>
    {filteredSongs.map((song, index) => (
      <li key={index} className={`${styles.songListItem} ${selectedSong === song && isPlaying ? styles.activeSong : ''}`}>
        <button onClick={() => handleSelectSong(song)} className={styles.playButton}>
          <img src={(selectedSong === song && isPlaying) ? Stop : Play} alt={(selectedSong === song && isPlaying) ? "Stop" : "Play"} />
        </button>
        <img src={song.image} alt={song.title} />
        <div className={styles.songInfo}>
          <p className={styles.songTitle}>{song.title}</p>
          <p className={styles.songAuthor}>{song.author}</p>
        </div>
      </li>
    ))}
  </ul>
</div>

</div>

          
        </div>
      </div>

      {selectedSong && (
  <div className={styles.playerContainer}>
    <div className={styles.audioPlayerContainer}>
      <audio ref={(audio) => setAudioRef(audio)}>
        <source src={selectedSong.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      
      <div className={styles.customAudioControls}>
        
        <button onClick={skipBackward} className={styles.skipBackwardButton}>
          <img src={skipbackward} alt="Rewind" />
        </button>
        <button onClick={playAudio} className={styles.playButton}>
          {isPlaying ? (
            <img src={Stop} alt="Stop" />
          ) : (
            <img src={Play} alt="Play" />
          )}
        </button>
        <button onClick={skipForward} className={styles.skipForwardButton}>
          <img src={skipforward} alt="Fast Forward" />
        </button>
        
      </div>
      
    </div>
    
  </div>
  
      )}
      <div className={styles.slider}>
  {selectedSong && ( 
    <input
      type="range"
      min="0"
      max={audioRef ? audioRef.duration || 0 : 0}
      step="0.01"
      value={audioRef ? currentTime : 0}
      onChange={(e) => (audioRef.currentTime = e.target.value)}
      className={styles.progressSlider} 
    />
  )}
</div>



    </div>
  );
}

export default Music;
