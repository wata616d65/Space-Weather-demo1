import React from 'react';
import { CityWeather } from '@/types/weather';
import { getWeatherConfig } from '@/config/weatherConfig';
import { RiskLevelIcon } from './RiskLevelIcon';

interface CurrentWeatherHeroProps {
    data: CityWeather;
    onAdviceClick: () => void;
}

/**
 * Hero Section コンポーネント（コンパクト版）
 * 画面上部の現在の天気表示
 */
export const CurrentWeatherHero: React.FC<CurrentWeatherHeroProps> = ({ data, onAdviceClick }) => {
    const config = getWeatherConfig(data.current.type);

    return (
        <section
            className={`
        relative overflow-hidden px-6 py-8
        bg-gradient-to-br from-black via-gray-900 to-black
        border-b border-white/10
      `}
        >
            {/* 背景エフェクト */}
            <div className={`absolute inset-0 ${config.bgColor} opacity-20`}></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                {/* メインアイコン */}
                <RiskLevelIcon type={data.current.type} size={64} />

                {/* リスクレベル */}
                <div>
                    <p className="text-xs text-gray-400 mb-1">現在のリスクレベル</p>
                    <p className={`text-5xl font-bold ${config.color}`}>
                        {data.current.temp}
                        <span className="text-xl ml-1">%</span>
                    </p>
                    <p className={`text-base font-semibold mt-1 ${config.color}`}>
                        {config.label}
                    </p>
                </div>

                {/* 説明 */}
                <div className="max-w-sm">
                    <p className="text-white text-sm leading-relaxed">
                        {data.current.description}
                    </p>
                </div>

                {/* アドバイスボタン */}
                <button
                    onClick={onAdviceClick}
                    className={`
            px-5 py-2.5 rounded-full font-semibold text-sm
            ${config.bgColor} ${config.borderColor}
            border-2 ${config.color}
            hover:scale-105 transition-transform
            shadow-lg
          `}
                >
                    詳細を見る
                </button>

                {/* タイムスタンプ */}
                <p className="text-xs text-gray-500">
                    更新: {data.current.timestamp}
                </p>
            </div>
        </section>
    );
};
