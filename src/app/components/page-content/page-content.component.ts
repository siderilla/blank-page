import { Component, AfterViewInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
	standalone: true,
	selector: 'app-page-content',
	templateUrl: './page-content.component.html',
	styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements AfterViewInit {
	@Input() currentNote: string = '';
	@Output() sendUpdatedContent = new EventEmitter<string>();

	@ViewChild('editorRef') editor!: ElementRef<HTMLDivElement>;

	ngAfterViewInit() {
		if (this.editor) {
			this.editor.nativeElement.innerText = this.currentNote;
		}
	}

	onContentChange(event: Event) {
		const newText = (event.target as HTMLElement).innerText;
		console.log('[EMIT]', newText);
		this.sendUpdatedContent.emit(newText);
	}
}

// NOTE:
// @Input() currentNote: string serve a ricevere il contenuto iniziale da fuori → perfetto.
// @Output() sendUpdatedContent = new EventEmitter<string>() serve a mandare dati verso il genitore → centrato in pieno.
// EventEmitter è una classe, non una funzione, ma la usi come se fosse una funzione col metodo .emit() → quindi il tuo uso è corretto.
// L’Event è proprio un’interfaccia generica di evento DOM → corretto anche questo.
// .emit() è il modo di “sparare” l’informazione fuori dal componente → sacrosanto.