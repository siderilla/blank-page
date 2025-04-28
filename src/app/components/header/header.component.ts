import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotesService } from '../../services/notes.service';
import { type Note } from '../../models/note';

@Component({
	standalone: true,
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	imports: [
		MatToolbarModule,
		MatButtonModule,
		MatIconModule]
})
export class HeaderComponent {

	notesService = inject(NotesService);

	isDarkMode = false;

	@Output() newNoteRequested = new EventEmitter<void>();

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

	requestNewNote() {
		this.newNoteRequested.emit();
	}

	downloadCurrentNote() {
		const note = this.notesService.selectedNote();
		if (!note) {
			console.error('No note selected!');
			return; // fermati se non c'è una nota selezionata
		}

		const content = `Title: ${note.title}\n\n${note.content}`;
		const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = `${note.title || 'note'}.txt`;
		a.click();

		URL.revokeObjectURL(url);
	}

}