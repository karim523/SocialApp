import { Component, inject, Input } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
import { Icomment } from '../../../core/interfaces/icomment';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  private readonly _CommentsService = inject(CommentsService);

  @Input({ required: true }) postId!: string;

  commentGroup!: FormGroup;

  commentslist: Icomment[] = [];

  ngOnInit(): void {
    this.commentGroup = new FormGroup({
      content: new FormControl(null),
      post: new FormControl(this.postId),
    });

    this._CommentsService.getPostComment(this.postId).subscribe({
      next: (res) => {
        console.log(`${this.postId}`, res);
        this.commentslist = res.comments.reverse();
      },
    });
  }

  sendComment(): void {
    this._CommentsService.creatComment(this.commentGroup.value).subscribe({
      next: (res) => {
        console.log(res);
        this.commentslist = res.comments.reverse();
        this.commentGroup.get('content')?.reset();

      },
    });
  }
}
