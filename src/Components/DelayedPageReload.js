import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const DelayedPageReload = ({ path, delayInSeconds }) => {
  const history = useHistory();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      history.push(path);
    }, delayInSeconds * 1000);

    return () => clearTimeout(timeoutId); // Cleanup the timeout on unmount
  }, [path, delayInSeconds, history]);

  return (
    <div>
      <p></p>
    </div>
  );
};

export default DelayedPageReload;
