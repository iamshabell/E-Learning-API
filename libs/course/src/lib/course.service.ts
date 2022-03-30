import { Injectable } from '@nestjs/common'
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

  public courses(): Course[] {
    return this.items
  }

  public course(id: string): Course {
    return this.items.find((item) => item.id === id)
  }

  public createCourse(input: CreateCourseInput) {
    const newCourse: Course = {
      id: Math.random().toString(),
      ...input,
    }
    this.items.push(newCourse)
    return newCourse
  }

  public updateCourse(id: string, input: UpdateCourseInput, lessons?: Lesson[]) {
    const course = this.course(id)
    if (!course) {
      return 'Course not found'
    }
    const updatedCourse: Course = {
      ...course,
      ...input,
      lessons: lessons ? lessons : course.lessons,
    }

    this.items = this.items.map((item) => (item.id === id ? updatedCourse : item))
    return updatedCourse
  }

  public deleteCourse(id: string) {
    const course = this.course(id)
    if (!course) {
      return false
    }
    this.items = this.items.filter((item) => item.id !== id)
    return true
  }

  public createLesson(courseId: string, input: CreateLessonInput) {
    const newLesson: Lesson = {
      id: Math.random().toString(),
      ...input,
    }
    const course = this.course(courseId)

    this.updateCourse(courseId, {}, [...course.lessons, newLesson])

    return newLesson
  }

  public updateLesson(courseId: string, lessonId: string, input: UpdateLessonInput) {
    const course = this.course(courseId)

    const lesson = course.lessons.find((item) => item.id === lessonId)

    const updatedLesson: Lesson = {
      ...lesson,
      ...input,
    }

    course.lessons = course.lessons.map((item) => {
      if (item.id === lessonId) {
        return updatedLesson
      }
      return item
    })
    return updatedLesson
  }

  public deleteLesson(courseId: string, lessonId: string) {
    const course = this.course(courseId)
    if (!course) {
      return false
    }

    const lesson = course.lessons.find((item) => item.id === lessonId)

    if (!lesson) {
      return false
    }

    course.lessons = course.lessons.filter((item) => item.id !== lessonId)

    return true
  }
}
