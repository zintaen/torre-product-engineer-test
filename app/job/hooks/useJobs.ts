import { useState, useCallback } from 'react';
import { Job, FilterState } from '../types';
import { API_CONFIG } from '../constants';

export const useJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [size, setSize] = useState(10);

    const fetchJobs = useCallback(async (filters: FilterState, reset = false) => {
        setLoading(true);
        const currentOffset = reset ? 0 : offset;

        if (reset) {
            setOffset(0);
        }

        try {
            const body = {
                "and": [
                    { "keywords": { "term": filters.query, "locale": API_CONFIG.SEARCH_PARAMS.LANG } },
                    { "language": { "term": filters.language, "fluency": "fully-fluent" } },
                    { "skill/role": { "text": filters.skill, "proficiency": "expert" } },
                    { "status": { "code": filters.status } }
                ]
            };

            const response = await fetch(`${API_CONFIG.SEARCH_URL}?currency=${API_CONFIG.SEARCH_PARAMS.CURRENCY}&periodicity=${API_CONFIG.SEARCH_PARAMS.PERIODICITY}&lang=${API_CONFIG.SEARCH_PARAMS.LANG}&size=${size}&offset=${currentOffset}&contextFeature=${API_CONFIG.SEARCH_PARAMS.CONTEXT_FEATURE}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`Torre search failed: ${response.status}`);
            }

            const data = await response.json();
            const mappedData: Job[] = data.results.map((item: any) => ({
                id: item.id,
                objective: item.objective,
                organizations: item.organizations,
                skills: item.skills,
                locations: item.locations,
                type: item.type,
                remote: item.remote,
                compensation: item.compensation
            }));

            setJobs(prev => {
                if (reset) {
                    return mappedData;
                }

                const newJobs = mappedData.filter(
                    newItem => !prev.some(existingItem => existingItem.id === newItem.id)
                );

                return [...prev, ...newJobs];
            });
            setTotalJobs(data.total);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [offset, size]);

    const search = useCallback((filters: FilterState) => {
        setOffset(0);
        fetchJobs(filters, true);
    }, [fetchJobs]);

    const loadMore = useCallback((filters: FilterState) => {
        setOffset(prev => prev + size);
    }, [size]);

    return {
        jobs,
        totalJobs,
        loading,
        offset,
        setOffset,
        fetchJobs,
        size,
        setSize,
        search,
        loadMore
    };
};
