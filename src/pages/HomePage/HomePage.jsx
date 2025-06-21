import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  Description,
  MovieListContainer,
  Title,
  Trailer,
  TrailerAction,
  TrailerContent,
  TrailerOverlay,
  Wrapper
} from './HomePage.style';
import { API_KEY, base_img_url, BASE_URL, fetchData } from '../../api/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlay } from '@fortawesome/free-solid-svg-icons';
import MovieSection from '../../components/MovieSection/MovieSection';
import { Button, Footer } from '../../components';
import MovieDetail from '../../components/MovieDetail/MovieDetail';
import YouTube from 'react-youtube';
import Loader from './Loader/Loader';

const HomePage = () => {
  const [trailerVideo, setTrailerVideo] = useState();
  const [open, setOpen] = useState(false);
  const [play, setPlay] = useState(false);
  const [player, setPlayer] = useState();
  const [loading, setLoading] = useState(true);
  const [buttonClick, setClick] = useState(true);
  const [scaleHeight, setScaleHeight] = useState(0);

  // Local replacements for Redux state
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [trailer, setTrailer] = useState(null);

  const { fetchTopRated, fetchPopular, fetchUpcoming } = fetchData;
  const wrapperRef = useRef();

  const [opts] = useState({
    playerVars: {
      controls: 0,
      autoplay: 0,
      end: 30,
      modestbranding: 1
    }
  });

  const playTrailer = () => {
    setPlay(true);
    setScaleHeight(document.getElementById('trailer-description')?.clientHeight);
    if (buttonClick && player) {
      player.playVideo();
      document.getElementById('trailer-title').classList.add('scaleDownTitle');
      document.getElementById('trailer-description').classList.add('scaleDownDescription');
      setClick((prev) => !prev);
    } else if (player) {
      player.pauseVideo();
      setClick((prev) => !prev);
    }
  };

  const renderTrailer = () => {
    const trailerResult = trailerVideo?.results?.[0];
    if (trailerResult) {
      return (
        <YouTube
          videoId={trailerResult.key}
          id={'trailer-ytb'}
          title={trailerResult.name}
          opts={opts}
          onReady={(event) => setPlayer(event.target)}
          onEnd={(event) => {
            event.target.seekTo(0);
            event.target.pauseVideo();
            setClick(true);
            setPlay(false);
            document.getElementById('trailer-title').classList.remove('scaleDownTitle');
            document.getElementById('trailer-description').classList.remove('scaleDownDescription');
          }}
        />
      );
    }
  };

  const handleTrailerDetail = async () => {
    if (!trailer) return;
    const detailRes = await axios.get(`${BASE_URL}/movie/${trailer.id}?api_key=${API_KEY}`);
    setMovie(detailRes.data);
    const videoRes = await axios.get(`${BASE_URL}/movie/${detailRes.data.id}/videos`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'videos'
      }
    });
    setVideos(videoRes.data.results);
    setOpen(true);
  };

  useEffect(() => {
    // Pick a random movie to use as a trailer
    const randomTrailer = Math.floor((Math.random() + 100) * 100);

    const fetchTrailer = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movie/${randomTrailer}`, {
          params: {
            api_key: API_KEY
          }
        });
        setTrailer(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movie/${randomTrailer}/videos`, {
          params: {
            api_key: API_KEY,
            append_to_response: 'videos'
          }
        });
        setTrailerVideo(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrailer();
    fetchVideos();
  }, []);

  return (
    <>
      <Wrapper scaleHeight={scaleHeight} ref={wrapperRef}>
        {open && <MovieDetail open={open} setOpen={setOpen} movie={movie} videos={videos} />}

        {loading ? (
          <Loader />
        ) : (
          <>
            <Trailer play={play}>
              <img src={trailer?.backdrop_path ? `${base_img_url}${trailer.backdrop_path}` : ""} alt={trailer?.title} />
              <div className="img-overlay"></div>
              {trailerVideo && renderTrailer()}
              <TrailerOverlay />
              <TrailerContent>
                <Title id="trailer-title">{trailer?.title}</Title>
                <Description id="trailer-description">{trailer?.overview}</Description>
                <TrailerAction>
                  <Button onClick={playTrailer}>
                    <FontAwesomeIcon icon={faPlay} /> Play
                  </Button>
                  <Button onClick={handleTrailerDetail}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                    <span>More Info</span>
                  </Button>
                </TrailerAction>
              </TrailerContent>
            </Trailer>
            <MovieListContainer>
              <MovieSection title={'Trending Now'} method={fetchPopular} setOpen={setOpen} />
              <MovieSection
                title={'Exciting TV Action & Adventure'}
                method={fetchTopRated}
                setOpen={setOpen}
              />
              <MovieSection title={'Upcoming'} method={fetchUpcoming} setOpen={setOpen} />
            </MovieListContainer>
          </>
        )}

        <Footer />
      </Wrapper>
    </>
  );
};

export default HomePage;
