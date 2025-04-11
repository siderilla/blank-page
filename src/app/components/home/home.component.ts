import { Component, computed, inject, signal } from '@angular/core';
import { PageContentComponent } from '../page-content/page-content.component';
import { NotesService } from '../../services/notes.service';
import { SaveOnLeaveDirective } from '../../directives/save-on-leave.directive';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-home',
  imports: [PageContentComponent, SaveOnLeaveDirective, DetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

   service = inject(NotesService);
   noteContent = signal<string>(this.service.note().content)

   totalWords = computed(() => this.noteContent().match(/\w+/g)?.length ?? 0);

   totalChars = computed(() => this.noteContent().length);

   updatedNote(updatedContent: string) {
    this.noteContent.set(updatedContent);
   }
}
