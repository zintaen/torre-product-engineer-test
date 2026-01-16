import React from "react";
import { useJobDetail } from "../hooks/useJobDetail";

import { JobDetailPanelProps } from "../types";

export function JobDetailPanel({ jobId, onClose }: JobDetailPanelProps) {
    const { job, loading, error } = useJobDetail(jobId);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/5">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/5 p-8 text-center">
                <p className="text-red-500 mb-2">Error loading details</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="h-full flex items-center justify-center bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-white/20 dark:border-white/5 text-gray-400">
                Select a job to view details
            </div>
        );
    }

    // Unpack data
    const objective = job.objective || "No title";
    const organizations = job.organizations || [];
    const orgName = organizations.map((o: any) => o.name).join(', ') || 'Unknown Organization';
    const orgImage = organizations[0]?.picture;
    const skills = job.skills || [];
    const details = job.details || [];

    // Compensation
    const compensation = job.compensation;
    const formatCompensation = () => {
        if (!compensation?.visible || !compensation?.data) return 'To be agreed';
        const { minAmount, maxAmount, currency, periodicity } = compensation.data;
        const period = periodicity === 'hourly' ? '/hr' : periodicity === 'yearly' ? '/yr' : `/${periodicity}`;
        if (minAmount && maxAmount) return `${currency} ${minAmount.toLocaleString()} - ${maxAmount.toLocaleString()} ${period}`;
        if (minAmount) return `${currency} ${minAmount.toLocaleString()}+ ${period}`;
        return 'To be agreed';
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-zinc-900/60 backdrop-blur-xl border-l border-white/20 dark:border-white/5 shadow-2xl overflow-hidden relative">
            {/* Header / Sticky Top */}
            <div className="p-6 border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md sticky top-0 z-20">
                {/* Mobile Back Button */}
                <button
                    onClick={onClose}
                    className="md:hidden mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-orange-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Back to Jobs
                </button>

                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 shrink-0 rounded-xl bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 flex items-center justify-center overflow-hidden">
                        {orgImage ? (
                            <img src={orgImage} alt={orgName} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-2xl font-bold text-orange-500">{orgName.charAt(0)}</span>
                        )}
                    </div>
                    <div className="grow">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-1">{objective}</h2>
                        <p className="text-sm text-gray-500 dark:text-zinc-400 font-medium mb-2">{orgName}</p>

                        <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-zinc-400">
                            <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-md">
                                💼 {job.type?.replace(/-/g, ' ')}
                            </span>
                            <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-md">
                                🌍 {job.place?.remote ? 'Remote' : (job.place?.location?.[0]?.id || 'Unknown')}
                            </span>
                            <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-md text-green-600 dark:text-green-400">
                                💵 {formatCompensation()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                {/* Skills */}
                {skills.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill: any, i: number) => (
                                <span key={i} className="px-2.5 py-1 rounded-md text-sm bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-white/5">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                {/* Details / Description */}
                <div className="w-full">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">About the Role</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-zinc-300">
                        {details.map((section: any, idx: number) => (
                            <div key={idx} dangerouslySetInnerHTML={{ __html: section.content }} className="mb-4 last:mb-0" />
                        ))}
                        {details.length === 0 && (
                            <p className="italic opacity-60">No description provided.</p>
                        )}
                    </div>
                </div>
                {/* Languages */}
                {job.languages && job.languages.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Languages</h3>
                        <ul className="space-y-2">
                            {job.languages.map((lang: any, i: number) => (
                                <li key={i} className="flex items-center justify-between text-sm p-3 rounded-lg bg-gray-50 dark:bg-white/5">
                                    <span className="text-gray-900 dark:text-white font-medium">{lang.language?.name}</span>
                                    <span className="text-gray-500 dark:text-zinc-400 capitalize">{lang.fluency}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
