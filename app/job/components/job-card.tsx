'use client';

import { JobCardProps, Skill, Org } from "../types";
import React, { useRef, useState } from "react";

export function JobCard({ job, onClick, isSelected }: JobCardProps) {
    const cardRef = useRef<HTMLLIElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const companies = job.organizations?.map((o: Org) => o.name).join(', ') || 'Unknown org';
    const skills = job.skills?.map((s: Skill) => s.name) || [];
    const location = job.locations?.join(', ') || 'Remote';
    const orgImage = job.organizations?.[0]?.picture;

    const formatCompensation = () => {
        const { data, visible } = job.compensation || {};
        if (!visible || !data) {
            return 'To be agreed';
        }

        const { minAmount, maxAmount, currency, periodicity } = data;
        const period = periodicity === 'hourly' ? '/hr' : periodicity === 'yearly' ? '/yr' : `/${periodicity}`;

        if (minAmount && maxAmount) {
            return `${currency} ${minAmount.toLocaleString()} - ${maxAmount.toLocaleString()} ${period}`;
        }
        if (minAmount) {
            return `${currency} ${minAmount.toLocaleString()}+ ${period}`;
        }
        return 'To be agreed';
    };

    const jobType = job.type?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Opportunity';

    const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
        if (!cardRef.current) {
            return;
        }

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const rotateX = ((mouseY - centerY) / (rect.height / 2)) * -10; // Max 10 deg rotation
        const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 10;

        setRotation({ x: rotateX, y: rotateY });
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        setRotation({ x: 0, y: 0 });
    };

    return (
        <li
            ref={cardRef}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }}
            tabIndex={0}
            role="button"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: isHovering
                    ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: 'transform 0.1s ease-out'
            }}
            className={`group relative rounded-xl p-6 transition-all duration-300 cursor-pointer backdrop-blur-md border outline-none ring-offset-2 ring-offset-transparent focus:ring-2 focus:ring-orange-500/50 ${isSelected
                ? 'bg-orange-50/80 dark:bg-orange-900/20 border-orange-500 ring-1 ring-orange-500'
                : 'bg-white dark:bg-zinc-900/40 border-gray-200 dark:border-white/5 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-900/10 dark:hover:shadow-orange-900/20 hover:bg-gray-50 dark:hover:bg-zinc-900/60'
                }`}
        >
            {/* Glossy overlay effect - standard tailwind */}
            <div className="absolute inset-0 rounded-xl bg-linear-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Top Section */}
            <div className="flex items-start gap-4 mb-4 relative z-10">
                <div
                    style={{ width: '3rem', height: '3rem' }}
                    className="shrink-0 relative flex items-center justify-center 
                                bg-gray-100 dark:bg-zinc-800 rounded-full
                                border border-gray-200 dark:border-white/10 shadow-inner group-hover:border-orange-500/50 transition-colors overflow-hidden">
                    {orgImage ? (
                        <img src={orgImage} alt={companies} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-xl font-bold text-orange-500/90 drop-shadow-sm">{companies.charAt(0)}</span>
                    )}
                </div>

                <div className="grow min-w-0">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white/90 leading-tight mb-1 cursor-pointer hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                        {job.objective}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-zinc-400 font-normal truncate">
                        {companies}
                    </p>
                </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-4 mb-6 relative z-10">
                {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {skills.slice(0, 4).map((skill, i) => (
                            <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-zinc-300 border border-gray-200 dark:border-white/5 group-hover:border-orange-500/20 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 group-hover:text-orange-600 dark:group-hover:text-orange-200 transition-colors">
                                {skill}
                            </span>
                        ))}
                        {skills.length > 4 && (
                            <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-zinc-500 border border-gray-200 dark:border-white/5">
                                +{skills.length - 4}
                            </span>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-zinc-400 pt-2 border-t border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-1.5">
                        <span className="text-base text-zinc-600">💼</span>
                        <span>{jobType}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <span className="text-base text-zinc-600">💵</span>
                        <span>{formatCompensation()}</span>
                    </div>

                    <div className="flex items-center gap-1.5 ml-auto">
                        <span className="text-base text-zinc-600">🌍</span>
                        <span>{job.remote ? 'Remote' : location.split(',')[0]}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4 relative z-10">
                <div className="flex items-center gap-3">
                    <button className="px-6 py-2 rounded-full bg-orange-500 text-black text-sm font-bold hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20 transition-all">
                        Apply
                    </button>
                </div>
            </div>
        </li>
    );
}