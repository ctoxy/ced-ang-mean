import { Component, OnInit, OnDestroy} from '@angular/core';
import { PageEvent } from "@angular/material";
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
  isLoading = false;
  /* for paginator */
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  private postsSub: Subscription;
  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService
      .getPostUpdatedListener()
      .subscribe((postData: {posts: Post[], postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDeletePost(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    if (this.postsSub) {

      this.postsSub.unsubscribe();

    }
  }




}
