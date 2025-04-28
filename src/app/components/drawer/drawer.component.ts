import { Component, inject, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { type Note } from '../../models/note';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
	standalone: true,
	selector: 'app-drawer',
	templateUrl: './drawer.component.html',
	styleUrls: ['./drawer.component.scss'],
	imports: [MatListModule, CommonModule, MatIcon]
})
export class DrawerComponent {

	service = inject(NotesService);
	selectedNoteId: string | null = null;


	@Output() noteSelected = new EventEmitter<Note>();


	selectNote(note: Note) {
		this.selectedNoteId = note.id;
		this.noteSelected.emit(note);
	}

	editNoteTitle(note: Note, event: Event) {
		event.stopPropagation(); // impedisce di selezionare la nota mentre editi

		const newTitle = prompt('Rename note:', note.title);
		if (newTitle !== null && newTitle.trim() !== '') {
			note.title = newTitle.trim();
			this.service.addOrUpdateNote(note); // aggiorna il service
			this.service.saveNotes(); // salva tutto
		}
	}

	deleteNote(note: Note, event: Event) {
		event.stopPropagation(); // impedisce di selezionare la nota mentre elimini

		const confirmed = confirm('Eliminare la nota?');
		if (confirmed) {
			const updatedNotes = this.service.notes().filter(n => n.id !== note.id);
			this.service.notes.set(updatedNotes);
			this.service.saveNotes();

			// se stavi modificando questa nota, puoi resettare selectedNoteId
			if (this.selectedNoteId === note.id) {
				this.selectedNoteId = null;
				// anche emettere un "nota vuota" per svuotare l'editor
			}
		}
	}


}
