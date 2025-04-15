import { Injectable, signal, WritableSignal } from '@angular/core';
import { type Note } from '../models/note';

@Injectable({
	providedIn: 'root'
})
export class NotesService {

	private readonly STORAGE_KEY = 'notes';

	note: WritableSignal<Note>; //Signal tipo - lo conservo qui e gli assegno interfaccia writable
	notes: Note[] = [];

	constructor() {

		this.note = signal(this.loadNotes()); //signal funzione
		this.notes = [];
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

	addOrUpdateNote(): void {
		const currentNote = this.note();
		let found = false;

		for (let i = 0; i < this.notes.length; i++) {
			const note = this.notes[i];
			if (note.id === currentNote.id) {
				this.notes[i] = currentNote;
				found = true;
				break; // esco dal ciclo, ho trovato quello che cercavo
			}
		}
		if (!found) {
			this.notes.push(currentNote);
		}
		this.saveAllNotes(); // salva tutto l’array aggiornato
	}


	saveAllNotes(): void {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.notes));
	}


	loadAllNotes(): Note[] {
		const savedNotes = localStorage.getItem(this.STORAGE_KEY);
		if (!savedNotes) {
			return [];
		} else {
			return JSON.parse(savedNotes);
		}
	}

	generateDefaultNote(): Note {
		const defaultNote: Note = {
			id: 'note-' + Date.now(),
			title: 'New note',
			content: 'Start writing...',
			creation_date: Date.now(),
			last_edit: Date.now(),
		}
		return defaultNote;
	}
}
