import { CtxUser, GqlAuthGuard, User } from '@caawiye/auth'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CourseService } from '../course.service'
import { CreateLessonInput } from '../dto/lesson/create-lesson.input'
import { UpdateLessonInput } from '../dto/lesson/update-lesson.input'
import { Lesson } from '../models/lesson'

@Resolver()
export class LessonResolver {
  constructor(private readonly service: CourseService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Lesson, { nullable: true })
  createLesson(@CtxUser() user: User, @Args('courseId') courseId: string, @Args('input') input: CreateLessonInput) {
    return this.service.createLesson(user.id, courseId, input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Lesson, { nullable: true })
  updateLesson(@CtxUser() user: User, @Args('lessonId') lessonId: string, @Args('input') input: UpdateLessonInput) {
    return this.service.updateLesson(user.id, lessonId, input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  deleteLesson(@CtxUser() user: User, @Args('lessonId') lessonId: string) {
    return this.service.deleteLesson(user.id, lessonId)
  }
}
