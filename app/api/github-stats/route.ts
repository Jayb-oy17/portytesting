import { NextResponse } from 'next/server';

const GITHUB_USERNAME = "Jayb-oy17";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Add your token to .env.local

if (!GITHUB_TOKEN) {
  console.error('Missing GITHUB_TOKEN environment variable');
}

const headers = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': 'Portfolio-App',
};

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export async function GET() {
  try {
    // 1. Fetch contribution calendar via GraphQL
    const graphqlRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          username: GITHUB_USERNAME,
          from: new Date(new Date().getFullYear(), 0, 1).toISOString(), // Jan 1st of current year
          to: new Date().toISOString(),
        },
      }),
      next: { revalidate: 3600 },
    });

    if (!graphqlRes.ok) {
      throw new Error(`GraphQL error: ${graphqlRes.status}`);
    }

    const graphqlData = await graphqlRes.json();
    const calendar =
      graphqlData.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      throw new Error('No contribution calendar found');
    }

    // Flatten all days
    const allDays: { date: string; count: number }[] = [];
    for (const week of calendar.weeks) {
      for (const day of week.contributionDays) {
        allDays.push({
          date: day.date,
          count: day.contributionCount,
        });
      }
    }

    // Yearly (monthly) aggregation
    const monthlyCounts: Record<string, number> = {};
    months.forEach((m) => (monthlyCounts[m] = 0));

    for (const { date, count } of allDays) {
      const d = new Date(date);
      if (d.getFullYear() === new Date().getFullYear()) {
        const month = months[d.getMonth()];
        monthlyCounts[month] += count;
      }
    }

    const yearlyData = months.map((month) => ({
      month,
      activity: monthlyCounts[month],
    }));

    // Weekly aggregation (last 7 days)
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // inclusive of today

    const weeklyMap: Record<string, number> = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().split('T')[0];
      weeklyMap[key] = 0;
    }

    for (const { date, count } of allDays) {
      if (weeklyMap.hasOwnProperty(date)) {
        weeklyMap[date] += count;
      }
    }

    const weeklyData = Object.entries(weeklyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, hours]) => {
        const d = new Date(date);
        return {
          day: dayNames[d.getDay()],
          hours,
        };
      });

    // 2. Fetch repos for language & totals (REST API)
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!reposRes.ok) {
      throw new Error(`Repos API error: ${reposRes.status}`);
    }

    const repos = await reposRes.json();

    // Languages
    const langCounts: Record<string, number> = {};
    repos.forEach((repo: any) => {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    });

    const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0);
    const languageData = Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        value: Math.round((count / totalLangRepos) * 100),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    // Totals
    const totalRepos = repos.length;
    const totalStars = repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0);
    const totalForks = repos.reduce((sum: number, r: any) => sum + (r.forks_count || 0), 0);

    console.log('=== NEW ACCURATE STATS ===');
    console.log('Yearly:', yearlyData);
    console.log('Weekly:', weeklyData);
    console.log('Languages:', languageData);
    console.log('Total Contributions:', calendar.totalContributions);

    return NextResponse.json({
      yearlyData,
      weeklyData,
      languageData,
      totalContributions: calendar.totalContributions,
      totalRepos,
      totalStars,
      totalForks,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('GitHub Stats Error:', error);
    return NextResponse.json({
      yearlyData: months.map((m) => ({ month: m, activity: 0 })),
      weeklyData: dayNames.map((d) => ({ day: d, hours: 0 })),
      languageData: [],
      totalContributions: 0,
      totalRepos: 0,
      totalStars: 0,
      totalForks: 0,
      error: String(error),
    });
  }
}