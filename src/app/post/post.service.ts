import { Post } from "./post.model"
import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Subject } from 'rxjs';
import { Router } from "@angular/router";

@Injectable({providedIn: "root"})

export class PostService {
    
    constructor(private http: HttpClient, private router:Router) { }
    private posts: Post[] = []
    private postsUpdated = new Subject<Post[]>();

    postListener() {
        return this.postsUpdated.asObservable()
    }
    getPost(id: any){

        //    this.posts.filter(p => p.id == id);
         console.log('====================================');
         console.log({...this.posts.find(p => p.id == id)});
         console.log('====================================');
          return {...this.posts.filter(p => p.id == id)};

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
    updatePost(Id: number,title:string,content:string) {
        const post: any = {
            id:Id,
            title: title,
            content: content

        }
        this.http.put('http://localhost:3000/post/' + Id,post)
        .subscribe(() => {
            
            this.postsUpdated.next([...this.posts])
            this.router.navigate(['/'])
        })
    }
    addPost(title: string, content: string) {
        var post: any = {
            
            title: title,
            content: content
        }
        this.posts.push(post)
        this.http.post('http://localhost:3000/addposts', post)
        .subscribe((responseData) => {
            post.id = responseData;
            this.postsUpdated.next([...this.posts])
            this.router.navigate(['/'])

        })

    }

    deletePost(postId: number) {
        this.http.delete('http://localhost:3000/post/' + postId)
        .subscribe(() => {
            this.posts = this.posts.filter(post => post.id !== postId)
            this.postsUpdated.next([...this.posts])
        })
    }

    



}

