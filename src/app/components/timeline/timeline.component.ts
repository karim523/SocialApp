import { User } from './../../core/interfaces/ipost';
import { Component, inject } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { Ipost } from '../../core/interfaces/ipost';
import { DatePipe } from '@angular/common';
import { CommentComponent } from '../../shared/ui/comment/comment.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [DatePipe, CommentComponent, FormsModule, RouterLink],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  private readonly _PostsService = inject(PostsService);
  readonly _UsersService = inject(UsersService);
  private readonly _ToastrService = inject(ToastrService);
  postsList: Ipost[] = [];
  userName: string = ' ';
  placeholder: string = ' ';
  userPhoto!: string;
  saveFile!: File;
  content!: string;
  ngOnInit(): void {
    this.displayPosts();

    this._UsersService.getLoggedUserData().subscribe({
      next: (res) => {
        this.userName = res.user.name;
        this.userPhoto = res.user.photo;
        this.placeholder = 'What is on your mine ' + this.userName + '!';
      },
    });
  }
  changeImage(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.saveFile = input.files[0];
    }
  }

  createPost(): void {
    const data = new FormData();
    data.append('body', this.content);
    data.append('image', this.saveFile);

    this._PostsService.creatPost(data).subscribe({
      next: (res) => {
        this.displayPosts();
        this._ToastrService.success(res.message, 'linked post');

      },
    });
  }
  displayPosts(): void {
    this._PostsService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.postsList = res.posts;
      },
    });
  }
}
