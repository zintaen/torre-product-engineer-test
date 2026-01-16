export type Org = {
    name: string;
    picture?: string;
};

export type Skill = { name: string };

export type CompensationData = {
    minAmount?: number;
    maxAmount?: number;
    currency?: string;
    periodicity?: string;
};

export type Job = {
    id: string;
    objective: string;
    organizations?: Org[];
    skills?: Skill[];
    locations?: string[];
    languages?: { language: { name: string }, fluency: string }[];
    status?: string;
    type?: string;
    remote?: boolean;
    place?: {
        remote?: boolean;
        location?: { id: string }[];
    };
    details?: { content: string }[];
    compensation?: {
        data?: CompensationData;
        visible?: boolean;
    };
    members?: any[]; // added for completeness if needed later
    created?: string;
};

export interface FilterState {
    query: string;
    language: string;
    skill: string;
    status: string;
}

export interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    filters: FilterState;
    setFilters: (filters: Partial<FilterState>) => void;
    languages: { code: string; name: string }[];
    onSearch: () => void;
    size: number;
    setSize: (size: number) => void;
}

export interface HeaderProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
    toggleSidebar: () => void;
    filters: FilterState;
    setFilters: (filters: Partial<FilterState>) => void;
    onSearch: () => void;
    languages: { code: string; name: string }[];
    size: number;
    setSize: (size: number) => void;
}

export interface SearchFilterBarProps {
    filters: FilterState;
    setFilters: (filters: Partial<FilterState>) => void;
    onSearch: () => void;
    languages: { code: string; name: string }[];
    className?: string;
    size: number;
    setSize: (size: number) => void;
}

export interface JobDetailPanelProps {
    jobId: string;
    onClose?: () => void;
}

export interface JobCardProps {
    job: Job;
    onClick?: () => void;
    isSelected?: boolean;
}
