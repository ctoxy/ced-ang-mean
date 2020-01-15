import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../Models/post.model';
import { PostsService } from '../../../services/posts/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  /*posts = [
    {title: 'first title', content: 'this is first text associed with title'},
    {title: 'second title', content: 'this is second text associed with title'},
    {title: 'third title', content: 'this is third text associed with title'}
  ];*/
  /*recupére les posts issue de post create via event emitter */
  @Input() posts: Post[] = [];
  constructor(public postsService: PostsService) { }

  ngOnInit() {
  }

}
