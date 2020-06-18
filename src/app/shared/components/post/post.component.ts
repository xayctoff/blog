import { Component, Input, OnInit } from '@angular/core';
import { Post } from '@shared/interfaces/post.interface';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.sass'],
})
export class PostComponent implements OnInit {

	@Input() post: Post;

	constructor() {
	}

	ngOnInit(): void {
	}

}
