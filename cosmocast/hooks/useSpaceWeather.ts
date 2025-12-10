import { useState, useEffect } from 'react';
import { CityWeather } from '@/types/weather';
import { dummyWeatherData, DEFAULT_CITY } from '@/data/dummyData';

/**
 * 宇宙天気データ取得カスタムフック
 * DIP（依存性逆転の原則）に準拠：
 * 将来的にAPIに切り替える際、このHookの実装のみを変更すればOK
 */
export const useSpaceWeather = (cityId?: string) => {
    const [data, setData] = useState<CityWeather | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // 現在はダミーデータを使用
                // 将来的にはここでAPI呼び出しを行う
                // const response = await fetch(`/api/weather/${cityId || DEFAULT_CITY}`);
                // const weatherData = await response.json();

                const weatherData = dummyWeatherData[cityId || DEFAULT_CITY];

                if (!weatherData) {
                    throw new Error('都市データが見つかりません');
                }

                // ダミーデータなので即座に返すが、実際のAPIでは遅延がある
                await new Promise(resolve => setTimeout(resolve, 300));

                setData(weatherData);
            } catch (err) {
                setError(err instanceof Error ? err.message : '不明なエラー');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cityId]);

    return { data, loading, error };
};
