import React from 'react';
import { weatherConfig } from '@/config/weatherConfig';
import { RiskLevelIcon } from './RiskLevelIcon';
import { WeatherType } from '@/types/weather';

interface WeatherLegendProps {
    onWeatherTypeClick?: (type: WeatherType) => void;
}

/**
 * 天気凡例コンポーネント（コンパクト横スクロール版）
 * 各天気タイプをタップ可能なカードで表示
 */
export const WeatherLegend: React.FC<WeatherLegendProps> = ({ onWeatherTypeClick }) => {
    const weatherTypes: WeatherType[] = ['sunny', 'cloudy', 'flare', 'storm', 'radiation'];

    const handleClick = (type: WeatherType) => {
        if (onWeatherTypeClick) {
            onWeatherTypeClick(type);
        }
    };

    return (
        <section className="py-4 border-b border-white/10">
            <div className="px-6 mb-3">
                <h2 className="text-base font-bold text-white">天気アイコンの見方</h2>
                <p className="text-xs text-gray-400">
                    {onWeatherTypeClick ? 'タップして詳細を表示' : '各アイコンの意味'}
                </p>
            </div>

            <div className="overflow-x-auto scrollbar-hide px-6">
                <div className="flex gap-3 pb-2">
                    {weatherTypes.map((type) => {
                        const config = weatherConfig[type];
                        const isClickable = !!onWeatherTypeClick;

                        return (
                            <button
                                key={type}
                                onClick={() => handleClick(type)}
                                disabled={!isClickable}
                                className={`
                  flex-shrink-0 w-24 p-3 rounded-xl
                  bg-white/5 border border-white/10
                  ${isClickable ? 'hover:bg-white/10 hover:scale-105 cursor-pointer' : 'cursor-default'}
                  transition-all
                  flex flex-col items-center gap-2
                `}
                            >
                                {/*アイコン */}
                                <RiskLevelIcon type={type} size={28} />

                                {/* ラベル */}
                                <p className={`text-xs font-semibold ${config.color} text-center leading-tight`}>
                                    {config.label}
                                </p>

                                {/* リスクレベル */}
                                <span className="text-[10px] text-gray-500">
                                    {config.riskLevel}
                                </span>
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
