class List{
    constructor(name){
        this.name = name;
        this.id;
        this.tasks = [];
    }

    createList(){
        let list = document.createElement('div');
        this.id = 'id' + this.name.slice(9);
        list.setAttribute('id', this.id);
        let name = document.createElement('h1');
        let listBody = document.createElement('ol');
        let createTask = document.createElement('button');
        let input = document.createElement('input');
        createTask.addEventListener('click', () => {
            this.addTask();
        })
        document.querySelector('.listsContainer').append(list);
        list.append(name);
        list.append(listBody);
        list.append(input);
        list.append(createTask);
        createTask.textContent = 'Add task';
        name.textContent = this.name;
    }

    addTask(){
        let task = document.createElement('li');
        document.querySelector(`#${this.id}`).append(task);

    }
}

let arrayWithLists = [];

document.querySelector('.createList').addEventListener('click', () => {
    let list = new List(`New list ${arrayWithLists.length}`);
    arrayWithLists.push(list);
    list.createList();
    console.log(arrayWithLists[0].name);
})

