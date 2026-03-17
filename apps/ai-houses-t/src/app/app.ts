import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Header, Footer } from '@fe/core';

@Component({
  imports: [RouterModule, Header, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'ai-houses-t';
}
