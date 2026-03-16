import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // 这里的报错会告诉你环境变量是否生效
  throw new Error('DATABASE_URL is not set in .env file');
}

// 创建连接
const sql = postgres(connectionString, {
  ssl: false, // 本地宝塔环境通常不需要 SSL，关闭它可以避免连接失败
  max: 10,    // 最大连接池
});

export default sql;
