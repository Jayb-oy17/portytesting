"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  month?: string;
  day?: string;
  name?: string;
  activity?: number;
  hours?: number;
  value?: number;
}

interface GitHubStats {
  yearlyData: DataPoint[];
  weeklyData: DataPoint[];
  languageData: DataPoint[];
  totalContributions: number;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  lastUpdated: string;
  error?: string;
}

const COLORS = [
  "#8b5cf6",
  "#6366f1",
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
];

export default function CodingActivity() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/github-stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Loading GitHub stats...
          </p>
        </div>
      </section>
    );
  }

  if (!stats) {
    return (
      <section className="py-16 px-4 bg-gray-500 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500">Failed to load GitHub stats</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            GitHub Activity
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Contributions:{" "}
            <span className="font-bold text-violet-600 dark:text-violet-400">
              {stats.totalContributions}
            </span>
            {" | "}
            Repos: <span className="font-bold">{stats.totalRepos}</span>
            {" | "}
            Stars: <span className="font-bold">{stats.totalStars}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Yearly Bar Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Monthly Contributions - {new Date().getFullYear()}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.yearlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.2}
                />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar
                  dataKey="activity"
                  name="Contributions"
                  fill="#8b5cf6"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Line Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Last 7 Days
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stats.weeklyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.2}
                />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="hours"
                  name="Contributions"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ fill: "#6366f1", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Language Pie Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Languages
            </h3>
            {stats.languageData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={stats.languageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={(entry) => `${entry.name} ${entry.value}%`}
                  >
                    {stats.languageData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-12">
                No language data
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
