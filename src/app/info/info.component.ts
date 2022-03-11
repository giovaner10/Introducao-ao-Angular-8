import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../courses/course';
import { CourseService } from '../courses/course.service';

@Component({
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService) { 

  }

  ngOnInit(): void {
    this.courseService.retrieveById(Number(this.activatedRoute.snapshot.paramMap.get('id'))).
    subscribe({next: course => this.course = course,
      error: err => console.log('Error', err)
    })
  }

  course !: Course

  save(): void{
    this.courseService.save(this.course).subscribe({
      next: () => console.log("ok")
    })
  }
}
