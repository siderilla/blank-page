import { Component, computed, inject, signal } from '@angular/core';
import { PageContentComponent } from '../page-content/page-content.component';
import { NotesService } from '../../services/notes.service';
import { SaveOnLeaveDirective } from '../../directives/save-on-leave.directive';
import { DetailsComponent } from '../details/details.component';
import { HeaderComponent } from '../header/header.component';

@Component({
	standalone: true,
	selector: 'app-home',
	imports: [PageContentComponent, SaveOnLeaveDirective, DetailsComponent, HeaderComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})

export class HomeComponent {

	service = inject(NotesService);
	noteContent = signal<string>(this.service.note().content)

	totalWords = computed(() => this.noteContent().match(/\w+/g)?.length ?? 0);

	totalChars = computed(() => this.noteContent().trim().length);

	updatedNote(updatedContent: string) {
		this.noteContent.set(updatedContent);

		this.service.note.update((note) => {
			note.content = updatedContent;
			return note;
		});
		this.service.saveNote();
	}

	createNewNote() {
		const newNote = this.service.generateDefaultNote();
		this.service.note.set(newNote);
		this.noteContent.set(newNote.content); // assicura che venga visualizzato subito
		this.service.addOrUpdateNote();
	}

}
