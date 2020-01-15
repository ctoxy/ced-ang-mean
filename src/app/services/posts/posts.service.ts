import { Injectable } from '@angular/core';
import { Post } from '../../Models/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  /*use of ...spread posts need subject from rxjs*/
  private postsUpdated = new Subject<Post[]>();
  constructor(private httpClient: HttpClient) { }
  /*voir requete get dans app.js*/
  getPosts() {
    this.httpClient.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  /*le subject postUpdated etant prive il permet d etre ecoute en obserbable */
  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null, title, content};
    this.httpClient.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });

  }
}
