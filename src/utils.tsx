import { BaseDataResponse, StatsHistoryResponse } from './components/types';

/**
 * Common headers for all Kyra API calls.
 */
const KYRA_HEADERS: Record<string, string> = {
  'x-kyra-swagger': 'f583305f-9bc3-42dd-a520-8520483cff5a',
};

/**
 * Fetch base data (profile, stats, etc.).
 */
export async function getBaseData(): Promise<BaseDataResponse> {
  const res = await fetch(
    'https://saas.kyra.com/discovery/creators/5831967/base-data',
    { headers: KYRA_HEADERS }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch base-data. Status: ${res.status}`);
  }
  return res.json() as Promise<BaseDataResponse>;
}

/**
 * Fetch stats history (daily likes, followers, posting history).
 */
export async function getStatsHistory(): Promise<StatsHistoryResponse> {
  const res = await fetch(
    'https://saas.kyra.com/discovery/creators/5831967/stats-history',
    { headers: KYRA_HEADERS }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch stats-history. Status: ${res.status}`);
  }
  return res.json() as Promise<StatsHistoryResponse>;
}
