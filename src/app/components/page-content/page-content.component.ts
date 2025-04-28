import { Component, AfterViewInit, ElementRef, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	standalone: true,
	selector: 'app-page-content',
	templateUrl: './page-content.component.html',
	styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements AfterViewInit, OnChanges {
	@Input() currentNote: string = '';
	@Output() sendUpdatedContent = new EventEmitter<string>();

	@ViewChild('editorRef') editor!: ElementRef<HTMLDivElement>;

	ngAfterViewInit() {
		if (this.editor) {
			this.editor.nativeElement.innerText = this.currentNote;
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['currentNote'] && !changes['currentNote'].firstChange && this.editor) {
			const el = this.editor.nativeElement;
			el.innerText = changes['currentNote'].currentValue;
			
			// PRO: Sposta il cursore alla fine
			const range = document.createRange();
			const sel = window.getSelection();

			range.selectNodeContents(el);
			range.collapse(false); // false = cursore alla fine

			sel?.removeAllRanges();
			sel?.addRange(range);
		}
	}

	onContentChange(event: Event) {
		const newText = (event.target as HTMLElement).innerText;
		this.sendUpdatedContent.emit(newText);
	}
}


// NOTE:
// @Input() currentNote: string serve a ricevere il contenuto iniziale da fuori → perfetto.
// @Output() sendUpdatedContent = new EventEmitter<string>() serve a mandare dati verso il genitore → centrato in pieno.
// EventEmitter è una classe, non una funzione, ma la usi come se fosse una funzione col metodo .emit() → quindi il tuo uso è corretto.
// L’Event è proprio un’interfaccia generica di evento DOM → corretto anche questo.
// .emit() è il modo di “sparare” l’informazione fuori dal componente → sacrosanto.