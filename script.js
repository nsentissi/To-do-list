document.addEventListener('DOMContentLoaded', function () {
    const input1 = document.querySelector('.taskInput');
    const input2 = document.querySelectorAll('.options input');
    const list = document.querySelector('.list ul');
    const btn = document.querySelector('.button');
  
    btn.addEventListener('click', function (e) {
      e.preventDefault(); 
  
      if (input1.value === '') {
        alert('Please enter a new task!');
      } else {
        const container = document.createElement('div');
        container.classList.add("flex");
        const text = document.createElement('li');
        text.innerText = input1.value;
        
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btnflex');
        const del = document.createElement('i');
        
        del.classList.add('fa-solid' , 'fa-trash');
        del.addEventListener('click', function () {
            container.remove(); 
        });

        text.addEventListener('click', function(){
            text.classList.add('checked');

            if (text.classList.contains('checked')) {
                text.addEventListener('click', function(){
                    text.classList.toggle('checked');
                }) 
            }
        }) 

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
                text.innerHTML= inputField.value
                inputField.replaceWith(text); 
                replace.remove();
                btnContainer.appendChild(del);
                btnContainer.appendChild(edit);
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
  });
  