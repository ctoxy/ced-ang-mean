import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../../services/posts/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../../../Models/post.model';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  /*recuperation de l object post issue du model */
  post: Post;
  /*recupération des données terminé */
  isLoading = false;
  /*mode par defaut du composant*/
  private mode = 'create';
  /*etat du postId null par defaut en creation ou postid recupére du back si edit*/
  private postId: string;


  constructor(public postsService: PostsService, public route: ActivatedRoute) { }
  /*le composant post create sert pour edit et creation de fait dans le ng on init on valide le chemin*/
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      /*on verifie si l url passé contient postId issue du routing en mode edit si oui*/
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
