var dt = new Date();
      
        var months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];


        function renderDate() {
            dt.setDate(1);
            var day = dt.getDay();
            var today = new Date();
            var endDate = new Date(
                dt.getFullYear(),
                dt.getMonth() + 1,
                0
            ).getDate();

            var prevDate = new Date(
                dt.getFullYear(),
                dt.getMonth(),
                0
            ).getDate();
            
            monthsAbr= [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ];
            document.getElementById("month").innerHTML = months[dt.getMonth()];
            document.getElementById("date_str").innerHTML = dt.toDateString();
            var cells = "";
            let str2;
            for (x = day; x > 0; x--) {
                let m=  monthsAbr[dt.getMonth()-1];
                let yr= dt.getFullYear();
                let daynum= prevDate - x + 1;
                str2= `${m} ${daynum}, ${yr}`;
                console.log(`str:${str2}`);
                
                cells += `<div id="${str2}" class='prev_date' onclick="dateMatch('${str2}')">` + (prevDate - x + 1) + "</div>";
            }
            console.log(day);
            for (i = 1; i <= endDate; i++) {
                let m=  monthsAbr[dt.getMonth()];
                let yr= dt.getFullYear();
                str2= `${m} ${i}, ${yr}`;
                console.log(`str:${str2}`);
                if (i == today.getDate() && dt.getMonth() == today.getMonth()){
            
                    cells += `<div id="${str2}" class='today' onclick="dateMatch('${str2}')"> ` + i + "</div>";
            }
                else{
                 
                    cells += `<div id="${str2}" onclick="dateMatch('${str2}')">` + i + "</div>";
                }
                    
            }
            document.getElementsByClassName("days")[0].innerHTML = cells;

        }
        

        function moveDate(para) {
            if(para == "prev") {
                dt.setMonth(dt.getMonth() - 1);
            } else if(para == 'next') {
                dt.setMonth(dt.getMonth() + 1);
            }
            renderDate();
        }

        
       let array=[];
       let length=0; 
       let editLoc;

        const toggleModal=() => {
       document.querySelector('.drop')
         .classList.toggle('hide');

     };

     document.querySelector('#button')
      .addEventListener('click',toggleModal);   //click add Event: toggle form

      document.querySelector('.modal-close-bar')
        .addEventListener('click',toggleModal);

        document.querySelector('#submit')
        .addEventListener('click',toggleModal);

    function show_hide(id){
            let click=document.getElementById(`${id}`);
            if(click.style.display==="none"){
                click.style.display="block";
                if(id==="aside")
                    document.getElementById("calendar").style.width="80%";
           
                    
            }
       else{
                click.style.display="none";
                if(id==="aside")
                    document.getElementById("calendar").style.width="100%";
                    
                
            } 
        }   

        show_hide('aside');


         function colorText(id, check){
           let idMonth= new Date(`${id}`);
            idMonth= idMonth.getMonth();
            let styling=document.getElementById(`${id}`);
            if(check==="add")
            styling.style.color="orange";
            else if(dt.getMonth()!==idMonth)
            styling.style.color="grey";
            else if(dt.getMonth()===idMonth)
            styling.style.color="black";
        }


       
        function onSave(){
            event.preventDefault();
            //RECEIVE FORM DATA
             let a= document.forms["drop_content"]["activity"].value;
             let d= document.forms["drop_content"]["date"].value;
             let t= document.forms["drop_content"]["time"].value;
             let data={
                 activity: a,
                 date: d,
                 time: t
             };
             let loc=0;
             //console.log(`new loc ${loc}`);
             length= array.push(data);
             console.log(`NEW ARRAY LENGTH: ${length}`);

             //OUTPUT FORM DATA
             let str="<span class='center'> ALL TASK</span><br>";
             let x=document.getElementById("here");
             x.innerHTML="";
             for(let item of array){
              str +=`<div id="${item.activity}"> <span> ${item.activity}</span> ${item.date} ${item.time} <br>
            <input type="button" class="button waves-effect waves-light purple" onclick="change(${loc})" value="update"> 
            <input type="button" class="button waves-effect waves-light purple" onclick="deleteTask(${loc})" value="delete"></div><br>`;
            loc++;

            if(document.getElementById(`${item.date}`)) //if id exist in html
            colorText(`${item.date}`, 'add');
            }

            x.innerHTML= str;
            document.forms["drop_content"].reset();
            makeToast(`${a} added !`);
        }


        function switchButtons(){
            let x=document.getElementById("saved");
            let y=document.getElementById("edited");
            if(x.style.display==="block"){
                 x.style.display="none";     //HIDE SAVE BUTTON
                y.style.display="block";    //SHOW UPDATE BUTTON
            }
            else{
                y.style.display="none";     //HIDE UPDATE BUTTON
                x.style.display="block";    //SHOW SAVE BUTTON
            }
        }


        function edit(){
            event.preventDefault();
            if(document.querySelector('.hide'))
            toggleModal(); 
            //GET NEW DATA
            
            let a= document.forms["drop_content"]["activity"].value;
            let d= document.forms["drop_content"]["date"].value;
            let t= document.forms["drop_content"]["time"].value;
            let newData={
                activity: a,
                date: d,
                time: t
            };
            
            makeToast(`${array[editLoc].activity} notificaton edited !`);
            array.splice(editLoc, 1, newData);
            console.log(`UPDATED DATA: ${editLoc}`);


            //OUTPUT FORM DATA
            let str="<span class='center'> ALL TASK</span><br>";
            let num=0;
            let x=document.getElementById("here");
            x.innerHTML="";
            for(let item of array){
                str +=`<div id="${item.activity}">${item.activity} ${item.date} ${item.time} <br>
                <input type="button" class="button waves-effect waves-light purple" onclick="change(${num})" value="update"> 
                <input type="button" class="button waves-effect waves-light purple" onclick="deleteTask(${num})" value="delete"></div><br>`;
                num++;
           }
           x.innerHTML= str;

           //SHOW ORIGINAL SAVE BUTTON
            switchButtons();
            makeToast(`${a} added !`);
            document.forms["drop_content"].reset();
        }

        
        
        function change(loc){
            //SWITCH BUTTONS DISPLAYED
            switchButtons();
            toggleModal();
            //PUSH DATA TO BE UPDATED ONTO FORM
           // loc= Number(loc);
            console.log(`UPDATING DATA AT ${loc}`);
            document.forms["drop_content"]["activity"].value= array[loc].activity;
            document.forms["drop_content"]["date"].value= array[loc].date;
            document.forms["drop_content"]["time"].value= array[loc].time;

            

            colorText(`${array[loc].date}`, 'remove');
 
            editLoc=loc;
            
            
        }


        function deleteTask(loc){
            if(document.getElementById(`${array[loc].date}`)) //if id exist in html
            colorText(`${array[loc].date}`, 'remove');  //change back to original color
            makeToast(`${array[loc].activity} notification deleted !`);

            array.splice(loc, 1);       //TO DELETE AT LOCATION
            console.log(`DELETING DATA @ ${[loc]}`);
            
            //OUTPUT FORM DATA
            let str="<span class='center'> ALL TASK</span><br>";
            let num=0;
            let x=document.getElementById("here");
            x.innerHTML="";
            for(let item of array){
                str +=`<div id="${item.activity}">${item.activity} ${item.date} ${item.time} <br>
                <input type="button" class="button waves-effect waves-light purple" onclick="change(${num})" value="update"> 
                <input type="button" class="button waves-effect waves-light purple" onclick="deleteTask(${num})" value="delete"></div><br>`;
                num++;
                if(document.getElementById(`${item.date}`)) //if id exist in html
                colorText(`${item.date}`, 'add');
           }
           x.innerHTML= str;
           document.forms["drop_content"].reset();
           if(document.getElementById("edited").style.display==="block")
            switchButtons();
         }
           
        
        


       function addColor(name){
            let styling=document.getElementById(`${name}`);
            if(styling.style.backgroundColor==="white")
            styling.style.backgroundColor="orange";
            else
            styling.style.backgroundColor="white";
        }

        // STYLING for color: onclick
        //CHECK FOR DATE MATCH: //GETS ID AND ADD COLOR
        function dateMatch(chosenDate){
            //if date match,send id into  add background color
            
           // dt.toDateString()
           // chosenDate;
            let str5= new Date(`${chosenDate}`);            //converts string to date object
             document.getElementById("date_str").innerHTML = str5.toDateString();
            document.getElementById("month").innerHTML = months[str5.getMonth()];   //gets month bet 0-11 & returns that array loc value

            console.log(`CONVERTED TO STRING: ${chosenDate}`);
            for(let task of array){
                
                if(`${task.date}`==chosenDate){
                    console.log(`highlighting: ${task.activity}`);
                  addColor(task.activity); 
                  //colorText(`${chosenDate}`, 'add') ;
                }
                
                
            }
        }

          function makeToast(message){
            M.toast({html:message});
        }
       
     function checkForm(){
        let z=document.forms["drop_content"]["activity"].value;
        let x=document.forms["drop_content"]["date"].value;
        let y=document.forms["drop_content"]["time"].value;
        if(z==="" || y==="" || x===""){
            alert("Please fill out required entries of form");
            return false;
        }
        else return true;
         
    }