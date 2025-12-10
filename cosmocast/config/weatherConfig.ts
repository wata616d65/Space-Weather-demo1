import { WeatherType } from '@/types/weather';

// 天気タイプごとの設定（OCP: 開放閉鎖の原則に準拠）
// 新しい天気タイプを追加する場合、このオブジェクトに行を追加するだけで良い
export const weatherConfig = {
    sunny: {
        label: '宇宙晴れ',
        icon: 'Sun',
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/20',
        borderColor: 'border-cyan-500/50',
        description: '宇宙天気は穏やかです',
        emoji: '☀️',
        riskLevel: '低',
    },
    cloudy: {
        label: 'やや不安定',
        icon: 'CloudSun',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
        borderColor: 'border-yellow-500/50',
        description: 'CMEの影響でやや不安定',
        emoji: '⛅️',
        riskLevel: '中',
    },
    flare: {
        label: '通信注意',
        icon: 'Zap',
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/20',
        borderColor: 'border-orange-500/50',
        description: '太陽フレアにより通信に影響',
        emoji: '⚡️',
        riskLevel: '中〜高',
    },
    storm: {
        label: '磁気嵐',
        icon: 'Wind',
        color: 'text-red-400',
        bgColor: 'bg-red-500/20',
        borderColor: 'border-red-500/50',
        description: '地磁気嵐が発生中',
        emoji: '🌀',
        riskLevel: '高',
    },
    radiation: {
        label: '放射線警戒',
        icon: 'AlertTriangle',
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/20',
        borderColor: 'border-purple-500/50',
        description: '高エネルギー粒子に注意',
        emoji: '☢️',
        riskLevel: '高',
    },
} as const;

// WeatherTypeから設定を取得するヘルパー関数
export const getWeatherConfig = (type: WeatherType) => {
    return weatherConfig[type];
};

// リスクレベル（0-100）からWeatherTypeを判定する関数
export const getRiskLevelType = (riskLevel: number): WeatherType => {
    if (riskLevel <= 20) return 'sunny';
    if (riskLevel <= 40) return 'cloudy';
    if (riskLevel <= 60) return 'flare';
    if (riskLevel <= 80) return 'storm';
    return 'radiation';
};
