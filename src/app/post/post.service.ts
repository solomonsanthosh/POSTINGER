import { Post } from "./post.model"
import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
import { PageEvent } from "@angular/material/paginator";

@Injectable({providedIn: "root"})

export class PostService {
    public postCount:number = 0;
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
    getPosts(page:any) {
        const query = `?page=${page}`
        this.http.get('http://localhost:3000/getposts'+query)
        .subscribe((allposts: any) => {
                this.posts = allposts;
                console.log(this.posts);
                this.postsUpdated.next([...this.posts])
            }
        )
    }
    updatePost(Id: number,title:string,content:string,image: any) {
        let postData;
        if(typeof(image) == 'object'){
            postData = new FormData()
            postData.append("title",title)
            postData.append("content",content)
            postData.append("image",image)
        }
        else {
           const postData = {
                id:Id,
                title:title,
                content:content,
                image:image
            }
        }
        this.http.put('http://localhost:3000/post/' + Id,postData)
        .subscribe(() => {
            
            this.postsUpdated.next([...this.posts])
            this.router.navigate(['/'])
        })
    }
    addPost(title: string, content: string,image:File) {
        const postData = new FormData()
        console.log('====================================');
        console.log('lol');
        console.log('====================================');
        postData.append("title",title)
        postData.append("content",content)
        postData.append("image",image,title)
        
        this.http.post('http://localhost:3000/addposts', postData)
        .subscribe((responseData) => {
            console.log('====================================');
            console.log(responseData,'koko');
            console.log('====================================');
            const post: Post = {id:responseData,title:title,content:content}
            this.posts.push(post)
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

