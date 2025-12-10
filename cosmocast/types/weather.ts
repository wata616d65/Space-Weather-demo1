// 宇宙天気タイプの定義
export type WeatherType = 'sunny' | 'cloudy' | 'flare' | 'storm' | 'radiation';

// 時間別データ構造
export interface HourlyData {
    time: string;      // "14:00"
    temp: number;      // リスクレベル (0-100%)
    type: WeatherType; // 天気タイプ
    pop: number;       // 影響確率 (%)
}

// 日別データ構造
export interface DailyData {
    day: string;       // "水曜日"
    date: string;      // "12/10"
    type: WeatherType;
    minRisk: number;   // 最低リスクレベル
    maxRisk: number;   // 最高リスクレベル
}

// 詳細カード用データ
export interface DetailCard {
    id: string;
    label: string;
    value: string;
    icon: string;      // Lucide React アイコン名
    description: string;
}

// 都市別天気データの完全な型定義
export interface CityWeather {
    cityId: string;    // "osaka"
    cityName: string;  // "大阪市"
    current: {
        temp: number;    // 現在のリスクレベル (0-100)
        type: WeatherType;
        description: string; // "強力な磁気嵐が発生中"
        advice: string;      // "ドローン飛行は中止してください"
        timestamp: string;   // "2025/12/10 16:30"
    };
    hourly: HourlyData[];    // 24時間分
    daily: DailyData[];      // 7日分
    details: DetailCard[];   // 詳細カード
}

// アドバイスモーダル用データ
export interface AdviceData {
    title: string;
    description: string;
    actions: string[];
    severity: 'safe' | 'caution' | 'danger';
}
