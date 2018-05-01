import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReadMoreComponent } from './read-more/read-more.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { StarRatingFormComponent } from './star-rating-form/star-rating-form.component';
import { MaterialModule } from '../material';
import { NavItemComponent } from './nav-item';
import { ToolbarComponent } from './toolbar';
import { SecondaryToolbarComponent } from './secondary-toolbar';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    UserProfileComponent,
    ReadMoreComponent,
    StarRatingComponent,
    StarRatingFormComponent,
    NavItemComponent,
    ToolbarComponent,
    SecondaryToolbarComponent
  ],
  exports: [
    UserProfileComponent,
    ReadMoreComponent,
    StarRatingComponent,
    StarRatingFormComponent,
    NavItemComponent,
    ToolbarComponent,
    SecondaryToolbarComponent
  ]
})
export class SharedModule { }
