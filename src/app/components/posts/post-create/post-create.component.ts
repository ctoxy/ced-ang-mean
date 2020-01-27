import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../../../services/posts/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../../../Models/post.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit, OnDestroy {
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
  /*Creation du reactive form form group*/
  form: FormGroup;
  /*Creation rendu image selectionner*/
  imagePreview: string;
  private authStatusSub: Subscription;



  constructor(public postsService: PostsService, public route: ActivatedRoute, private authService: AuthService) { }
  /*le composant post create sert pour edit et creation de fait dans le ng on init on valide le chemin*/
  ngOnInit() {
    this.authStatusSub = this.authService.getauthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    /*initialisation du formulaire reactive */
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, { validators: [Validators.required] }),
      'image': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      /*on verifie si l url passé contient postId issue du routing en mode edit si oui*/
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator
          };

          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath

          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  ngOnDestroy () {
    this.authStatusSub.unsubscribe();
  }
}
