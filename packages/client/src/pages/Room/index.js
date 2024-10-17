import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSocket } from "../../contexts/SocketContext";
import { leaveRoom } from "../../redux/roomSlice";
import { resetGame } from "../../redux/gameSlice";
import Lobby from "./Lobby";
import GameArea from "./GameArea";

const Room = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { connect } = useSocket();
  const room = useSelector((state) => state.room);
  const user = useSelector((state) => state.user);
  const game = useSelector((state) => state.game);

  useEffect(() => {
    return () => {
      dispatch(leaveRoom());
      dispatch(resetGame());
    };
  }, []);

  useEffect(() => {
    if (id && user.id) {
      connect(id, user.username);
    }
  }, [room, user, id]);

  if (game.id) {
    return <GameArea />;
  }
  return <Lobby />;
};

export default Room;
