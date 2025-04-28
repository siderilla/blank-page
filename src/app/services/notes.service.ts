import { Injectable, signal, WritableSignal } from '@angular/core';
import { type Note } from '../models/note';

@Injectable({
	providedIn: 'root'
})
export class NotesService {

	private readonly STORAGE_KEY = 'notes';

	notes: WritableSignal<Note[]>; // Array di note gestito come Signal
	selectedNote = signal<Note | null>(null);

	constructor() {
		this.notes = signal(this.loadAllNotes());
	}

	saveNotes(): void {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.notes()));
	}

	loadAllNotes(): Note[] {
		const savedNotes = localStorage.getItem(this.STORAGE_KEY);
		return savedNotes ? JSON.parse(savedNotes) : [];
	}

	addOrUpdateNote(note: Note): void {
		const notes = this.notes();
		const index = notes.findIndex(n => n.id === note.id);

		if (index !== -1) {
			notes[index] = note; // aggiornamento
		} else {
			notes.push(note); // aggiunta
		}

		this.notes.set([...notes]); // aggiorno il Signal
		this.saveNotes();
	}

	generateDefaultNote(): Note {
		const timestamp = Date.now();
		return {
			id: `note-${timestamp}`,
			title: 'New note',
			content: 'Start writing...',
			creation_date: timestamp,
			last_edit: timestamp,
		};
	}

	selectNote(note: Note): void {
		this.selectedNote.set(note);
	}
}
