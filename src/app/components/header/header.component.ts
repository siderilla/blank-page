import { Component } from '@angular/core';

@Component({
	standalone: true,
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	isDarkMode = false;

	ngOnInit() {
		const savedTheme = localStorage.getItem('theme');
		this.isDarkMode = savedTheme === 'dark';
		this.applyTheme();
	}

	toggleTheme() {
		this.isDarkMode = !this.isDarkMode;
		const theme = this.isDarkMode ? 'dark' : 'light';
		localStorage.setItem('theme', theme);
		this.applyTheme();
	}

	applyTheme() {
		document.body.classList.toggle('dark-mode', this.isDarkMode);
	}
}
