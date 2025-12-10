import React from 'react';
import { HourlyData } from '@/types/weather';
import { getWeatherConfig } from '@/config/weatherConfig';
import { RiskLevelIcon } from './RiskLevelIcon';
import { X, Satellite, Radio, Zap, Navigation } from 'lucide-react';

interface HourlyDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    hourData: HourlyData | null;
}

/**
 * 時間別詳細モーダル
 * 各時間の詳細な宇宙天気情報を表示
 */
export const HourlyDetailModal: React.FC<HourlyDetailModalProps> = ({
    isOpen,
    onClose,
    hourData,
}) => {
    if (!isOpen || !hourData) return null;

    const config = getWeatherConfig(hourData.type);

    // リスクレベルに応じた状況説明
    const getStatusDescription = (riskLevel: number): string => {
        if (riskLevel >= 80) {
            return '⚠️ 極めて危険な状態です。GPS、通信、電力網に深刻な影響が予想されます。重要な活動は延期し、安全対策を実施してください。';
        } else if (riskLevel >= 60) {
            return '⚠️ 警戒が必要な状態です。GPS精度の低下や通信障害が発生する可能性があります。重要な作業は慎重に行ってください。';
        } else if (riskLevel >= 40) {
            return '注意が必要な状態です。GPSや通信にわずかな影響が出る可能性があります。予備手段の準備を推奨します。';
        } else if (riskLevel >= 20) {
            return '軽微な影響がある可能性がありますが、通常の活動に大きな支障はありません。';
        } else {
            return '宇宙天気は穏やかです。通常通りの活動が可能です。';
        }
    };

    // 影響を受けるサービス
    const affectedServices = [
        { icon: Navigation, name: 'GPS精度', risk: hourData.temp >= 40 },
        { icon: Satellite, name: '人工衛星', risk: hourData.temp >= 50 },
        { icon: Radio, name: '通信システム', risk: hourData.temp >= 45 },
        { icon: Zap, name: '電力インフラ', risk: hourData.temp >= 65 },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div
                className={`
          relative w-full max-w-md max-h-[85vh] overflow-y-auto
          bg-gradient-to-br from-gray-900 via-black to-gray-900
          rounded-2xl shadow-2xl
          border-2 ${config.borderColor}
        `}
            >
                {/* ヘッダー */}
                <div className={`sticky top-0 z-10 px-6 py-4 bg-black/90 backdrop-blur-sm border-b ${config.borderColor}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <RiskLevelIcon type={hourData.type} size={32} />
                            <div>
                                <h2 className="text-lg font-bold text-white">
                                    {hourData.time} の予報
                                </h2>
                                <p className={`text-sm font-semibold ${config.color}`}>
                                    {config.label}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* コンテンツ */}
                <div className="p-6 space-y-5">
                    {/* リスクレベル */}
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 mb-2">リスクレベル</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                                <div
                                    className={`h-full ${config.bgColor.replace('/20', '')} transition-all duration-500`}
                                    style={{ width: `${hourData.temp}%` }}
                                ></div>
                            </div>
                            <span className={`text-2xl font-bold ${config.color}`}>
                                {hourData.temp}%
                            </span>
                        </div>
                    </section>

                    {/* 影響確率 */}
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 mb-2">影響確率</h3>
                        <div className="flex items-baseline gap-2">
                            <span className={`text-3xl font-bold ${config.color}`}>
                                {hourData.pop}%
                            </span>
                            <span className="text-sm text-gray-400">
                                の確率で影響が発生
                            </span>
                        </div>
                    </section>

                    {/* 状況説明 */}
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 mb-2">状況説明</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {getStatusDescription(hourData.temp)}
                        </p>
                    </section>

                    {/* 影響を受けるサービス */}
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 mb-3">影響を受ける可能性のあるサービス</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {affectedServices.map((service) => {
                                const Icon = service.icon;
                                return (
                                    <div
                                        key={service.name}
                                        className={`
                      p-3 rounded-lg border
                      ${service.risk
                                                ? 'bg-red-500/10 border-red-500/30'
                                                : 'bg-green-500/10 border-green-500/30'
                                            }
                    `}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <Icon
                                                className={`w-4 h-4 ${service.risk ? 'text-red-400' : 'text-green-400'}`}
                                            />
                                            <span
                                                className={`text-xs font-semibold ${service.risk ? 'text-red-400' : 'text-green-400'}`}
                                            >
                                                {service.risk ? '影響あり' : '正常'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400">{service.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* 警告メッセージ（高リスク時） */}
                    {hourData.temp >= 60 && (
                        <section className="p-4 rounded-lg bg-red-500/10 border-2 border-red-500/30">
                            <p className="text-xs font-bold text-red-400 mb-1">⚠️ 警告</p>
                            <p className="text-sm text-red-300 leading-relaxed">
                                この時間帯は高リスクです。重要な活動やGPSに依存する作業は避けてください。
                            </p>
                        </section>
                    )}
                </div>

                {/* フッター */}
                <div className="px-6 py-4 bg-black/50 border-t border-white/10">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-semibold text-sm"
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
};
