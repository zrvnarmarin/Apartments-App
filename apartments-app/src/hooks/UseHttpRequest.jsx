// import React from "react";
// import axios from "axios";
// import { useState } from "react";
// import { useCallback } from "react";

// const UseHttpRequest = () => {
//     // const [isLoading, setIsLoading] = useState(false)
//     // const [error, setError] = useState(null)

//     // const sendHttpRequest = useCallback (async (requestConfig, applyData) => {
//     //     setIsLoading(true)
//     //     setError(null)

//     //     try {
//     //         const response = await fetch(
//     //             requestConfig.url, {
//     //                 method: requestConfig.method ? requestConfig.method : 'GET',
//     //                 headers: requestConfig.headers ? requestConfig.headers : {},
//     //                 body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
//     //             }
//     //         )

//     //         if (!response.ok) {
//     //             throw new Error('Request failed!')
//     //         }

//     //         const data = await response.json()
//     //         applyData(data)

//     //     } catch (error) {
//     //         setError(error.message || 'Something went wrong!')
//     //     }

//     //     setIsLoading(false)
//     // }, [])

//     // return {
//     //     isLoading,
//     //     error,
//     //     sendHttpRequest
//     // }


// }

// export default UseHttpRequest;

import { useState } from 'react';
import axios from 'axios';
import { useCallback } from 'react';

const useHttpRequest = (url, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get(url);
      const data = await response.data

      applyData(data)
    } catch (err) {
      setError(err);
    } 
    setIsLoading(false);
  }, [url, applyData]);

  const postData = async (body) => {
    try {
      setIsLoading(true);
      setError(null)
      const response = await axios.post(url, body);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, getData, postData };
};

export default useHttpRequest;