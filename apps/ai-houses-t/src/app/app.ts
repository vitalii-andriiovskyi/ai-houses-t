import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Header, Footer } from '@fe/core';
import { Auth } from '@fe/auth';

@Component({
  imports: [RouterModule, Header, Footer, Auth],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'ai-houses-t';
}
