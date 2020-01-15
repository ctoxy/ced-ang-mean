import { Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../../../Models/post.model';
import { PostsService } from '../../../services/posts/posts.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  /*posts = [
    {title: 'first title', content: 'this is first text associed with title'},
    {title: 'second title', content: 'this is second text associed with title'},
    {title: 'third title', content: 'this is third text associed with title'}
  ];*/
  /*recupére les posts issue de post create via event emitter */
  posts: Post[] = [];
  private postsSub: Subscription;
  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postsService.getPostUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }


}
