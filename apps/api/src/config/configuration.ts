export type AppConfig = {
  api: {
    port: number;
  };
  cors: {
    origin: string | string[];
  };
  database: {
    url?: string;
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
  cors: {
    origin: parseCorsOrigin(process.env.CORS_ORIGIN)
  },
  database: {
    url: process.env.DATABASE_URL
  }
});
