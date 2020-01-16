import { Injectable } from '@angular/core';
import { Post } from '../../Models/post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  /*use of ...spread posts need subject from rxjs*/
  private postsUpdated = new Subject<Post[]>();
  constructor(private httpClient: HttpClient, private router: Router) {}
  /*voir requete get dans app.js*/
  getPosts() {
    this.httpClient
      .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  /*le subject postUpdated etant prive il permet d etre ecoute en obserbable */
  getPostUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  /*recuperation de l'id pour le mode edit post*/
  getPost(id: string) {
    return this.httpClient.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/posts/' + id
    );
  }

  /*ajout dun post */
  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.httpClient
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.httpClient
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }


  deletePost(postId: string) {
    this.httpClient
      .delete<{message: string}>('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log('Deleted post from the front with the id :' + postId );
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }


}
