'use client';

import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { CITIES } from '@/data/dummyData';

interface HeaderProps {
    currentCity: string;
    onCityChange: (cityId: string) => void;
}

/**
 * Sticky Header コンポーネント
 * 都市切り替え機能を提供
 */
export const Header: React.FC<HeaderProps> = ({ currentCity, onCityChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentCityName = CITIES.find(city => city.id === currentCity)?.name || '東京';

    const handleCitySelect = (cityId: string) => {
        onCityChange(cityId);
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
                <div className="px-4 py-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-between w-full text-left group"
                    >
                        <div>
                            <p className="text-xs text-gray-400">現在地</p>
                            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                                {currentCityName}
                                <ChevronDown size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                            </h1>
                        </div>
                    </button>
                </div>
            </header>

            {/* 都市選択モーダル */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm">
                    <div className="min-h-screen flex flex-col">
                        {/* モーダルヘッダー */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10">
                            <h2 className="text-xl font-bold text-white">都市を選択</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={24} className="text-white" />
                            </button>
                        </div>

                        {/* 都市リスト */}
                        <div className="flex-1 p-4">
                            <div className="space-y-2">
                                {CITIES.map((city) => (
                                    <button
                                        key={city.id}
                                        onClick={() => handleCitySelect(city.id)}
                                        className={`
                      w-full p-4 rounded-xl text-left transition-all
                      ${currentCity === city.id
                                                ? 'bg-cyan-500/20 border-2 border-cyan-500/50'
                                                : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'
                                            }
                    `}
                                    >
                                        <p className="text-lg font-semibold text-white">
                                            {city.name}
                                        </p>
                                        {currentCity === city.id && (
                                            <p className="text-xs text-cyan-400 mt-1">選択中</p>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
