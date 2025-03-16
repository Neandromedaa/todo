class List{
    constructor(count){
        this.name = `New list ${count}`;
        this.id = 'id' + this.name.slice(9);
    }

    createList(){
        let listBase = this.createListBase();
        let [nameContainer, taskContainer] = this.createContainers();
        let name = this.createName();
        let listBody = document.createElement('ul');
        let task = this.createTask();
        let input = document.createElement('input');
        let deleteListButton = this.createDeleteListButton();
        this.addEventListeners(listBase);
        

        document.querySelector('.listsContainer').append(listBase);
        listBase.append(nameContainer);
        listBase.append(taskContainer);
        nameContainer.append(name);
        nameContainer.append(deleteListButton);
        taskContainer.append(input);
        taskContainer.append(task);
        listBase.append(listBody);
    }

    createListBase(){
        let listBase = document.createElement('div');
        listBase.classList.add('listContainer');
        listBase.setAttribute('id', this.id);
        return listBase;
    }

    createContainers(){
        let nameContainer = document.createElement('div');
        nameContainer.classList.add('nameContainer');
        let taskContainer = document.createElement('div');
        taskContainer.classList.add('taskContainer');
        return [nameContainer, taskContainer];
    }

    createName(){
        let name = document.createElement('h1');
        name.addEventListener('click', () => this.changeListName(this.id));
        name.textContent = this.name;
        return name;
    }

    createTask(){
        let task = document.createElement('button');
        task.addEventListener('click', () => this.addTask(this.id));
        task.textContent = 'Add task';
        return task;
    }

    createDeleteListButton(){
        let deleteListButton = document.createElement('button');
        deleteListButton.addEventListener('click', () => this.deleteList(this.id));
        deleteListButton.textContent = 'Delete';
        return deleteListButton;
    }

    addEventListeners(listBase){
        listBase.addEventListener('dragstart', (e) => {
            e.target.classList.add('selected');
        });
        listBase.addEventListener('dragend', (e => {
            e.target.classList.remove('selected');
        }));
        listBase.addEventListener('dragover', (e) => {
            e.preventDefault();
            let selectedTask = document.querySelector('.selected');
            let currentElement = e.target;
            let isMovable = selectedTask !== currentElement && currentElement.classList.contains(`dragItem`);

            if(!isMovable) return;
            
            let nextElement = (currentElement === selectedTask?.nextElementSibling) ? currentElement.nextElementSibling : currentElement;
            e.target.closest('ul').insertBefore(selectedTask, nextElement);
        })
        // return listBase;
    }

    addTask(id){
        let task = document.createElement('li');
        task.draggable = 'true';
        task.classList.add('dragItem');
        let checkBoxElement = document.createElement('input');
        checkBoxElement.type = 'checkbox';
        // task.insertAdjacentHTML('afterbegin', '<input type="checkbox"');
        let taskText = document.querySelector(`#${id}`).querySelector('.taskContainer input').value;
        task.append(checkBoxElement);
        document.querySelector(`#${id}`).querySelector('ul').append(task);
        
        console.log(document.querySelector(`#${id}`).querySelector('ul'));
        task.textContent = taskText;
        task.addEventListener('dblclick', (e) => this.deleteTask(e));
        // checkBoxElement.addEventListener('change', (e) => this.checkBoxElement(e))
    }

    deleteTask(e){
        let li = e.target.closest('li');
        if(li) li.remove();
    }

    checkBoxElement(e){
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

let count = 0;
document.querySelector('.createList').addEventListener('click', () => {
    let list = new List(count);
    list.createList();
    count++;  
});

