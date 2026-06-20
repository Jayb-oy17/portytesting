"use client";

import React from "react";

interface Skill {
  name: string;
  proficiency: number;
}

const colors = [
  "#8b5cf6",
  "#6366f1",
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
];

export default function SkillCircle({ skills }: { skills: Skill[] }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const numSkills = skills.length;
  const sliceLength = circumference / numSkills;
  const gap = 8;
  const dashLength = sliceLength - gap;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 200 200"
        >
          <circle
            className="text-gray-200 dark:text-gray-800"
            strokeWidth="16"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="100"
            cy="100"
          />

          {skills.map((skill, index) => {
            const offset = -(index * sliceLength);
            return (
              <circle
                key={skill.name}
                strokeWidth="16"
                stroke={colors[index % colors.length]}
                fill="transparent"
                r={radius}
                cx="100"
                cy="100"
                strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                strokeDashoffset={offset}
                className="transition-all duration-300 hover:opacity-70 cursor-pointer"
              >
                <title>
                  {skill.name}: {skill.proficiency}%
                </title>
              </circle>
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            {skills.length}
          </span>
          <span className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">
            Core Skills
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 max-w-2xl">
        {skills.map((skill, index) => (
          <div key={skill.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
