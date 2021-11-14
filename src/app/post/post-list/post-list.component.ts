import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostService } from "../post.service";
@Component({
    selector: 'post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit , OnDestroy{
    posts: Post[] = [];
    postSub: Subscription;
    constructor (public PostService: PostService) {
        
    }

  

    ngOnInit() {
        this.PostService.getPosts();
        this.postSub = this.PostService.postListener()
        .subscribe((posts: Post[]) => {
            this.posts = posts;
        });
    }
    ngOnDestroy() {
        this.postSub.unsubscribe();
    }

}