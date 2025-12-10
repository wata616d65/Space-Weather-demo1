import React from 'react';
import { DailyData } from '@/types/weather';
import { getWeatherConfig } from '@/config/weatherConfig';
import { RiskLevelIcon } from './RiskLevelIcon';

interface WeeklyForecastProps {
    dailyData: DailyData[];
    onDayClick: (day: DailyData) => void;
}

/**
 * Weekly Forecast コンポーネント
 * 7日間の予報を縦リスト表示
 */
export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ dailyData, onDayClick }) => {
    return (
        <section className="py-6 border-b border-white/10">
            <div className="px-6 mb-4">
                <h2 className="text-lg font-bold text-white">7日間予報</h2>
            </div>

            <div className="px-6 space-y-2">
                {dailyData.map((day, index) => {
                    const config = getWeatherConfig(day.type);
                    return (
                        <button
                            key={index}
                            onClick={() => onDayClick(day)}
                            className="
                w-full p-4 rounded-xl
                bg-white/5 border border-white/10
                hover:bg-white/10 transition-colors
                flex items-center justify-between gap-4
              "
                        >
                            {/* 曜日と日付 */}
                            <div className="flex-shrink-0 w-16 text-left">
                                <p className="text-sm font-semibold text-white">{day.day}</p>
                                <p className="text-xs text-gray-400">{day.date}</p>
                            </div>

                            {/* アイコン */}
                            <div className="flex-shrink-0">
                                <RiskLevelIcon type={day.type} size={28} />
                            </div>

                            {/* リスクレベルバー */}
                            <div className="flex-1 flex items-center gap-2">
                                <span className="text-xs text-gray-400 w-8 text-right">{day.minRisk}%</span>
                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden relative">
                                    {/* 最小〜最大のレンジバー */}
                                    <div
                                        className={`absolute h-full ${config.bgColor.replace('/20', '/60')} rounded-full`}
                                        style={{
                                            left: `${day.minRisk}%`,
                                            width: `${day.maxRisk - day.minRisk}%`,
                                        }}
                                    ></div>
                                </div>
                                <span className="text-xs text-gray-400 w-8">{day.maxRisk}%</span>
                            </div>

                            {/* ラベル */}
                            <div className="flex-shrink-0 w-20 text-right">
                                <p className={`text-xs font-medium ${config.color}`}>
                                    {config.label}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};
