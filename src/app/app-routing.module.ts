import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
	{
		path: '', component: MainLayoutComponent, children: [
			{
				path: '', redirectTo: '/', pathMatch: 'full',
			},
			{
				path: '', component: HomeComponent,
			},
			{
				path: 'post/:id', component: PostComponent,
			},
		],
	},
	{
		path: 'admin', loadChildren: './admin/admin.module#AdminModule',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
		preloadingStrategy: PreloadAllModules,
	})],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
