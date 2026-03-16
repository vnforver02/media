import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set in .env');
}

// 连接本地数据库，必须关闭 SSL
const sql = postgres(connectionString, {
  ssl: false,
});

export default sql;