'use client';

import React, { useRef } from 'react';
import { HourlyData } from '@/types/weather';
import { getWeatherConfig } from '@/config/weatherConfig';
import { RiskLevelIcon } from './RiskLevelIcon';

interface HourlyForecastProps {
    hourlyData: HourlyData[];
    onHourClick?: (hour: HourlyData) => void;
}

/**
 * Hourly Forecast コンポーネント
 * Apple天気アプリスタイルの横スクロール
 */
export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData, onHourClick }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-6 border-b border-white/10">
            <div className="px-6 mb-4">
                <h2 className="text-lg font-bold text-white">24時間予報</h2>
                <p className="text-xs text-gray-400">
                    {onHourClick ? 'タップして詳細を表示' : '横にスワイプして確認'}
                </p>
            </div>

            <div
                ref={scrollRef}
                className="overflow-x-auto scrollbar-hide px-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="flex gap-4 pb-2">
                    {hourlyData.map((hour, index) => {
                        const config = getWeatherConfig(hour.type);
                        const isClickable = !!onHourClick;

                        return (
                            <button
                                key={index}
                                onClick={isClickable ? () => onHourClick(hour) : undefined}
                                disabled={!isClickable}
                                className={`
                  flex-shrink-0 w-20 p-4 rounded-2xl
                  bg-white/5 border border-white/10
                  ${isClickable ? 'hover:bg-white/10 hover:scale-105 cursor-pointer' : 'hover:bg-white/10 cursor-default'}
                  transition-all
                  flex flex-col items-center gap-3
                `}
                            >
                                {/* 時間 */}
                                <p className="text-sm font-medium text-white whitespace-nowrap">
                                    {hour.time}
                                </p>

                                {/* アイコン */}
                                <RiskLevelIcon type={hour.type} size={32} />

                                {/* 影響確率 */}
                                <p className={`text-xs ${config.color}`}>
                                    {hour.pop}%
                                </p>

                                {/* リスクレベル */}
                                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className={`h-full ${config.bgColor.replace('/20', '')}`}
                                        style={{ width: `${hour.temp}%` }}
                                    ></div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
};
