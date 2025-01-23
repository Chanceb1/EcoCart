import { useState, useEffect, useCallback } from 'react';

interface RequestConfig extends RequestInit {
    method?: string;
    headers?: { [key: string]: string };
    body?: string;
}

async function sendHttpRequest<T>(
    url: string,
    config?: RequestConfig
): Promise<T> {
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Something went wrong');
    }

    return resData;
}

export default function useHttp<T>(
    url: string,
    config?: RequestConfig,
    initialData?: T
) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(
        async function sendRequest(data?: string): Promise<void> {
            setIsLoading(true);
            try {
                const resData = await sendHttpRequest<T>(url, {
                    ...config,
                    body: data
                });
                setData(resData);
            } catch (error) {
                setError(error.message || 'Something went wrong');
            }
            setIsLoading(false);
        },
        [url, config]
    );

    useEffect(() => {
        if (
            (config && (config.method === 'GET' || !config.method)) ||
            !config
        ) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    };
}
