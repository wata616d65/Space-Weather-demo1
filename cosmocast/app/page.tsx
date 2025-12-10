'use client';

import React, { useState } from 'react';
import { useSpaceWeather } from '@/hooks/useSpaceWeather';
import { DEFAULT_CITY } from '@/data/dummyData';
import { Header } from '@/components/Header';
import { CurrentWeatherHero } from '@/components/CurrentWeatherHero';
import { WeatherLegend } from '@/components/WeatherLegend';
import { HourlyForecast } from '@/components/HourlyForecast';
import { WeeklyForecast } from '@/components/WeeklyForecast';
import { DetailCards } from '@/components/DetailCards';
import { AdviceModal } from '@/components/AdviceModal';
import { HourlyDetailModal } from '@/components/HourlyDetailModal';
import { WeatherTypeDetailModal } from '@/components/WeatherTypeDetailModal';
import { DailyData, HourlyData, WeatherType } from '@/types/weather';

export default function Home() {
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
  const [isAdviceModalOpen, setIsAdviceModalOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState<HourlyData | null>(null);
  const [selectedWeatherType, setSelectedWeatherType] = useState<WeatherType | null>(null);
  const { data, loading, error } = useSpaceWeather(selectedCity);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-red-400 text-lg mb-2">エラーが発生しました</p>
          <p className="text-gray-400">{error || 'データを取得できませんでした'}</p>
        </div>
      </div>
    );
  }

  const handleDayClick = (day: DailyData) => {
    console.log('Selected day:', day);
  };

  const handleHourClick = (hour: HourlyData) => {
    setSelectedHour(hour);
  };

  const handleWeatherTypeClick = (type: WeatherType) => {
    setSelectedWeatherType(type);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header currentCity={selectedCity} onCityChange={setSelectedCity} />

      {/* Current Weather Hero */}
      <CurrentWeatherHero
        data={data}
        onAdviceClick={() => setIsAdviceModalOpen(true)}
      />

      {/* Weather Legend */}
      <WeatherLegend onWeatherTypeClick={handleWeatherTypeClick} />

      {/* Hourly Forecast */}
      <HourlyForecast hourlyData={data.hourly} onHourClick={handleHourClick} />

      {/* Weekly Forecast */}
      <WeeklyForecast
        dailyData={data.daily}
        onDayClick={handleDayClick}
      />

      {/* Detail Cards */}
      <DetailCards details={data.details} />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-400">
            CosmoCast - 宇宙天気予報アプリ
          </p>
          <p className="text-xs text-gray-500">
            プロトタイプ版 | データはダミーです
          </p>
        </div>
      </footer>

      {/* Advice Modal */}
      <AdviceModal
        isOpen={isAdviceModalOpen}
        onClose={() => setIsAdviceModalOpen(false)}
        data={data}
      />

      {/* Hourly Detail Modal */}
      <HourlyDetailModal
        isOpen={selectedHour !== null}
        onClose={() => setSelectedHour(null)}
        hourData={selectedHour}
      />

      {/* Weather Type Detail Modal */}
      <WeatherTypeDetailModal
        isOpen={selectedWeatherType !== null}
        onClose={() => setSelectedWeatherType(null)}
        weatherType={selectedWeatherType}
      />
    </main>
  );
}
