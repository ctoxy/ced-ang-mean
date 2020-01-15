import { Component } from '@angular/core';
import { Post } from './Models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ced-ang-mean';
  storedPost: Post[] = [];
  onPostAdded(post) {
    this.storedPost.push(post);
  }
}
