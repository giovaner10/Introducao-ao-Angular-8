import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private CourseService: CourseService) { 

  }

  ngOnInit(): void {
    this.retrieveAll()

  }

  retrieveAll():void{
    this.CourseService.retrieveAll().subscribe(
      {next: courses=>{this._courses = courses;
      
        this.filteredCourses = this._courses
      },
      error: err => console.log('Error', err)
    })
  }
  
  deleteById(courseId: number){
    this.CourseService.deleteById(courseId).subscribe({
      next: ()=>{
        this.retrieveAll()
      }
    })
  }

  _courses: Course[] = []

  _filterBy!: string;
  filteredCourses: Course[] = []


  set filter(value: string){
    this._filterBy = value

    this.filteredCourses = this._courses.filter((cour: Course) =>
      cour.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1)
  }

    get filter(){
      return this._filterBy
    }
}



