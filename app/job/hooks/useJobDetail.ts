import { useState, useEffect } from 'react';
import { Job } from '../types';
import { API_CONFIG } from '../constants';

export const useJobDetail = (jobId: string | null) => {
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!jobId) {
            setJob(null);
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchJobDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${API_CONFIG.DETAILS_URL}/${jobId}`, { signal });

                if (!response.ok) {
                    throw new Error(`Failed to fetch job details: ${response.status}`);
                }

                const data = await response.json();
                setJob(data);
            } catch (err: any) {
                if (err.name === 'AbortError') {
                    return;
                }
                console.error(err);
                setError(err.message || 'Something went wrong');
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchJobDetails();

        return () => {
            controller.abort();
        };
    }, [jobId]);

    return { job, loading, error };
};
