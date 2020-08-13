import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudentService } from '../services/student.service'

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit 
{
  public studentList: any;
  @Output() eventClicked = new EventEmitter<Event>();
  constructor(private studentService: StudentService) { }

    ngOnInit(): void {
      this.studentService.getStudents().subscribe((results => {
        this.studentList = results;
      }))
    }

  onChange(event: Event) {
    this.eventClicked.emit(event);
  }

}