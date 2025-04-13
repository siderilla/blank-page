//// SUPERBIGPROJECTBLANKPAGEUAO ////
- replicare nel weekend blank.page:
    editor di testo in una pagina web che quando chiudo e riapro (localstorage) trovo il testo che ho scritto prima
- menù / barra degli strumenti / toolbar / navbar quel che azz è:
    dark mode (sole icona)
    full-screen
    download in formato .txt
    salvataggio testo
- drawer a lato sx che permette di salvare più note
    lista di note salvate in ordine per ultimo aggiornamento
        con nome e data e orario di creazione
    se ci clicco sopra mi apre la nota vecchia nel texteditor
- area a lato dx
    lista delle note
    word counter
    char counter
!!!! focus feature: tutto deve sparire quando si scrive in texteditor !!!!

TIPS:
    . div editor con proprietà "contenteditable" - permette di scrivere
        permette richtext (bold, italic, regular, etc...)
    . funzionalità di richtext che si possono mettere tra la navbar e il texteditor x_x
    . salvataggio temporizzato ?
    . ogni volta che cmabia il testo scritto -- evento change al servizio (signal) e notifica il cambiamento

////////// compiti
open-meteo.com/en/docs
forecast varibili pioggia, vento, temp, etc
chiamata costruisce sotto c'è apiurl con tutti i valori
per ogni ora dice tutti i forecast selezionati sopra
sono tot array separati che vanno montati insieme
displayare ora per ora per i prossimi sette giorni i forecast selezionati sopra
con grafica decente


STRUTTURA:

src/
├── app/
│   ├── components/
│   │   ├── home/
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   │   └── home.component.scss
│   │   ├── details/
│   │   │   ├── details.component.ts
│   │   │   ├── details.component.html
│   │   │   └── details.component.scss
│   │   ├── page-content/
│   │   │   ├── page-content.component.ts
│   │   │   ├── page-content.component.html
│   │   │   └── page-content.component.scss
│   │   ├── drawer/                 # <== da completare
│   │   └── header/                 # <== da completare
│
│   ├── directives/
│   │   └── save-on-leave.directive.ts
│
│   ├── models/
│   │   └── note.ts                 # definizione interfaccia Note
│
│   ├── services/
│   │   └── notes.service.ts        # gestisce salvataggio/caricamento note da localStorage
│
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.component.scss
│
├── assets/
│   └── ...                         # eventuali icone (es. dark mode)
│
└── styles.scss                     # stile globale (dark mode ecc.)


--

page.component:
@Input() currentNote: string serve a ricevere il contenuto iniziale da fuori → perfetto.
@Output() sendUpdatedContent = new EventEmitter<string>() serve a mandare dati verso il genitore → centrato in pieno.
EventEmitter è una classe, non una funzione, ma la usi come se fosse una funzione col metodo .emit() → quindi il tuo uso è corretto.
L’Event è proprio un’interfaccia generica di evento DOM → corretto anche questo.
.emit() è il modo di “sparare” l’informazione fuori dal componente → sacrosanto.

--

TYPE ASSERTION:
dico a Typescript: “Ehi, so io che tipo ha questa variabile, anche se tu (TypeScript) non puoi capirlo da solo.”

	SINTASSI:
		value as Type     // il più usato
		<Type>value       // meno usato, può creare ambiguità con JSX/React

. Permette di accedere a metodi o proprietà che il tipo generico non vede
. Utile nei casi in cui il tipo è troppo generico (come event.target)

	ESEMPIO:
		Hai un evento DOM:
		||  const el = event.target;  ||

		Per TypeScript, event.target è un EventTarget.
		Ma EventTarget non ha .innerText — quindi TS si lamenta se provi a usarlo così.

		Tu però sai che in realtà quel target è un div, cioè un HTMLElement.
		Allora glielo dici:
		||  const el = event.target as HTMLElement;  ||

		Questa è una type assertion.



----------------------------------------------

Project Roadmap: Blank Page Clone

📦 FASE 1 – Editor base funzionante
OK - PageContentComponent con div contenteditable
OK - Emettere il contenuto aggiornato con @Output()
OK - HomeComponent riceve l’evento (sendUpdatedContent) e aggiorna un signal
OK - Il contenuto si ricarica al refresh (via localStorage e NotesService)
- Dark mode toggle (🌞/🌙)
- Fullscreen attivabile da bottone
- Download del testo in formato .txt

📂 FASE 2 – Drawer a sinistra per più note
- DrawerComponent (lista delle note)
- Struttura dati in localStorage per gestire più note
- Ogni nota ha: nome, contenuto, data di creazione, data ultima modifica
- Ordinare le note per last_edit decrescente
- Clic su una nota nel drawer carica quella nel PageContentComponent

🧾 FASE 3 – Pannello laterale (a destra)
- DetailsComponent con @Input() per word count e char count
- Word counter aggiornato in tempo reale
- Char counter aggiornato in tempo reale
- (opzionale) altri dati come data ultima modifica

🎯 FASE 4 – Esperienza utente migliorata
- Focus mode: nasconde UI quando si scrive (toolbar, drawer, details…)
- Timeout per ripristinare la UI dopo inattività (es. 3–5 sec)
- Autosalvataggio ogni 1s (già presente parzialmente)
- Effetto visivo di salvataggio riuscito (es. ✅ icona fade-in/out)

🧪 FASE 5 – Extra & miglioramenti futuri (facoltativi)
- Rich text editor: gestione bold, italic, underline con comandi JS
- Shortcut da tastiera per salvare (Ctrl+S)
- Modal per creare nuova nota con nome
- Conferma prima di eliminare una nota
- Importazione/esportazione note (es. JSON)