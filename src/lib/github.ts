import { Octokit } from '@octokit/rest'

interface OAuthCredentials {
  access_token?: string;
}

interface ConnectionSettings {
  settings?: {
    expires_at?: string;
    access_token?: string;
    oauth?: {
      credentials?: OAuthCredentials;
    };
  };
}

let connectionSettings: ConnectionSettings | undefined;

async function getAccessToken() {
  if (connectionSettings?.settings?.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0] as ConnectionSettings | undefined);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

export async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  price: number;
  description: string;
  images: string[];
  details: Record<string, string | number>;
  featured?: boolean;
  featuredOrder?: number;
}

export async function fetchVehiclesFromGitHub(): Promise<Vehicle[]> {
  try {
    const octokit = await getUncachableGitHubClient();
    
    const response = await octokit.repos.getContent({
      owner: 'carsparkimport-spec',
      repo: 'myg-import',
      path: 'src/data/vehicles.json',
    });

    if ('content' in response.data && response.data.type === 'file') {
      const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
      return JSON.parse(content) as Vehicle[];
    }
    
    throw new Error('Invalid response format from GitHub');
  } catch (error) {
    console.error('Error fetching vehicles from GitHub:', error);
    throw error;
  }
}

export interface Auction {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  transmission: string;
  price: number;
  auctionDate: string;
  images: string[];
  details?: Record<string, string | number>;
}

export async function fetchAuctionsFromGitHub(): Promise<Auction[]> {
  try {
    const octokit = await getUncachableGitHubClient();
    
    const response = await octokit.repos.getContent({
      owner: 'carsparkimport-spec',
      repo: 'myg-import',
      path: 'src/data/auctions.json',
    });

    if ('content' in response.data && response.data.type === 'file') {
      const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
      return JSON.parse(content) as Auction[];
    }
    
    throw new Error('Invalid response format from GitHub');
  } catch (error) {
    console.error('Error fetching auctions from GitHub:', error);
    throw error;
  }
}

export type Locale = 'fr' | 'en';

export async function fetchTranslationsFromGitHub(locale: Locale): Promise<Record<string, unknown>> {
  try {
    const octokit = await getUncachableGitHubClient();
    
    const response = await octokit.repos.getContent({
      owner: 'carsparkimport-spec',
      repo: 'myg-import',
      path: `src/i18n/locales/${locale}.json`,
    });

    if ('content' in response.data && response.data.type === 'file') {
      const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
      return JSON.parse(content) as Record<string, unknown>;
    }
    
    throw new Error('Invalid response format from GitHub');
  } catch (error) {
    console.error(`Error fetching ${locale} translations from GitHub:`, error);
    throw error;
  }
}
