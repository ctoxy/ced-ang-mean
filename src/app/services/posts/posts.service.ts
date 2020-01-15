import { Injectable } from '@angular/core';
import { Post } from '../../Models/post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  /*use of ...spread posts need subject from rxjs*/
  private postsUpdated = new Subject<Post[]>();
  constructor() { }

  getPosts() {
    return [...this.posts];
  }
  /*le subject postUpdated etant prive il permet d etre ecoute en obserbable */
  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title, content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
