import { Component, Input, SimpleChanges } from '@angular/core';
import { StudentService } from '../services/student.service'

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent {

  @Input() event: Event;
  studentDetails: any;
  constructor(private studentService: StudentService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.event.currentValue){
      return;
    }
    this.studentService.getStudent(changes.event.currentValue).subscribe((results => {
      this.studentDetails = results;
    }))
  }
}