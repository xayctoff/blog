import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '@shared/interfaces/post.interface';
import { FirebaseCreateResponse } from '@shared/interfaces/firebase-create-response.interface';

@Injectable({
	providedIn: 'root',
})
export class PostService {

	constructor(private _http: HttpClient) {
	}

	create(post: Post): Observable<Post> {
		return this._http.post(`${environment.firebaseDatabaseUrl}/posts.json`, post)
			.pipe(map((response: FirebaseCreateResponse) => {
					return {
						...post,
						id: response.name,
						date: new Date(post.date),
					};
				},
				),
			);
	}

	getAll() {
		return this._http.get(`${environment.firebaseDatabaseUrl}/posts.json`)
			.pipe(map((response: { [key: string]: any }) => {
					return Object
						.keys(response)
						.map((key: string) => ({
									...response[key],
									id: key,
									date: new Date(response[key].date),
								}
							),
						);
				},
				),
			);
	}

	getById(id: string): Observable<Post> {
		return this._http.get<Post>(`${environment.firebaseDatabaseUrl}/post/${id}.json`)
			.pipe(map((post: Post) => {
					return {
						...post,
						id,
						date: new Date(post.date),
					};
				},
				),
			);
	}

	remove(id: string): Observable<void> {
		return this._http.delete<void>(`${environment.firebaseDatabaseUrl}/posts/${id}.json`);
	}

	update(post: Post): Observable<Post> {
		return this._http.patch<Post>(`${environment.firebaseDatabaseUrl}/posts/${post.id}.json`, post);
	}
}
