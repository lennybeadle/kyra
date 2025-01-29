/**
 * Based on your actual JSON responses
 */

// The response from GET /base-data
export interface BaseDataResponse {
  data: {
    id: string;
    tiktok: {
      externalId: string;
      id: string;
      handle: string;
      followersCount: number;
      engagementRate: number;
      followingCount: number;
      likesCount: number;
      postsCount: number;
      region: string;
      bio: string;
      isPrivate: number;
      isVerified: boolean;
      isActive: boolean;
      medianEngagement: number;
      medianViews: number;
      sponsoredMedianEngagement: number;
      sponsoredMedianViews: number;
      isBrand: boolean;
      isKyra: number;
      profilePicture: string;
      nickname: string;
      language: string;
      mostRecentPostsWithTypes: any[];
    };
    instagram: {
      handle: string;
    };
    youtube: {
      channelId: string;
    };
    general: {
      email: string | null;
    };
    predAge: string;
    predGender: string;
  };
  predictedFee: number;
  predictedCpv: number;
}

// The response from GET /stats-history
export interface StatsHistoryResponse {
  data: {
    delta: {
      postsCount: { absolute: number; percentage: number };
      likesCount: { absolute: number; percentage: number };
      followersCount: { absolute: number; percentage: number };
      followingCount: { absolute: number; percentage: number };
    };
    historyPoints: Array<{
      postsCount: number;
      likesCount: number;
      followersCount: number;
      followingCount: number;
      viewsCount: number;
      createdAt: string; // e.g. "2024-12-29"
    }>;
  };
}
