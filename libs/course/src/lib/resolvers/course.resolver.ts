import { CtxUser, GqlAuthGuard, User } from '@caawiye/auth'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CourseService } from '../course.service'
import { CreateCourseInput } from '../dto/course/create-course.input'
import { UpdateCourseInput } from '../dto/course/update-course.input'
import { Course } from '../models/course'

@Resolver()
export class CourseResolver {
  constructor(private readonly service: CourseService) {}

  @Query(() => [Course], { nullable: true })
  courses() {
    return this.service.courses()
  }

  @Query(() => Course, { nullable: true })
  course(@Args('id') id: string) {
    return this.service.course(id)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Course, { nullable: true })
  createCourse(
    @CtxUser() user: User,
    @Args('input')
    input: CreateCourseInput,
  ) {
    return this.service.createCourse(user.id, input)
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Course, { nullable: true })
  updateCourse(@CtxUser() user: User, @Args('id') id: string, @Args('input') input: UpdateCourseInput) {
    return this.service.updateCourse(user.id, id, input)
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  deleteCourse(@CtxUser() user: User, @Args('id') id: string) {
    return this.service.deleteCourse(user.id, id)
  }
}
