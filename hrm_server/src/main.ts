/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { response } from './common/response';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpFilter } from './common/filter';
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //配置静态资源目录
  app.useStaticAssets(join(__dirname, 'asset'), {
    prefix: '/asset',
  });

  // const whiteList = [
  //   '/api',
  //   // 接口文档
  //   '/api/api.docs',

  //   '/api/employee'
  // ];
  // function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
  //   console.log(req.originalUrl);
  //   if (whiteList.includes(req.originalUrl)) {
  //     next();
  //   } else {
  //     res.send({
  //       code: '404',
  //       message: 'Not Found',
  //     });
  //   }
  // }
  // 注册中间件 白名单
  // app.use(MiddleWareAll);


  // 全局注册请求拦截器Filter(过滤器)
  app.useGlobalFilters(new HttpFilter());

  // 全局注册响应拦截器Response
  app.useGlobalInterceptors(new response());

  // 配置swagger
  const options = new DocumentBuilder()
    // 开启token校验(login校验)
    // .addBearerAuth()
    .setTitle('HRM人资管理系统接口管理')
    .setDescription('HRM系统前后台swagger接口管理')
    // .setVersion('1')
    // .addTag('员工表接口', '员工表相关接口')
    // .addTag('管理员表接口', '管理员表相关接口')
    .build()
  // 创建swagger document
  const document = SwaggerModule.createDocument(app,options)
  // 使用document在app生效 路径为/api.docs
  SwaggerModule.setup('/api/api.docs',app,document)

  // 启用跨域
  app.enableCors({
    origin: [
    'http://127.0.0.1:6400',
    'http://127.0.0.1:6499',
    'http://localhost:6400',
    'http://localhost:6499',
  ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // express-session
  app.use(session({
    secret: 'liuxu123',
    resave: false,
    saveUninitialized: false,
  }))

  await app.listen(3000);
}
bootstrap();
