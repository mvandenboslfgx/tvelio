const requiredServer = ['YOUTUBE_API_KEY'] as const;

export function getServerEnv() {
  for (const key of requiredServer) {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  }
  return {
    youtubeApiKey: process.env.YOUTUBE_API_KEY!,
    youtubeRegionCode: process.env.YOUTUBE_REGION_CODE || 'NL'
  };
}
