import { Injectable } from '@angular/core';
import { Post } from '../../Models/post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
    this.httpClient
      .get<{message: string, posts: any}>(
       'http://localhost:3000/api/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map( post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
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

  deletePost(postId: string) {
    this.httpClient.delete<{message: string}>('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('Deleted post from the front with the id :' + postId );
      });
  }


}
