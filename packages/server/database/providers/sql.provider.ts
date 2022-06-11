import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Setup default connection in the application
 * @param config {ConfigService}
 */
export const sqlConnection = (): TypeOrmModuleOptions => {
  const connection = {
    type: 'mssql',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: Number(process.env.TYPEORM_PORT || 1433),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [__dirname + '/**/*.{entity,schema}.{ts,js}', ...(process.env.TYPEORM_ENTITIES || '').split(',')],
    autoLoadEntities: (process.env.TYPEORM_AUTOLOAD || true) == true,
    synchronize: (process.env.TYPEORM_SYNCHRONIZE || process.env.NODE_ENV !== 'production') == true,
    logging: (process.env.TYPEORM_LOGGING || process.env.NODE_ENV !== 'production') == true,
    retryAttempts: Number(process.env.TYPEORM_RYTRY_ATTEMPTS || 10),
    options: {
      encrypt: (process.env.TYPEORM_OPTIONS_ENCRYPT || true) == true,
    },
    extra: {
      validateConnection: false,
      trustServerCertificate: true,
    },
  };

  console.log('Connection Config:', JSON.stringify(connection));
  return connection as TypeOrmModuleOptions;
};

export const SqlProvider = [
  TypeOrmModule.forRootAsync({
    useFactory: sqlConnection,
  }),
];
