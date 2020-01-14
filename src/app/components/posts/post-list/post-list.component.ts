import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  /*posts = [
    {title: 'first title', name: 'this is first text associed with title'},
    {title: 'second title', name: 'this is second text associed with title'},
    {title: 'third title', name: 'this is third text associed with title'}
  ];*/
  posts =[];
  constructor() { }

  ngOnInit() {
  }

}
