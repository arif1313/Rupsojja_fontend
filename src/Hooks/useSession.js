import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useSession = () => {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    let sessionId = localStorage.getItem('sessionId');
    
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('sessionId', sessionId);
    }
    
    setSessionId(sessionId);
  }, []);

  return sessionId;
};