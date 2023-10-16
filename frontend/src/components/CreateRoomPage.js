import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateRoomPage = () => {
  const defaultVotes = 2;
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const [guestCanPause, setGuestCanPause] = useState(true);

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true");
  };

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };

    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="section">
      <div className="container">
        <h4>Create A Room</h4>
        <div className="playback-control">
          <p className="control">Guest Control of Playback State</p>
          <div>
            <input
              type="radio"
              value="true"
              name="playback"
              defaultChecked
              onChange={handleGuestCanPauseChange}
            />
            <label className="play">Play/Pause</label>

            <input
              type="radio"
              value="false"
              name="playback"
              onChange={handleGuestCanPauseChange}
            />
            <label>No Control</label>
          </div>
        </div>
        <div className="votes-control">
          <input
            type="number"
            required
            defaultValue={defaultVotes}
            min="1"
            onChange={handleVotesChange}
          />
          <label>Votes Required To Skip Song</label>
        </div>
        <button className="create-button" onClick={handleRoomButtonPressed}>
          Create A Room
        </button>
        <Link to="/" className="back-button">
          Back
        </Link>
      </div>
    </div>
  );
};

export default CreateRoomPage;
