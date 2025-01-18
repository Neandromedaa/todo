class List{
    constructor(count){
        this.name = `New list ${count}`;
        this.id = 'id' + this.name.slice(9);
    }

    createList(){
        let list = document.createElement('div');
        list.classList.add('listContainer');
        list.setAttribute('id', this.id);
        let nameContainer = document.createElement('div');
        nameContainer.classList.add('nameContainer');
        let taskContainer = document.createElement('div');
        taskContainer.classList.add('taskContainer');
        
        let name = document.createElement('h1');
        name.addEventListener('click', () => this.changeListName(this.id));
        name.textContent = this.name;

        let listBody = document.createElement('ul');

        let createTask = document.createElement('button');
        createTask.addEventListener('click', () => this.addTask(this.id));
        createTask.textContent = 'Add task';

        let input = document.createElement('input');

        let deleteList = document.createElement('button');
        deleteList.addEventListener('click', () => this.deleteList(this.id));
        deleteList.textContent = 'Delete';

        list.addEventListener('dragstart', (e) => {
            e.target.classList.add('selected');
        });
        list.addEventListener('dragend', (e => {
            e.target.classList.remove('selected');
        }));
        list.addEventListener('dragover', (e) => {
            e.preventDefault();
            let selectedTask = document.querySelector('.selected');
            let currentElement = e.target;
            let isMovable = selectedTask !== currentElement && currentElement.classList.contains(`dragItem`);

            if(!isMovable) return;
            
            let nextElement = (currentElement === selectedTask?.nextElementSibling) ? currentElement.nextElementSibling : currentElement;
            e.target.closest('ul').insertBefore(selectedTask, nextElement);
        })

        document.querySelector('.listsContainer').append(list);
        list.append(nameContainer);
        list.append(taskContainer);
        nameContainer.append(name);
        nameContainer.append(deleteList);
        taskContainer.append(input);
        taskContainer.append(createTask);
        list.append(listBody);
    }

    addTask(id){
        let task = document.createElement('li');
        task.draggable = 'true';
        task.classList.add('dragItem');
        // let completeTask = document.createElement('input');
        // completeTask.type = 'checkbox';
        // task.append(completeTask);
        // task.insertAdjacentHTML('afterbegin', '<input type="checkbox"');
        let taskText = document.querySelector(`#${id}`).querySelector('.taskContainer input').value;
        document.querySelector(`#${id}`).querySelector('ul').append(task);
        
        task.textContent = taskText;
        task.addEventListener('dblclick', (e) => this.deleteTask(e));
        // completeTask.addEventListener('change', (e) => this.completeTask(e))
    }

    deleteTask(e){
        let li = e.target.closest('li');
        if(li) {
            // li.nextSibling.remove();
            li.remove();
        }
    }

    completeTask(e){
        let input = e.target.closest('input');
        if(input) input.previousSibling.classList.toggle('done');
    }

    changeListName(id){
        let input = document.createElement('input');
        let list = document.querySelector(`#${id}`);
        let confirm = document.createElement('button');
        confirm.textContent = 'Confirm';
        let oldName = list.querySelector('.nameContainer h1');
        let taskControls = list.querySelector('.taskContainer');
        taskControls.style.visibility = 'hidden';
        input.value = oldName.textContent;
        oldName.remove();
        list.prepend(confirm);
        confirm.addEventListener('click', () => this.confirmChange(input, confirm, list, oldName, taskControls));
        list.prepend(input);
    }   

    confirmChange(input, confirm, list, oldName, taskControls){
        let newName = input.value;
        input.remove();
        confirm.remove();
        list.querySelector('.nameContainer').prepend(oldName);
        oldName.textContent = newName;
        taskControls.style.visibility = 'visible';
    }

    deleteList(id){
        document.querySelector(`#${id}`).remove();  
    }


}

let list;
let count = 0;
document.querySelector('.createList').addEventListener('click', () => {
    let list = new List(count);
    list.createList();
    count++;  
});

