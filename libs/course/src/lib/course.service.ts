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

  public createCourse(userId: string, input: CreateCourseInput) {
    return this.data.course.create({
      data: {
        ...input,
      },
    })
  }

  public updateCourse(userID: string, id: string, input: UpdateCourseInput) {
    const course = this.course(id)

    return this.data.course.update({
      where: { id },
      data: {
        ...input,
      },
    })
  }

  public async deleteCourse(userId: string, id: string) {
    const deleted = await this.data.course.delete({ where: { id } })
    return !!deleted
  }

  public createLesson(userId: string, courseId: string, input: CreateLessonInput) {
    const course = this.course(courseId)
    return this.data.lesson.create({
      data: {
        course: { connect: { id: courseId } },
        ...input,
      },
    })
  }

  public updateLesson(userId: string, lessonId: string, input: UpdateLessonInput) {
    return this.data.lesson.update({
      where: { id: lessonId },
      data: { ...input },
    })
  }

  public async deleteLesson(userId: string, lessonId: string) {
    const deletedLesson = await this.data.lesson.delete({ where: { id: lessonId } })
    return !!deletedLesson
  }
}
