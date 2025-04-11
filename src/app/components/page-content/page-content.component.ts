import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'div[page-content]', //tag html con nome
  imports: [ReactiveFormsModule],
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss'
})
export class PageContentComponent {

  currentNote = input.required({ alias: 'note-content' });
  sendUpdatedContent = output<string>();
  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      noteContent: new FormControl(this.currentNote())
    })

  }

  constructor() {

    setInterval(() => {
      const newValue = this.form.value.noteContent;
      this.sendUpdatedContent.emit(newValue);
    }, 1000)
  }

}
