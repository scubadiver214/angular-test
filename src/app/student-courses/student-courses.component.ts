import { Component, Input, SimpleChanges } from '@angular/core';
import { StudentService } from '../services/student.service';
import { flatMap, map, mergeAll } from 'rxjs/operators';
import { Course } from '../models/course';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent {
  @Input() event: Event;
  public studentCourses: Course[];
  constructor(private studentService: StudentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.event.currentValue) {
      this.studentCourses = [];
      this.loadCourses();
    }
  }

  loadCourses(): void {
    const studentEmail: string = String(this.event);
    this.studentService
      .getCourseIdsForStudent(studentEmail)
      .pipe(
        flatMap((courses) => courses),
        map((item) => {
          return this.studentService.getCourse(item);
        }),
        mergeAll()
      )
      .subscribe((results) => {
        this.studentCourses.push(results);
        this.studentCourses.sort((a, b) => a.name.localeCompare(b.name));
      });
  }
}
