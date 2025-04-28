import { Component, computed, inject, signal } from '@angular/core';
import { PageContentComponent } from '../page-content/page-content.component';
import { NotesService } from '../../services/notes.service';
import { SaveOnLeaveDirective } from '../../directives/save-on-leave.directive';
import { DetailsComponent } from '../details/details.component';
import { HeaderComponent } from '../header/header.component';
import { type Note } from '../../models/note'; // <-- IMPORTANTE!
import { DrawerComponent } from '../drawer/drawer.component';

@Component({
	standalone: true,
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	imports: [
		PageContentComponent,
		SaveOnLeaveDirective,
		DetailsComponent,
		HeaderComponent,
		DrawerComponent]
})
export class HomeComponent {

	service = inject(NotesService);

	// Ora gestiamo una nota selezionata separatamente!
	selectedNote = signal<Note>(this.service.generateDefaultNote());

	noteContent = computed(() => this.selectedNote().content);

	totalWords = computed(() => this.noteContent().match(/\w+/g)?.length ?? 0);

	totalChars = computed(() => this.noteContent().trim().length);

	updatedNote(updatedContent: string) {
		const updated = {
			...this.selectedNote(),
			content: updatedContent,
			last_edit: Date.now(),
		};
		this.selectedNote.set(updated); // aggiorno localmente
		this.service.addOrUpdateNote(updated); // aggiorno nell'array del service
		this.service.saveNotes(); // salvo tutto
		this.service.selectedNote.set(updated);  //notaselezionata per salvataggio
	}

	createNewNote() {
		const newNote = this.service.generateDefaultNote();
		this.selectedNote.set(newNote);
		this.service.addOrUpdateNote(newNote);
		this.service.saveNotes();
		this.service.selectedNote.set(newNote); //notaselezionata per salvataggio
	}

	onNoteSelected(note: Note) {
		this.selectedNote.set(note);
	}


}
