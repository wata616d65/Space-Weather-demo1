import React from 'react';
import { WeatherType } from '@/types/weather';
import { weatherConfig } from '@/config/weatherConfig';
import { RiskLevelIcon } from './RiskLevelIcon';
import { X } from 'lucide-react';

interface WeatherTypeDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    weatherType: WeatherType | null;
}

/**
 * 天気タイプ詳細モーダル
 * 各宇宙天気現象の詳細説明を表示
 */
export const WeatherTypeDetailModal: React.FC<WeatherTypeDetailModalProps> = ({
    isOpen,
    onClose,
    weatherType,
}) => {
    if (!isOpen || !weatherType) return null;

    const config = weatherConfig[weatherType];

    // 各天気タイプの詳細情報
    const detailInfo: Record<WeatherType, {
        mechanism: string;
        impacts: string[];
        actions: string[];
        metrics: string;
    }> = {
        sunny: {
            mechanism: '太陽活動が穏やかで、地球の磁気圏への影響が最小限の状態です。太陽風の速度と密度が通常レベルで、フレアやCME（コロナ質量放出）の発生がない時期に見られます。',
            impacts: [
                '通信・GPS：正常動作',
                '人工衛星：通常運用可能',
                '電力網：影響なし',
                'オーロラ：極地のみで観測可能',
            ],
            actions: [
                '特別な対策は不要です',
                '通常通りの活動が可能です',
                '宇宙天気の監視を継続',
            ],
            metrics: 'リスクレベル 0-20%: 通常レベルの太陽活動を示します',
        },
        cloudy: {
            mechanism: '小規模な太陽フレアやコロナホールからの太陽風により、地球の磁気圏がやや乱れている状態です。Cクラス〜Mクラスの小規模フレアが発生している可能性があります。',
            impacts: [
                '通信・GPS：わずかな誤差の可能性',
                '人工衛星：軽微な影響の可能性',
                '高緯度地域：オーロラ活動の増加',
                '航空機：極地ルートでわずかな影響',
            ],
            actions: [
                'GPS精度の確認を推奨',
                '重要な通信は予備手段を準備',
                '衛星運用者は監視を強化',
            ],
            metrics: 'リスクレベル 21-40%: 軽度の宇宙天気擾乱を示します',
        },
        flare: {
            mechanism: 'M〜Xクラスの太陽フレアが発生し、強力なX線や紫外線が地球に到達しています。電離層が急激に変化し、無線通信に影響を与えます。',
            impacts: [
                '短波通信：一時的な途絶の可能性',
                'GPS：測位精度の低下（数メートル〜数十メートル）',
                '航空通信：高周波通信の障害',
                '人工衛星：太陽電池パネルへの影響',
            ],
            actions: [
                'GPSに依存する作業は延期を検討',
                '短波通信の代替手段を準備',
                'ドローン飛行は慎重に',
                '衛星運用者は保護モードを検討',
            ],
            metrics: 'リスクレベル 41-60%: 中規模の太陽フレア活動を示します',
        },
        storm: {
            mechanism: 'CME（コロナ質量放出）が地球に到達し、地磁気嵐が発生しています。太陽から放出された大量のプラズマが地球の磁気圏を圧迫し、激しく変動させています。',
            impacts: [
                'GPS：大幅な測位誤差（数十〜数百メートル）',
                '通信衛星：サービス中断の可能性',
                '送電網：誘導電流による障害リスク',
                'オーロラ：中緯度地域でも観測可能',
                '航空機：極地ルートの迂回が必要',
            ],
            actions: [
                '重要なGPS利用作業は中止',
                '衛星通信の代替手段を使用',
                '電力会社は系統保護を強化',
                '航空会社はルート変更を検討',
                '宇宙飛行士は船外活動を延期',
            ],
            metrics: 'リスクレベル 61-80%: 地磁気嵐（G1〜G3クラス）を示します',
        },
        radiation: {
            mechanism: '大規模な太陽フレアに伴い、高エネルギー陽子が加速され地球に到達しています。太陽放射線嵐が発生し、人工衛星や航空機、宇宙飛行士に深刻な影響を与えます。',
            impacts: [
                '人工衛星：メモリエラー、機能停止のリスク',
                '極地飛行：乗客・乗員の被ばくリスク',
                '宇宙ステーション：宇宙飛行士への健康影響',
                '通信：全面的な障害の可能性',
                'GPS：著しい測位誤差または使用不能',
            ],
            actions: [
                '極地飛行ルートの運航停止',
                '人工衛星は安全モードに移行',
                '宇宙飛行士は船外活動を中止し、シェルターへ退避',
                'GPSに依存するシステムを停止',
                '重要インフラは手動運転に切り替え',
            ],
            metrics: 'リスクレベル 81-100%: 太陽放射線嵐（S3〜S5クラス）を示します',
        },
    };

    const detail = detailInfo[weatherType];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div
                className={`
          relative w-full max-w-lg max-h-[90vh] overflow-y-auto
          bg-gradient-to-br from-gray-900 via-black to-gray-900
          rounded-2xl shadow-2xl
          border-2 ${config.borderColor}
        `}
            >
                {/* ヘッダー */}
                <div className={`sticky top-0 z-10 px-6 py-4 bg-black/90 backdrop-blur-sm border-b ${config.borderColor}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <RiskLevelIcon type={weatherType} size={36} />
                            <div>
                                <h2 className={`text-xl font-bold ${config.color}`}>
                                    {config.label}
                                </h2>
                                <p className="text-xs text-gray-400">
                                    リスクレベル: {config.riskLevel}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* コンテンツ */}
                <div className="p-6 space-y-6">
                    {/* 状態説明 */}
                    <section>
                        <h3 className="text-sm font-bold text-cyan-400 mb-2 flex items-center gap-2">
                            <span className="w-1 h-4 bg-cyan-400 rounded"></span>
                            どんな状態？
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {detail.mechanism}
                        </p>
                    </section>

                    {/* 数値の説明 */}
                    <section>
                        <h3 className="text-sm font-bold text-purple-400 mb-2 flex items-center gap-2">
                            <span className="w-1 h-4 bg-purple-400 rounded"></span>
                            数値の説明
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {detail.metrics}
                        </p>
                    </section>

                    {/* 影響 */}
                    <section>
                        <h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">
                            <span className="w-1 h-4 bg-orange-400 rounded"></span>
                            どんな影響があるのか？
                        </h3>
                        <ul className="space-y-2">
                            {detail.impacts.map((impact, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                                    <span className="text-orange-400 mt-1">•</span>
                                    <span>{impact}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* 対処方法 */}
                    <section>
                        <h3 className="text-sm font-bold text-green-400 mb-2 flex items-center gap-2">
                            <span className="w-1 h-4 bg-green-400 rounded"></span>
                            どんな対処をしたらいい？
                        </h3>
                        <ul className="space-y-2">
                            {detail.actions.map((action, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span>{action}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* フッター */}
                <div className="px-6 py-4 bg-black/50 border-t border-white/10">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-semibold"
                    >
                        閉じる
                    </button>
                </div>
            </div>
        </div>
    );
};
