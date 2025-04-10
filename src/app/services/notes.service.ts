import { Injectable } from '@angular/core';
import { type Note } from '../models/note';
import { generate } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private readonly STORAGE_KEY = 'notes';

  note: Note;

  constructor() {

    this.note = this.loadNotes();

  }
    
    saveNote(oldNote: Note): void {
      oldNote.last_edit = Date.now();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(oldNote));
    }

    loadNotes(): Note {
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
