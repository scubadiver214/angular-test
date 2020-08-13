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
  public studentCources: Course[];
  constructor(private studentService: StudentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.event.currentValue) {
      this.loadCourses();
    }
  }

  loadCourses(): void {
    const studentEmail: any = this.event;
    this.studentCources = [];
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
        this.studentCources.push(results);
      });
  }
}
