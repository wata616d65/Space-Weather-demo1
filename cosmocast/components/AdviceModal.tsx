'use client';

import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { CityWeather } from '@/types/weather';
import { getWeatherConfig } from '@/config/weatherConfig';

interface AdviceModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: CityWeather;
}

/**
 * Advice Modal コンポーネント
 * アドバイスと推奨アクションを表示
 */
export const AdviceModal: React.FC<AdviceModalProps> = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    const config = getWeatherConfig(data.current.type);

    // リスクレベルに応じたアクションリスト
    const getActions = () => {
        const adviceTexts = data.current.advice.split('。').filter(text => text.trim());
        return adviceTexts;
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center">
            <div className="w-full max-w-lg bg-gray-900 rounded-t-3xl sm:rounded-3xl border border-white/20 shadow-2xl max-h-[80vh] overflow-y-auto">
                {/* ヘッダー */}
                <div className={`sticky top-0 ${config.bgColor} border-b ${config.borderColor} p-6`}>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <AlertCircle size={28} className={config.color} />
                            <div>
                                <h3 className={`text-xl font-bold ${config.color}`}>
                                    {config.label}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    リスクレベル: {data.current.temp}%
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X size={24} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* コンテンツ */}
                <div className="p-6 space-y-6">
                    {/* 現象解説 */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                            現在の状況
                        </h4>
                        <p className="text-white leading-relaxed">
                            {data.current.description}
                        </p>
                    </div>

                    {/* 推奨アクション */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase mb-3">
                            推奨アクション
                        </h4>
                        <div className="space-y-2">
                            {getActions().map((action, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full ${config.bgColor.replace('/20', '')} mt-2`}></div>
                                    <p className="text-sm text-white flex-1">{action}。</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 警告メッセージ（高リスク時のみ） */}
                    {data.current.temp >= 60 && (
                        <div className="p-4 rounded-xl bg-red-500/10 border-2 border-red-500/50">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle size={20} className="text-red-400" />
                                <p className="text-sm font-bold text-red-400 uppercase">
                                    警告
                                </p>
                            </div>
                            <p className="text-sm text-white">
                                現在のリスクレベルは非常に高い状態です。屋外活動、ドローン飛行、精密な位置情報を必要とする作業は控えることを強く推奨します。
                            </p>
                        </div>
                    )}

                    {/* 閉じるボタン */}
                    <button
                        onClick={onClose}
                        className={`
              w-full py-4 rounded-xl font-semibold
              ${config.bgColor} ${config.borderColor}
              border-2 ${config.color}
              hover:scale-[1.02] transition-transform
            `}
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
};
