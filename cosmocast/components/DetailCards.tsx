import React from 'react';
import { DetailCard as DetailCardType } from '@/types/weather';
import { Navigation, Radio, Sparkles, Zap, Wifi, Satellite } from 'lucide-react';

interface DetailCardsProps {
    details: DetailCardType[];
}

/**
 * Detail Cards コンポーネント
 * 詳細情報をカードグリッドで表示
 */
export const DetailCards: React.FC<DetailCardsProps> = ({ details }) => {
    // アイコンマッピング
    const iconMap: Record<string, React.ReactNode> = {
        Navigation: <Navigation size={24} className="text-cyan-400" />,
        Radio: <Radio size={24} className="text-green-400" />,
        Sparkles: <Sparkles size={24} className="text-purple-400" />,
        Zap: <Zap size={24} className="text-yellow-400" />,
        Wifi: <Wifi size={24} className="text-blue-400" />,
        Satellite: <Satellite size={24} className="text-orange-400" />,
    };

    return (
        <section className="py-6">
            <div className="px-6 mb-4">
                <h2 className="text-lg font-bold text-white">詳細情報</h2>
            </div>

            <div className="px-6 grid grid-cols-2 gap-3">
                {details.map((detail) => (
                    <div
                        key={detail.id}
                        className="
              p-4 rounded-xl
              bg-white/5 border border-white/10
              hover:bg-white/10 transition-colors
            "
                    >
                        {/* アイコンとラベル */}
                        <div className="flex items-center gap-2 mb-3">
                            {iconMap[detail.icon] || iconMap.Navigation}
                            <p className="text-xs text-gray-400">{detail.label}</p>
                        </div>

                        {/* 値 */}
                        <p className="text-2xl font-bold text-white mb-1">
                            {detail.value}
                        </p>

                        {/* 説明 */}
                        <p className="text-xs text-gray-400">
                            {detail.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
