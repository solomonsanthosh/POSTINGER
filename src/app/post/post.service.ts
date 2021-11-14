import { Post } from "./post.model"
import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Subject } from 'rxjs';

@Injectable({providedIn: "root"})

export class PostService {
    
    constructor(private http: HttpClient) { }
    private posts: Post[] = []
    private postsUpdated = new Subject<Post[]>();

    postListener() {
        return this.postsUpdated.asObservable()
    }
    getPosts() {
        this.http.get('http://localhost:3000/getposts')
        .subscribe((allposts: any) => {
                this.posts = allposts;
                console.log(allposts);
                
                this.postsUpdated.next([...this.posts])
            }
        )
    }

    addPost(title: string, content: string) {
        const post: Post = {
            
            title: title,
            content: content
        }
        this.posts.push(post)
        this.http.post('http://localhost:3000/addposts', post)
        .subscribe((responseData) => {
            this.postsUpdated.next([...this.posts])

        })

    }



}