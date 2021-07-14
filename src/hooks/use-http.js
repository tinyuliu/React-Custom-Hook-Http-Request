import { useState } from 'react';

const useHttp = (requestConfig, applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const sendRequest = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          requestConfig.url, {
              method: requestConfig.method,
              headers: requestConfig.headers,
              body: JSON.stringify(requestConfig.body)
          }
        );
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();//limited to json data
  
        const loadedTasks = [];
  
        for (const taskKey in data) {
          loadedTasks.push({ id: taskKey, text: data[taskKey].text });
        }
  
        const data = await response.json();
        applyData(data);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    };

    //return the component customer csn use
    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useHttp;