import React from 'react';
import { WeatherType } from '@/types/weather';
import { getWeatherConfig } from '@/config/weatherConfig';
import { Sun, CloudSun, Zap, Wind, AlertTriangle } from 'lucide-react';

interface RiskLevelIconProps {
    type: WeatherType;
    size?: number;
    showLabel?: boolean;
    className?: string;
}

/**
 * リスクレベルアイコンコンポーネント
 * SRP（単一責任の原則）: アイコン表示のみを担当
 * ISP（インターフェース分離の原則）: 必要最小限のPropsのみ受け取る
 */
export const RiskLevelIcon: React.FC<RiskLevelIconProps> = ({
    type,
    size = 48,
    showLabel = false,
    className = ''
}) => {
    const config = getWeatherConfig(type);

    // アイコンマッピング
    const iconMap: Record<string, React.ReactNode> = {
        Sun: <Sun size={size} className={`${config.color} drop-shadow-lg`} />,
        CloudSun: <CloudSun size={size} className={`${config.color} drop-shadow-lg`} />,
        Zap: <Zap size={size} className={`${config.color} drop-shadow-lg`} />,
        Wind: <Wind size={size} className={`${config.color} drop-shadow-lg`} />,
        AlertTriangle: <AlertTriangle size={size} className={`${config.color} drop-shadow-lg`} />,
    };

    return (
        <div className={`flex flex-col items-center gap-2 ${className}`}>
            <div className="animate-pulse">
                {iconMap[config.icon] || iconMap.Sun}
            </div>
            {showLabel && (
                <span className={`text-sm font-medium ${config.color}`}>
                    {config.label}
                </span>
            )}
        </div>
    );
};
