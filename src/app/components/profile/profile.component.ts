import { Component, inject } from '@angular/core';
import { Ipost } from '../../core/interfaces/ipost';
import { PostsService } from '../../core/services/posts.service';
import { UsersService } from '../../core/services/users.service';
import { CommentComponent } from "../../shared/ui/comment/comment.component";
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe, CommentComponent, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private readonly _PostsService = inject(PostsService);
  readonly _UsersService = inject(UsersService);
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
      next: () => {
        this.displayPosts();
      },
    });
  }
  displayPosts(): void {
    this._PostsService.getMyPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.postsList = res.posts;
      },
    });
  }
}
