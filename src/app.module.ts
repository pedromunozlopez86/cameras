import { Module } from '@nestjs/common';
import { CamerasModule } from './cameras/cameras.module';

@Module({
  imports: [CamerasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
