import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../services/theme.service';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatIconModule, MatIconButton],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {
isDarkMode: boolean;

constructor(private themeService: ThemeService){
  this.isDarkMode = this.themeService.isDarkMode()
}

toggleTheme(){
  this.isDarkMode = !this.isDarkMode;
  this.themeService.setDarkMode(this.isDarkMode);
}
}
