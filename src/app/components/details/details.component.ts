import { Component, input } from '@angular/core';

@Component({
	selector: 'app-details',
	imports: [],
	templateUrl: './details.component.html',
	styleUrl: './details.component.scss'
})
export class DetailsComponent {

	// totalNotes(): number {
	// 	return this.notesService.notes().length;
	// }
	

	totalWords = input.required<number>({ alias: 'words-total' })

	totalChars = input.required<number>({ alias: 'chars-total' })

	totalNotes = input.required<number>({ alias: 'notes-total' });



}
