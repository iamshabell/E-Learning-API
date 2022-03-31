import { CoreModule } from '@caawiye/core'
import { CourseModule } from '@caawiye/course'
import { DataModule } from '@caawiye/data'
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [CoreModule, CourseModule, DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
