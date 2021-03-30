import React, {useContext, useState, useEffect} from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({children}) {
//   const user_id = useSelector((state) => state.auth.id);
//   console.log('ini context' + user_id);
  const [socket, setSocket] = useState();

  useEffect(() => {
      console.log('useeeffetc socket provide')
        const newSocketConnection = io('http://147.139.181.217:1996', {
        // room: "01",
        // user_id: "e45fbc91-0452-4eba-994c-a34b014c5255",
        // role: "employer",
        // interview_id: "ff2c35c5-3682-473d-b17a-5043a67c90ac",
        // queue : 1
    });
    setSocket(newSocketConnection);

    return () => newSocketConnection.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
