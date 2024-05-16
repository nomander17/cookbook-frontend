import { useState } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = (category, content) => {
    setNotification({ category, content });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return { notification, showNotification, hideNotification };
};

export default useNotification;