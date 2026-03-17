import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderRight } from '../header-right/header-right';

@Component({
  selector: 'lib-header',
  imports: [HeaderRight, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header { }
