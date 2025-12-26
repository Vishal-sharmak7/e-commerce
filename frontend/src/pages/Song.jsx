import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";

const Song = () => {
  const [song, setSong] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_URL}songs`)
      .then((res) => {
        setSong(res.data);
      })
      .catch((err) => {
        console.log("error fetchingdata", err);
      });
  }, []);

  return (
    <>

    <div className="text-center font-bold text-6xl">
        <h1>SONGS</h1>
    </div>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {song.map((songs, idx) => (
          <div
            key={idx}
            className='className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-75 h-110   '
          >
            <div className="p-5 flex flex-col items-center">
              <img
                src={songs.image}
                alt=""
                className="h-75 w-75 object-cover mb-4 rounded"
              />

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                {songs.name}
              </h1>
              <a href={songs.link}
              target="blank">
                <Button />
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Song;
