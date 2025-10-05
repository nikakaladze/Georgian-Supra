import { DatePipe } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public currentTime = toSignal(interval(1000).pipe(map(() => new Date())));
  public title: WritableSignal<string> = signal("Gerogian Supra");
  }
