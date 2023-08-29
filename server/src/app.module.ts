import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAuthenticationMiddleware } from './middleware/firebase.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { WordModule } from './word/word.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URL), WordModule, UserModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirebaseAuthenticationMiddleware)
      .forRoutes('user');
  }
}
