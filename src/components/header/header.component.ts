import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatFormFieldModule, MatToolbarModule, MatButtonModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() isOpenChange = new EventEmitter<boolean>();
  isOpen = false;
  isMobile = false;

  constructor(private observer: BreakpointObserver) {
    this.observer.observe([Breakpoints.Handset])
      .subscribe(result => this.isMobile = result.matches);
  }

  alternarMenu() {
    this.isOpen = !this.isOpen;
    this.isOpenChange.emit(this.isOpen);
  }

}
