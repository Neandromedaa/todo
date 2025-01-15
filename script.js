class List{
    constructor(count){
        this.name = `New list ${count}`;
        this.id = 'id' + this.name.slice(9);
        this.tasks = [];
    }

    createList(){
        let list = document.createElement('div');
        list.setAttribute('id', this.id);

        let name = document.createElement('h1');
        name.addEventListener('click', () => this.changeListName(this.id));
        name.textContent = this.name;

        let listBody = document.createElement('ol');

        let createTask = document.createElement('button');
        createTask.addEventListener('click', () => this.addTask(this.id));
        createTask.textContent = 'Add task';

        let input = document.createElement('input');

        let deleteList = document.createElement('button');
        deleteList.addEventListener('click', () => this .deleteList(this.id));
        deleteList.textContent = 'Delete';

        document.querySelector('.listsContainer').append(list);
        list.append(name);
        list.append(deleteList);
        list.append(input);
        list.append(createTask);
        list.append(listBody);
    }

    addTask(id){
        let task = document.createElement('li');
        let completeTask = document.createElement('input');
        completeTask.type = 'checkbox';
        let taskText = document.querySelector(`#${id}`).querySelector('input').value;
        document.querySelector(`#${id}`).querySelector('ol').append(task);
        task.after(completeTask);
        task.textContent = taskText;
        task.addEventListener('dblclick', (e) => {
            let li = e.target.closest('li');
            if(li) {
                li.nextSibling.remove();
                li.remove();
            }
        });

        completeTask.addEventListener('change', (e) => {
            let input = e.target.closest('input');
            if(input) input.previousSibling.classList.toggle('done');
        })
    }

    changeListName(id){
        let input = document.createElement('input');
        let list = document.querySelector(`#${id}`);
        let confirm = document.createElement('button');
        confirm.textContent = 'Confirm';
        let oldName = list.querySelector('h1');
        input.value = oldName.textContent;
        oldName.remove();
        list.prepend(confirm);
        confirm.addEventListener('click', () => {
            let newName = input.value;
            input.remove();
            confirm.remove();
            list.prepend(oldName);
            oldName.textContent = newName;
        })
        list.prepend(input);
    }

    deleteList(id){
        document.querySelector(`#${id}`).remove();  
    }    
}

let list;
let count = 0
document.querySelector('.createList').addEventListener('click', () => {
    let list = new List(count);
    list.createList();
    count++;  
})

