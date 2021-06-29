const addbutton = document.getElementById('add');
const updateLSData=()=>{
    const textareadata = document.querySelectorAll('textarea');
    const notes=[];
    textareadata.forEach((note)=>{
        return notes.push(note.value)
    })
    localStorage.setItem('notes',JSON.stringify(notes));
}
const  addnewnote=(text='')=>{

        const note = document.createElement('div');
        note.classList.add('note');
        const htmlData = `
        <div class="operation">
            <button class="delete btn"><i class="fas fa-trash-alt"></i></button>
            <button class="edit btn"><i class="fas fa-edit"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea> `;
        note.insertAdjacentHTML('afterbegin',htmlData);

        // getting the refrences
        const deletebutton = note.querySelector('.delete');
        const editbutton = note.querySelector('.edit');
        const maindiv = note.querySelector('.main');
        const textarea = note.querySelector('textarea');

        // deleting the node
        deletebutton.addEventListener('click',()=>{
            note.remove();
            updateLSData();
        })

        // toogle using edit button
        textarea.value = text;
        maindiv.innerHTML = text;
        editbutton.addEventListener('click',()=>{
            maindiv.classList.toggle('hidden');
            textarea.classList.toggle('hidden');
        })

        textarea.addEventListener('change',(event)=>{
            const value = event.target.value;
            maindiv.innerHTML= value;
            updateLSData();
        })

        document.body.appendChild(note);
}
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){notes.forEach((note)=> addnewnote(note))}
addbutton.addEventListener('click',()=> addnewnote());