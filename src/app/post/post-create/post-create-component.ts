
import {Component} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {PostService} from '../post.service';
import { Post } from '../post.model';
@Component(
    {
        selector: 'post-create',
        templateUrl: './post-create.component.html',
        styleUrls: ['./post-create.component.css']
    }
)
export class PostCreateComponent {
    mode = 'create';
    constructor(public postService: PostService , private route: ActivatedRoute) {
        
        
    }
    public post: any = [];
    private postId: any;
    form!: FormGroup;
    imagePrev! : any;
    ngOnInit() {

        this.form = new FormGroup(
            {
                title: new FormControl(null,{validators: [Validators.required]}),
                content: new FormControl(null,{validators: [Validators.required]}),
                image: new FormControl(null,{validators: [Validators.required]})
            }
        )
        this.route.paramMap.subscribe((paramMap) => {
            if (paramMap.has('postId'))
            {   
                this.postId = paramMap.get('postId')
                this.mode = 'edit'
                this.post = this.postService.getPost(this.postId)
                this.post = this.post[0]
                console.log('====================================');
                console.log(this.post);
                console.log('====================================');
                this.form.setValue({
                    title: this.post.title,
                    content: this.post.content,
                    image:this.post.image
                })
               
            }
            else {
                this.mode = 'create'
            }

            })
        
    }


    onImagePicked(event:Event){

            const file = (event.target as HTMLInputElement).files[0];
            console.log('====================================');
            console.log(file);
            console.log('====================================');
            this.form.patchValue({image:file})
            this.form.get('image').updateValueAndValidity();

            const reader = new FileReader();
            reader.onload = () => {
                this.imagePrev = reader.result

            }
            console.log('====================================');
            console.log(file);
            console.log('====================================');
            reader.readAsDataURL(file)
            console.log('====================================');
            console.log(reader.readAsDataURL(file));
            console.log('====================================');
    


        
    }
    
    
    onSavePost() {
        console.log('====================================');
        console.log('hry thre');
        console.log('====================================');
        if(this.form.invalid) {
            return;
        }
        if(this.mode == 'create')
         {
             this.postService.addPost(this.form.value.title, this.form.value.content,this.form.value.image);
             console.log('====================================');
             console.log('create',this.mode);
             console.log('====================================');


         }
        else 
        {             
            console.log('====================================');
            console.log('edit',this.mode);
            console.log('====================================');
            this.postService.updatePost(this.post.id,this.form.value.title, this.form.value.content,this.form.value.image);

        }
        this.form.reset()
    }


}