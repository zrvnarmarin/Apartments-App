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

import { useState, useEffect } from 'react';
import axios from 'axios';

const useHttpRequest = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
        setIsLoading(true);
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
        setIsLoading(false);
    }
  };

  const postData = async (body) => {
    try {
        setIsLoading(true);
      const response = await axios.post(url, body);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { getData, isLoading, error, postData };
};

export default useHttpRequest;