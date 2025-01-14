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

        let listBody = document.createElement('ol');

        let createTask = document.createElement('button');
        createTask.addEventListener('click', () => this.addTask(this.id));

        let input = document.createElement('input');
        
        document.querySelector('.listsContainer').append(list);
        list.append(name);
        list.append(listBody);
        list.append(input);
        list.append(createTask);
        createTask.textContent = 'Add task';
        name.textContent = this.name;
    }

    addTask(id){
        let task = document.createElement('li');
        let taskText = document.querySelector(`#${id}`).querySelector('input').value;
        document.querySelector(`#${id}`).querySelector('ol').append(task);
        task.textContent = taskText;
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
}

let count = 0
document.querySelector('.createList').addEventListener('click', () => {
    let list = new List(count);
    list.createList();
    count++;  
})

