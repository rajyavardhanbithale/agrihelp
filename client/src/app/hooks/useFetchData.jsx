'use client'
import { useState } from 'react';
import axios from 'axios';



export default async function useFetchData(props) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    try {
        const response = await axios.get(`${process.env.API_ENDPOINT}${param}`);

        if (response.status === 200) {
            setData(response.data);
        }
    } catch (error) {
        setError("Error in Fetching Data From Server");
    } finally {
        setLoading(false);
    }

    return { data, loading, error };
}
