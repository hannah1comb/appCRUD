$( function() { // jQuery that replaced document.ready()

    let shelterPets = [];
    let hasRan = false;
    const crudApi = 'https://crudcrud.com/api/d567e278d8fd4d7896033d65f488cc0d/shelterPets';


    if ( hasRan != true ) {
        $.get(crudApi, (data) => { //AJAX call
            for (let i = 0; i < data.length; i++ ) { 
                shelterPets.push(data[i])

            }
            buildTable(shelterPets)
            console.log(shelterPets);
        })
        hasRan = true;
    }

    function buildTable(data) {
        let tBody = document.getElementById('t-body');
        tBody.innerHTML = ""
        for ( let i = 0; i < data.length; i++ ) {
            let row = tBody.insertRow(0);
            let id = row.insertCell(0);
            let name = row.insertCell(1);
            let animalType = row.insertCell(2);
            let animalColor = row.insertCell(3);
            let size = row.insertCell(4);
            let updateDelete = row.insertCell(5);

            row.setAttribute('id', i);


            id.innerHTML = i;
            name.innerHTML = data[i].name;
            animalType.innerHTML = data[i].animalType;
            animalColor.innerHTML = data[i].animalColor;
            size.innerHTML = data[i].size;

            updateDelete.innerHTML = `
                <button type="button" class="btn btn-danger">Delete Row</button>
            `

            let deleteButton = document.querySelector('.btn-danger');
            deleteButton.addEventListener('click', (evt) => {
                let id = evt.target.parentElement.parentElement.getAttribute('id');
                
                var settingsTwo = {
                    "url": crudApi + `/${shelterPets[id]._id}`,
                    "method": "DELETE",
                    "timeout": 0,
                  };
                  
                  $.ajax(settingsTwo).done(function (response) {
                    console.log(response);
                  });
                  shelterPets.splice(id, 1);
                console.log(shelterPets);
                buildTable(shelterPets);
            });
        }
    }

    let addButton = document.getElementById('add-animal');
    addButton.addEventListener('click', (evt) => {
        let animalId = document.getElementById('animal-id').value;
        let animalName = document.getElementById('animal-name').value;
        let animalTypeValue = document.getElementById('animal-type').value;
        let animalColorValue = document.getElementById('animal-color').value;
        let animalSizeValue = document.getElementById('animal-size').value;
        let thePet = {
            name: animalName,
            animalType: animalTypeValue,
            animalColor: animalColorValue,
            size: animalSizeValue
        }
        //if empty add new row
        if (animalId === ''){
            let tBody = document.getElementById('t-body');
            let row = tBody.insertRow(0);
            let id = row.insertCell(0);
            let name = row.insertCell(1);
            let animalType = row.insertCell(2);
            let animalColor = row.insertCell(3);
            let size = row.insertCell(4);
            let updateDelete = row.insertCell(5);
    
            row.setAttribute('id', shelterPets.length);
            
    
            id.innerHTML = shelterPets.length;
            name.innerHTML = animalName;
            animalType.innerHTML = animalTypeValue
            animalColor.innerHTML= animalColorValue
            size.innerHTML = animalSizeValue
            
           
    
            var settings = {
                "url": crudApi,
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify(thePet),
              };
              
              $.ajax(settings).done(function (response) {
                console.log(response);
                shelterPets.push(response);
                console.log("shelter pets after add: ")
                console.log(shelterPets)
              });
    
            updateDelete.innerHTML = `
                <button type="button" class="btn btn-danger">Delete Row</button>
            `
    
            
            console.log(shelterPets)
            let deleteButton = document.querySelector('.btn-danger');
            deleteButton.addEventListener('click', (evt) => {
                let id = evt.target.parentElement.parentElement.getAttribute('id');
                var settingsTwo = {
                    "url": crudApi + `/${shelterPets[id]._id}`,
                    "method": "DELETE",
                    "timeout": 0,
                  };
                  
                  $.ajax(settingsTwo).done(function (response) {
                    console.log(response);
                  });
                shelterPets.splice(id, 1);
                console.log(shelterPets);
                buildTable(shelterPets);
            }); 
        }
        //if valid row number update row
        else if (animalId < shelterPets.length && animalId >=0){
            var updateSettings = {
                "url": crudApi + `/${shelterPets[animalId]._id}`,
                "method": "PUT",
                "timeout": 0,
                "headers": {
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify(thePet),
              };
              
              $.ajax(updateSettings).done(function (response) {
                console.log(response);
              });

            let updateRow = document.getElementById(animalId)
            updateRow.childNodes[1].innerHTML = animalName
            updateRow.childNodes[2].innerHTML = animalTypeValue
            updateRow.childNodes[3].innerHTML = animalColorValue
            updateRow.childNodes[4].innerHTML = animalSizeValue

            shelterPets[animalId].name = animalName
            shelterPets[animalId].animalType = animalTypeValue
            shelterPets[animalId].animalColor = animalColorValue
            shelterPets[animalId].size = animalSizeValue

        }  
        //if invalid number, alert 
        else{ 
            alert('Invalid Number')

        }
       
        
    })


   


}) 
