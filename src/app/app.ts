import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatDivider, MatToolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
