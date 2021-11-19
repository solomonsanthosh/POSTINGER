import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostService } from "../post.service";
@Component({
    selector: 'post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit , OnDestroy{
    totalPosts = 10;
    currentPage = 1;
    posts: Post[] = [];
    postSub: Subscription;
    constructor (public PostService: PostService) {
        
    }
    onDelete(postId: any) {
        this.PostService.deletePost(postId);
    }
    

  

    ngOnInit() {
        this.PostService.getPosts(1);
        this.postSub = this.PostService.postListener()
        .subscribe((posts: Post[]) => {
            this.posts = posts;
            console.log('====================================');
            console.log(posts);
            console.log('====================================');
        });
    }
    onPageChange(pageData:PageEvent){
        console.log('====================================');
        console.log('====================================');
        this.currentPage = pageData.pageIndex+1;
        console.log(this.currentPage,"cp");
        this.PostService.getPosts(this.currentPage);
    }
    ngOnDestroy() {
        this.postSub.unsubscribe();
    }

}