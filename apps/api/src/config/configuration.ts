export type AppConfig = {
  api: {
    port: number;
  };
  web: {
    appUrl: string;
  };
  cors: {
    origin: string | string[];
  };
  database: {
    url?: string;
  };
  jwt: {
    secret?: string;
    accessTokenTtl: string;
  };
};

const parseCorsOrigin = (origin?: string): string | string[] => {
  if (!origin) {
    return 'http://localhost:3000';
  }

  return origin
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
};

export default (): AppConfig => ({
  api: {
    port: Number.parseInt(process.env.API_PORT ?? '3001', 10)
  },
  web: {
    appUrl: process.env.WEB_APP_URL ?? 'http://localhost:3000'
  },
  cors: {
    origin: parseCorsOrigin(process.env.CORS_ORIGIN)
  },
  database: {
    url: process.env.DATABASE_URL
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenTtl: process.env.JWT_ACCESS_TOKEN_TTL ?? '15m'
  }
});
