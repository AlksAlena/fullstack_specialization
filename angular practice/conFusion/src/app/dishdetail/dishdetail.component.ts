import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { visibility, flyInOut, expand } from '../animations/app.animation';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  @ViewChild('cform') commentFormDirective;

  dish: Dish;
  dishCopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  commentForm: FormGroup;
  comment: Comment;
  errMess: string;
  previewComment: Comment = {
    author: '',
    rating: 5,
    comment: '',
    date: ''
  };
  formErrors = {
    'author': '',
    'comment': ''
  };
  validationMessages = {
    'author': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.'
    },
    'comment': {
      'required': 'Comment is required.'
    }
  };
  visibility = 'shown';
  
  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap((params: Params) => {
        this.visibility = 'hidden';
        return this.dishService.getDish(+params['id']);
      }))
      .subscribe(
        dish => { 
          this.dish = dish; 
          this.dishCopy = dish; 
          this.setPrevNext(dish.id); 
          this.visibility = 'shown';
        },
        errmess => { this.errMess = <any>errmess; this.dishCopy = null; }
       );
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required ],
      author: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25) ]],
      date: ''
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
     // re(set) from validation messages
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) return;
    const form = this.commentForm;
    for (let field in this.formErrors) {
      // clear previous message
      this.formErrors[field] = ''; 
      // console.log(field + ':')
      // console.log(form.get(field).errors);
      let control = form.get(field);
      if (control && control.dirty && !control.valid) {
        let messages = this.validationMessages[field];
        // console.log(messages);
        for (let error in control.errors) {
          this.formErrors[field] = '' + messages[error];
        }
      }
    }
    if (form.valid && data) {
      // data is exist
      for (let field in data) {
        this.previewComment[field] = data[field];
      }
    } else this.previewComment = {
      author: '',
      rating: 5,
      comment: '',
      date: ''
    }
  }

  onSubmit() {
    if (!this.commentForm.valid) return;
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishCopy.comments.push(this.comment);
    this.dishCopy.save()
      .subscribe(dish => this.dish = dish);
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: '',
      date: ''
    });
  }

}
