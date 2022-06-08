import 'reflect-metadata';
import * as http from 'http';
import { NextApiHandler } from 'next';
import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { AppModule } from '@/server/modules/app/app.module';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
declare const module: any;

export module Backend {
	let app: INestApplication;

	export async function getApp() {
		if (!app) {
			app = await NestFactory.create(AppModule, { bodyParser: false });
			app.setGlobalPrefix('api');
			app.use(cookieParser());
			app.use(
				csurf({
					cookie: true,
				}),
			);

			await app.init();
		}

		if (module.hot) {
			module.hot.accept();
			module.hot.dispose(() => app.close());
		}

		return app;
	}

	export async function getListener() {
		const app = await getApp();
		const server: http.Server = app.getHttpServer();
		const [listener] = server.listeners('request') as NextApiHandler[];

		Logger.log(`server starting on ${process.env.API_URL}`);

		return listener;
	}
}
