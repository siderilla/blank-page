import { Injectable, signal, WritableSignal } from '@angular/core';
import { type Note } from '../models/note';

@Injectable({
	providedIn: 'root'
})
export class NotesService {

	private readonly STORAGE_KEY = 'notes';

	note: WritableSignal<Note>; //Signal tipo - lo conservo qui e gli assegno interfaccia writable

	constructor() {

		this.note = signal(this.loadNotes()); //signal funzione

	}

	saveNote(): void {
		const currentNote = this.note();
		currentNote.last_edit = Date.now();
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentNote));
	}


	loadNotes(): Note { //restituisco il dato Note che lo prende da localstorage o lo crea nuovo
		const savedNote = localStorage.getItem(this.STORAGE_KEY);
		if (!savedNote) {
			return this.generateDefaultNote();
		} else {
			return JSON.parse(savedNote);
		}
	}

	generateDefaultNote(): Note {
		const defaultNote: Note = {
			content: 'sample content',
			creation_date: Date.now(),
			last_edit: Date.now(),
		}
		return defaultNote;
	}

}
