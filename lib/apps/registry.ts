export interface TvAppDefinition {
  id: string;
  name: string;
  route: string;
  enabled: boolean;
}

export const tvApps: TvAppDefinition[] = [
  { id: 'youtube', name: "Video's", route: '/apps?app=youtube', enabled: true }
];
