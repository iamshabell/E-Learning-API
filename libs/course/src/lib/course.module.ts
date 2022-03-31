import { Module } from '@nestjs/common'
import { CourseResolver } from './resolvers/course.resolver'
import { CourseService } from './course.service'
import { LessonResolver } from './resolvers/lesson.resolver'
import { DataModule } from '@caawiye/data'

@Module({
  imports: [DataModule],
  controllers: [],
  providers: [CourseResolver, CourseService, LessonResolver],
  exports: [],
})
export class CourseModule {}
