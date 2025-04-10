import { Component, inject } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { type Note } from '../../models/note';

@Component({
  selector: 'div[page-content]', //tag html con nome
  imports: [],
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss'
})
export class PageContentComponent {

  currentNote: Note;

  service = inject(NotesService);

  constructor() {
    this.currentNote = this.service.note;

    setInterval(() => {
      console.log('sto salvando');
      this.updateCurrentContent();
    }, 2000)
  }

  updateCurrentContent() {
    const paragraph = document.getElementById('userInput');
    this.currentNote.content = paragraph?.textContent ?? this.currentNote.content;
    this.service.saveNote(this.currentNote);
  }

}
