document.addEventListener('DOMContentLoaded', function () {
    const input1 = document.querySelector('.taskInput');
    const input2 = document.querySelectorAll('.options input');
    const list = document.querySelector('.list ul');
    const btn = document.querySelector('.button');
    const main = document.querySelector('.main');



     

  
    btn.addEventListener('click', function (e) {
      e.preventDefault(); 
  
      if (input1.value === '') {
        alert('Please enter a new task!');
      } else {

        // creating the tasks
        const container = document.createElement('div');
        container.classList.add("flex");
        const text = document.createElement('li');
        text.innerText = input1.value;

        
          
        //creating the buttons
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btnflex');
        const del = document.createElement('i');

        // making the delete function
        
        del.classList.add('fa-solid' , 'fa-trash');
        del.addEventListener('click', function () {
            const ls = JSON.parse(localStorage.getItem("tasks"));
            const taskText = text.innerText;

            if (ls) {
        const updatedTasks = ls.filter(taskObj => taskObj.task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            }
            container.remove(); 
            
        });

        // local storage 

         const taskObject = {task:input1.value, time: new Date()}
        
        const ls = JSON.parse(localStorage.getItem("tasks"))
        

         if (!ls) {
            localStorage.setItem("tasks", JSON.stringify([taskObject])) 
          } else {
            ls.push(taskObject)
            localStorage.setItem("tasks", JSON.stringify(ls)) 
          }  

          console.log(taskObject) 
         
        //once the task is completed
        

        text.addEventListener('click', function(){
            text.classList.add('checked');

            if (text.classList.contains('checked')) {
                text.addEventListener('click', function(){
                    text.classList.toggle('checked');
                }) 
            }
        }) 

        
        // making the edit function 

        const edit = document.createElement('i');
        edit.classList.add('fa-solid', 'fa-pen-to-square')

          edit.addEventListener('click', function(){
            const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.value = text.innerText;
                edit.remove();
                del.remove();

               
                inputField.addEventListener('input', function () {
                    text.innerText = inputField.value;
                });
  
                const replace = document.createElement('i')
                replace.classList.add('fa-solid', 'fa-check')
                container.appendChild(replace)

            replace.addEventListener('click', function() {
                
                const ls = JSON.parse(localStorage.getItem("tasks"));

                if(ls){
                    ls.forEach(task => {
                        if (task.task ===text.innerText){
                            task.task = inputField.value
                        }
                    });

                    localStorage.setItem("tasks", JSON.stringify(ls));
                }

                if (!inputField.value) {
                    alert(`You can't replace something with nothing! I created a delete button for that :)`)
                } else {
                
                text.innerHTML= inputField.value
                inputField.replaceWith(text); 
                replace.remove();
                btnContainer.appendChild(del);
                btnContainer.appendChild(edit);
                }
                
            })

                text.replaceWith(inputField);
                btnContainer.appendChild(replace);
        
                
                inputField.focus();

                
                

        });   
        
       
        
        container.appendChild(text);
        container.appendChild(btnContainer)
        btnContainer.appendChild(del)
        btnContainer.appendChild(edit)
        list.appendChild(container);
    
    

        input1.value = '';  

       
    }

    
      
    });
    const displayTasks = () => {
        const ls= JSON.parse(localStorage.getItem("tasks"))
        
        if (!ls) return
      
        ls.forEach(task => {
        const container = document.createElement('div');
        container.classList.add("flex");
        const text = document.createElement('li');
        text.innerText = task.task;
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btnflex');
        const del = document.createElement('i');
        const edit = document.createElement('i');
        edit.classList.add('fa-solid', 'fa-pen-to-square')
        container.appendChild(text);
        container.appendChild(btnContainer)
        btnContainer.appendChild(del)
        btnContainer.appendChild(edit)
        list.appendChild(container);
        });
      }

    displayTasks();
});
  