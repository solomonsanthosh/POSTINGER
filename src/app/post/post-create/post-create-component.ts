
import {Component, EventEmitter, Output} from '@angular/core'
import { NgForm } from '@angular/forms';

import {PostService} from '../post.service'
@Component(
    {
        selector: 'post-create',
        templateUrl: './post-create.component.html',
        styleUrls: ['./post-create.component.css']
    }
)
export class PostCreateComponent {
    
    constructor(public postService: PostService) {




    }
    
    
    onSavePost(form: NgForm) {
        
        if(form.invalid) {
            return;
        }
        this.postService.addPost(form.value.title, form.value.content);
        form.resetForm();
    }


}