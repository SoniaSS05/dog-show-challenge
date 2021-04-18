document.addEventListener('DOMContentLoaded', () => {

    function obtain(){
        const url = `http://localhost:3000/dogs`;
        const listDogs = fetch(url,{
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "accept": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(json =>{
            showDogs(json);
        })
        return listDogs;
    }

    function register(idDog){
        const url = `http://localhost:3000/dogs/${idDog}`;
        const oneListDogs = fetch(url,{
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                    name: document.getElementsByName('name')[0].value,
                    breed: document.getElementsByName('breed')[0].value,
                    sex: document.getElementsByName('sex')[0].value
                })
        })
        .then(resp => resp.json())
        .then(json =>{
            obtain();
        })
        return oneListDogs;
    }



    function showDogs(listDogs){
        eraseChild();
        const dogsCont = document.querySelector('#table-body');
        const selForm = document.querySelector('#dog');
        const pForm = document.createElement('p');
        pForm.id = "id";
        pForm.style.visibility = "hidden";
        selForm.appendChild(pForm);


        const oneDog = listDogs.map(function(listDogs){
            const mtr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdBreed = document.createElement('td');
            const tdSex = document.createElement('td');
            const tdEditDog = document.createElement('button');
            const tdidinv = document.createElement('td');
            tdidinv.style.visibility="hidden";
            tdEditDog.innerHTML= 'Edit Dog';
            tdEditDog.style.width = '80px';
            tdEditDog.style.height = '25px';
            tdEditDog.style.cursor = "pointer";
            dogsCont.appendChild(mtr);
            mtr.appendChild(tdName);
            mtr.appendChild(tdBreed);
            mtr.appendChild(tdSex);
            mtr.appendChild(tdEditDog);
            mtr.appendChild(tdidinv);
            tdName.innerHTML=listDogs.name;
            tdBreed.innerHTML=listDogs.breed;
            tdSex.innerHTML=listDogs.sex;
            tdidinv.innerHTML=listDogs.id;
            tdEditDog.addEventListener('click',(e)=>{
                e.preventDefault();
                console.log(document.getElementsByName("name")[0].value);
                document.getElementsByName('name')[0].value=tdName.innerHTML;
                document.getElementsByName('breed')[0].value=tdBreed.innerHTML;
                document.getElementsByName('sex')[0].value=tdSex.innerHTML;
                document.getElementById('id').value=tdidinv.innerHTML;
             ;
            });
        });

        dog.addEventListener('submit',(e)=>{
            e.preventDefault();
            idSearch = document.getElementById('id').value;
            register(idSearch);

        });
        return oneDog;
    }

    
    function eraseChild(){
        let element = document.getElementById("table-body");
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        let erase=true;
        return erase;
    }

    const data = obtain();
   
  

})