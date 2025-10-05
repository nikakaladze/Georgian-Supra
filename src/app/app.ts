import { DatePipe } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule, RouterOutlet } from '@angular/router';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DatePipe,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public currentTime = toSignal(interval(1000).pipe(map(() => new Date())));
  public title: WritableSignal<string> = signal("Gerogian Supra");
  }
