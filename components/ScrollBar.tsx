// components/ScrollBar.tsx

//'use client';

/*
import React, { useEffect, useState, useCallback } from 'react';
import { FiArrowUp, FiArrowDown, FiHome } from 'react-icons/fi';

const ScrollBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    const handleScroll = useCallback(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setIsVisible(true);

        const newTimeoutId = window.setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        setTimeoutId(newTimeoutId);
    }, [timeoutId]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    };

    const scrollToHome = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className={`fixed inset-0 flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center space-y-2">
                <button
                    onClick={scrollToTop}
                    className="p-2 rounded-full bg-gradient-to-r from-lime-400 to-blue-400 text-white shadow-lg hover:opacity-75"
                >
                    <FiArrowUp size={24} />
                </button>
                <button
                    onClick={scrollToHome}
                    className="p-2 rounded-full bg-gradient-to-r from-lime-400 to-blue-400 text-white shadow-lg hover:opacity-75"
                >
                    <FiHome size={24} />
                </button>
                <button
                    onClick={scrollToBottom}
                    className="p-2 rounded-full bg-gradient-to-r from-lime-400 to-blue-400 text-white shadow-lg hover:opacity-75"
                >
                    <FiArrowDown size={24} />
                </button>
            </div>
        </div>
    );
};

export default ScrollBar;


// components/ScrollBar.tsx

//'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { FiArrowUp, FiArrowDown, FiHome } from 'react-icons/fi';

const ScrollBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    const handleScroll = useCallback(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setIsVisible(true);

        const newTimeoutId = window.setTimeout(() => {
            setIsVisible(false);
        }, 1500);

        setTimeoutId(newTimeoutId);
    }, [timeoutId]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    };

    const scrollToHome = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className={`fixed inset-0 flex items-center justify-center pointer-events-none z-50 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center space-y-2">
                <button
                    onClick={scrollToTop}
                    className="p-2 rounded-full bg-gradient-to-r from-lime-400 to-blue-400 text-white shadow-lg hover:opacity-75 pointer-events-auto"
                >
                    <FiArrowUp size={24} />
                </button>
                <button
                    onClick={scrollToHome}
                    className="p-2 rounded-full bg-gradient-to-r from-lime-400 to-blue-400 text-white shadow-lg hover:opacity-75 pointer-events-auto"
                >
                    <FiHome size={24} />
                </button>
                <button
                    onClick={scrollToBottom}
                    className="p-2 rounded-full bg-gradient-to-r from-lime-400 to-blue-400 text-white shadow-lg hover:opacity-75 pointer-events-auto"
                >
                    <FiArrowDown size={24} />
                </button>
            </div>
        </div>
    );
};

export default ScrollBar;

*/

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { FiArrowUp, FiArrowDown, FiHome } from 'react-icons/fi';
import Link from 'next/link';

const ScrollBar: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    const handleScroll = useCallback(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setIsVisible(true);

        const newTimeoutId = window.setTimeout(() => {
            setIsVisible(false);
        }, 1500);

        setTimeoutId(newTimeoutId);
    }, [timeoutId]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className={`fixed inset-0 flex items-center justify-center pointer-events-none z-50 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center space-y-2">
                <button
                    onClick={scrollToTop}
                    className="p-2 rounded-full bg-gradient-to-r from-lime-400 to-blue-400 text-white shadow-lg hover:opacity-75 pointer-events-auto"
                >
                    <FiArrowUp size={24} />
                </button>
                <Link href="/" passHref>
                    <button
                        className="p-2 rounded-full bg-gradient-to-r from-lime-400 to-blue-400 text-white shadow-lg hover:opacity-75 pointer-events-auto"
                    >
                        <FiHome size={24} />
                    </button>
                </Link>
                <button
                    onClick={scrollToBottom}
                    className="p-2 rounded-full bg-gradient-to-r from-lime-400 to-blue-400 text-white shadow-lg hover:opacity-75 pointer-events-auto"
                >
                    <FiArrowDown size={24} />
                </button>
            </div>
        </div>
    );
};

export default ScrollBar;
