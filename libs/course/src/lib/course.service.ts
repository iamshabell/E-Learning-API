import { Injectable, NotFoundException } from '@nestjs/common'
import { DataService } from '@caawiye/data'
import { CreateCourseInput } from './dto/course/create-course.input'
import { UpdateCourseInput } from './dto/course/update-course.input'
import { CreateLessonInput } from './dto/lesson/create-lesson.input'
import { UpdateLessonInput } from './dto/lesson/update-lesson.input'
import { Course } from './models/course'
import { Lesson } from './models/lesson'

@Injectable()
export class CourseService {
  items: Course[] = [
    {
      id: 'intro-to-angular',
      title: 'The Complete Angular.js Developer Course',
      lessons: [
        {
          id: 'intro-to-angular-lesson-1',
          title: 'Intro to Angular.js',
          content: 'Intro Angular.js Developer Course',
        },
        {
          id: 'intro-to-angular-lesson-2',
          title: 'Basics of Angular.js',
          content: 'Basics Angular.js Developer Course',
        },
      ],
    },
    {
      id: 'intro-to-graphql',
      title: 'The Complete GraphQL Developer Course',
      lessons: [
        {
          id: 'intro-to-graphql-lesson-1',
          title: 'Intro to GraphQL',
          content: 'Intro GraphQL Developer Course',
        },
        {
          id: 'intro-to-graphql-lesson-2',
          title: 'Basics of GraphQL',
          content: 'Basics GraphQL Developer Course',
        },
      ],
    },
    {
      id: 'intro-to-nest',
      title: 'The Complete Nest.js Developer Course',
      lessons: [
        {
          id: 'intro-to-nest-lesson-1',
          title: 'Intro to Nest.js',
          content: 'Intro Nest.js Developer Course',
        },
        {
          id: 'intro-to-nest-lesson-2',
          title: 'Basics of Nest.js',
          content: 'Basics Nest.js Developer Course',
        },
      ],
    },
  ]

  constructor(private readonly data: DataService) {}

  public courses() {
    return this.data.course.findMany({ include: { lessons: true } })
  }

  public async course(id: string) {
    const found = await this.data.course.findUnique({ where: { id }, include: { lessons: true } })

    if (!found) {
      throw new NotFoundException(`Course not found which its id is: ${id}`)
    }
    return found
  }

  public createCourse(input: CreateCourseInput) {
    return this.data.course.create({
      data: {
        ...input,
      },
    })
  }

  public updateCourse(id: string, input: UpdateCourseInput) {
    const course = this.course(id)

    return this.data.course.update({
      where: { id },
      data: {
        ...input,
      },
    })
  }

  public async deleteCourse(id: string) {
    const deleted = await this.data.course.delete({ where: { id } })
    return !!deleted
  }

  public createLesson(courseId: string, input: CreateLessonInput) {
    const course = this.course(courseId)
    return this.data.lesson.create({
      data: {
        course: { connect: { id: courseId } },
        ...input,
      },
    })
  }

  public updateLesson(lessonId: string, input: UpdateLessonInput) {
    return this.data.lesson.update({
      where: { id: lessonId },
      data: { ...input },
    })
  }

  public async deleteLesson(lessonId: string) {
    const deletedLesson = await this.data.lesson.delete({ where: { id: lessonId } })
    return !!deletedLesson
  }
}
