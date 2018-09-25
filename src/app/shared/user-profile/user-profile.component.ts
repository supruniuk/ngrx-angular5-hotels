import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { User } from '@app/core/models/user';

@Component({
  selector: 'hot-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {

  @Input() authData: User;

  constructor() { }
}
