import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CourseService } from '../course.service'
import { CreateLessonInput } from '../dto/lesson/create-lesson.input'
import { UpdateLessonInput } from '../dto/lesson/update-lesson.input'
import { Lesson } from '../models/lesson'

@Resolver()
export class LessonResolver {
  constructor(private readonly service: CourseService) {}

  @Mutation(() => Lesson, { nullable: true })
  createLesson(@Args('courseId') courseId: string, @Args('input') input: CreateLessonInput) {
    return this.service.createLesson(courseId, input)
  }
  @Mutation(() => Lesson, { nullable: true })
  updateLesson(@Args('lessonId') lessonId: string, @Args('input') input: UpdateLessonInput) {
    return this.service.updateLesson(lessonId, input)
  }
  @Mutation(() => Boolean, { nullable: true })
  deleteLesson(@Args('lessonId') lessonId: string) {
    return this.service.deleteLesson(lessonId)
  }
}
