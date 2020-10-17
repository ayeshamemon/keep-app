class App{

     constructor(){

        
        //initialization
        this.notes = []; 
        this.title = '';
        this.text = '';
        this.id = '';

        //selecting elements from dom
        this.$form = document.querySelector('#form');

        this.$modal = document.querySelector('.modal');

        this.$modalTitle = document.querySelector('.modal-title');

        this.$modalText = document.querySelector('.modal-text');

        this.$modalCloseButton = document.querySelector('.modal-close-button')

        //modal 2 for duplicte notes with validation
        this.$modal1 = document.querySelector('.modal1');

        this.$modal1Title = document.querySelector('.modal1-title');

        this.$modal1Text = document.querySelector('.modal1-text');

        this.$modal1CloseButton = document.querySelector('.modal1-close-button');


        //note data
        this.$noteTitle = document.querySelector('#note-title');

        this.$noteText = document.querySelector('#note-text');

        this.$placeholder = document.querySelector('#placeholder');

        this.$notes = document.querySelector('#notes');

        //form-buttons
        this.$formButtons = document.querySelector('#form-buttons');

        this.$closeButton = document.querySelector('#form-close-button');

        //colors
        this.$colorTooltip = document.querySelector('#color-tooltip');


        //this is button to add more duplicate notes
        this.$moreNote = document.querySelector('#more-button');



        this.addEventListners();
     }

    
     addEventListners()
    {

        //add events to the whole body
         document.body.addEventListener("click",(event) =>{
            this.handleFormClick(event);
            this.selectNote(event);
            this.openModal(event);
            this.deleteNote(event);
         });

         //mouseover on tooltips- to display colors and delete option
         document.body.addEventListener("mouseover", (event) => {
            this.openToolTip(event);
         });

         //mouse-out on tooltip - colors and delete will not be displayed
         document.body.addEventListener("mouseout", (event) => {
            this.closeToolTip(event);
         });

         //mouse over on color tool tip - to display colors
         this.$colorTooltip.addEventListener('mouseover', function() {
            this.style.display = 'flex';  
            
          })

          //click on color tool tip - to give colors to notes
          this.$colorTooltip.addEventListener('click', event => {
            const color = event.target.dataset.color; 
            if (color) {
              this.editNoteColor(color);  
            }
         })
          //mouse-out on color tooltip - colors wont be displayed
          this.$colorTooltip.addEventListener('mouseout', function() {
             this.style.display = 'none'; 
          });


            //submit to add a new note - if title or text is there then only the note will be added
         this.$form.addEventListener("submit",(event) => {

            event.preventDefault();
            const title = this.$noteTitle.value;
            const text = this.$noteText.value;

            const hasNote = title || text;

            if(hasNote){
                this.addNote({title,text});
            }


         });
         //click event on add-more button - EXTRA TASK 
         this.$moreNote.addEventListener("click" ,(event) => {
            event.preventDefault();
            console.log("clicked");
            const title = this.$noteTitle.value;
            const text = this.$noteText.value;
            const hasNote = title || text;
            if(hasNote){
            this.openModalMore(title,text);
            }
         })


         //close button will close the form
         this.$closeButton.addEventListener("click",(event) => {
                event.stopPropagation();
                this.closeForm();
         })

         //close will close the modal opened
         this.$modalCloseButton.addEventListener('click' ,(event) => {
            this.closeModal(event);
         })

         //modal for duplicate notes
         this.$modal1CloseButton.addEventListener('click' ,(event) => {
             console.log(this.$modal1Title.value);
            this.closeModal1(event);
        })
    }

    //event on the form
    handleFormClick(event){

        const isFormClicked = this.$form.contains(event.target);
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;
        const hasNote = title || text;

        if(isFormClicked){
            //open form
           this.openForm();
        }

        else if(hasNote){
            this.addNote({title,text});
        }

        else{
            //close form
            this.closeForm();
        }

    }

    //open the form that means display the title and text fields
    openForm() {
        this.$form.classList.add("form-open");
        this.$noteTitle.style.display = "block";
        this.$formButtons.style.display = "block";
    }

    //closing the form that means title wont be visible
    closeForm(){

        console.log("done");
        this.$form.classList.remove("form-open");
        this.$noteTitle.style.display = "none";
        this.$formButtons.style.display = "none";
        this.$noteTitle.value = "";
        this.$noteText.value = "";
    }

    //select the note for editing
    selectNote(event){
        const $selectedNote = event.target.closest('.note');
        if (!$selectedNote) return;
        const [$noteTitle, $noteText] = $selectedNote.children;
        this.title = $noteTitle.innerText;
        this.text = $noteText.innerText;
        this.id = $selectedNote.dataset.id;
    }
     
    //open the editing modal
    openModal(event) {
        if(event.target.matches('.toolbar-delete')) return;
        if (event.target.closest('.note')) {
            this.$modal.classList.toggle('open-modal');  
            this.$modalTitle.value = this.title;
            this.$modalText.value = this.text;
        }
    }

    //modal for duplicate notes
    openModalMore(title,text) {
        console.log("open-modal");
        this.$modal1.classList.toggle('open-modal1');  
        this.$modal1Title.value = title;
        console.log("title is:",this.$modal1Title.value);
        this.$modal1Text.value = text;
        console.log("text is:" , this.$modal1Text.value)
       
    }

    //close the modal of editing
    closeModal(event){
        this.editNote();
        this.$modal.classList.toggle('open-modal');  
    }

    //close the duplicate notes modal - extra task
    closeModal1(event){
        console.log("close modal-more");
        console.log("on closed",this.$modal1Title.value);
        console.log("on closed",this.$modal1Text.value);
        const title = this.$modal1Title.value;
        const text = this.$modal1Text.value;
       
        if( this.$modal1Title.value && this.$modal1Text.value){
            this.$modal1.classList.toggle('open-modal1');  
            this.addNote({title,text});
        }
        else{
            !this.$modal1Text.value ? alert("please enter text") :  alert("please enter title");
        }
    }

    //open color tool tip
    openToolTip(event){
        if (!event.target.matches('.toolbar-color')) return;
        this.id = event.target.dataset.id; 
        const noteCoords = event.target.getBoundingClientRect();
        const horizontal = noteCoords.left;
        const vertical = window.scrollY - 20;
        this.$colorTooltip.style.transform = `translate(${horizontal}px, ${vertical}px)`;
        this.$colorTooltip.style.display = 'flex';
    }

    //close color tooltip
    closeToolTip(event){
        if (!event.target.matches('.toolbar-color')) return;
        this.$colorTooltip.style.display = "none";
    }

    //add a note to the array
    addNote(note){
        console.log("in addnote");
        const newNote = {
            title: note.title,
            text: note.text,
            color: "white",
            id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1
        };
        this.notes = [...this.notes,newNote];
        console.log(this.notes);
        this.displayNotes();
        this.closeForm();
    }

    
    //edit the note
    editNote(){
        const title = this.$modalTitle.value;
        const text = this.$modalText.value;
        this.notes = this.notes.map(note => 
        note.id === Number(this.id) ? { ...note, title, text } : note
        );
        this.displayNotes();
    }

    //delete a note by taking id of note
    deleteNote(event){
        event.stopPropagation();
        if(!event.target.matches('.toolbar-delete')) return;
        const id = event.target.dataset.id;
        console.log("delete",id)
        this.notes = this.notes.filter(note => note.id !== Number(id));
        console.log("after deletion",this.notes);
        alert("Note deleted");
        this.displayNotes();
      

    }

    //to add colors to note
    editNoteColor(color){
        this.notes = this.notes.map(note => 
            note.id === Number(this.id) ? { ...note, color } : note
          );
          this.displayNotes();
    }

    //display notes in this.notes array
    displayNotes(){

        const hasNotes = this.notes.length > 0;

        this.$placeholder.style.display = hasNotes ? "none" : "flex"; 

        console.log("Reached");

        //created html elements for adding notes and then appended it to notes class from html file
        this.$notes.innerHTML = this.notes.map(note => `
        <div style="background: ${note.color};" class="note" data-id= "${note.id}">
          <div class="${note.title && 'note-title'}">${note.title}</div>
          <div class="note-text">${note.text}</div>
          <div class="toolbar-container">
            <div class="toolbar">
              <img class="toolbar-color" data-id=${note.id} src="https://icon.now.sh/palette">
              <img class="toolbar-delete" data-id=${note.id} src="https://icon.now.sh/delete">
            </div>
          </div>
        </div>
     `).join("");
    }
}

new App;