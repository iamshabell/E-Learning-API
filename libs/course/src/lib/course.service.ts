import { Injectable } from "@nestjs/common";
import { CreateCourseInput } from "./dto/create-course.input";
import { UpdateCourseInput } from "./dto/update-course.input";
import { Course } from "./models/course";

@Injectable()
export class CourseService {
    items: Course[] = [
            {
                id: "intro-to-angular",
                title: "The Complete Angular.js Developer Course",
            },
            {
                id: "intro-to-graphql",
                title: "The Complete GraphQL Developer Course",
            },
            {
                id: "intro-to-nest",
                title: "The Complete Nest.js Developer Course",
            },
        ];

        public courses() {
            return this.items;
        }

        public course(id: string) {
            return this.items.find(item => item.id === id);
        }

        public createCourse(input: CreateCourseInput){
            const newCourse: Course = {
                id: Math.random().toString(),
                ...input,
            };
            this.items.push(newCourse);
            return newCourse;
        }

        public updateCourse(id: string, input: UpdateCourseInput) {
            const course = this.course(id);
            if (!course) {
                return "Course not found";
            }
            const updatedCourse: Course = {
                ...course,
                ...input,
            }

            this.items = this.items.map(item => 
                item.id === id ? updatedCourse : item);
            return updatedCourse;
        }

        public deleteCourse(id: string) {
            const course = this.course(id);
            if (!course) {
                return false;
            }
            this.items = this.items.filter(item => item.id !== id);
            return true;
        }


}   