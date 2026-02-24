
// Get declaration for the interview and rejected lists, current value

let interviewList = [];
let rejectedList = [];
let currentValue = 'all';

// Catch the elements with there id and class name

let total = document.getElementById('total');
let nrOfInterviews = document.getElementById('numOfInterview');
let nrOfRejected = document.getElementById('numOfRejected');

let numOfJobs = document.getElementById('numOfJobs');

const allJobs = document.getElementById('allJobs');
const mainSection = document.getElementById('mainSection');
const filterJobs = document.getElementById('filterJobs');

const btnAll = document.getElementById("btnAll");
const btnInterview = document.getElementById("btnInterview");
const btnRejected = document.getElementById("btnRejected");

const deletJob = document.getElementById('btnRemove');

// funcrion to update the total number of applications, interviews, and rejections

function updateTotal() {
    total.innerText = allJobs.children.length;
    numOfJobs.innerText = allJobs.children.length;
    
    nrOfInterviews.innerText = interviewList.length;
    nrOfRejected.innerText = rejectedList.length;
   
 
}

 updateTotal();

 // function to toggle the color of the buttons and filter the jobs based on the selected button

function toggelColor(id){
    
    // remove the active class from all buttons

    btnAll.classList.remove('bg-[#3B82F6]','text-white');
    btnInterview.classList.remove('bg-white','text-white');
    btnRejected.classList.remove('bg-white','text-white');

    // add the active class to the clicked button

    btnAll.classList.add('bg-white','text-black');
    btnInterview.classList.add('bg-white','text-black');
    btnRejected.classList.add('bg-white','text-black');
    
    // to put getElementById in a variable to avoid repetition and make the code cleaner

    const selected = document.getElementById(id);

    currentValue = id;
    console.log(currentValue);

    selected.classList.remove('bg-white');
    selected.classList.add('bg-[#3B82F6]','text-white');

    // when the Interwiew button is clicked, hide all jobs and 
    // show only the interviewed jobs, and update the number of jobs 
    // in the interview list and the total number of jobs, and display 
    // the no jobs toast message if there are no jobs in the interview list

    if(id == 'btnInterview'){
        allJobs.classList.add('hidden');
        filterJobs.classList.remove('hidden');
        renderInterviewed();

        // Count the number of jobs in the interview list and update the numOfJobs element
        numOfJobs.innerText = `${interviewList.length} of ${allJobs.children.length} `;

        // display the no jobs toast message if there are no jobs in the interview list
        if(interviewList.length == 0){
            noJobs();
        }
        
    // when the All button is clicked, show all jobs and hide the filtered jobs, 
    // and update the number of jobs in the total list

    }else if(id == 'btnAll'){
        allJobs.classList.remove('hidden');
        filterJobs.classList.add('hidden');
        numOfJobs.innerText = allJobs.children.length;
        
        
    // when the Rejected button is clicked, hide all jobs and show only the rejected jobs,
    // and update the number of jobs in the rejected list and the total number of jobs, 
    // and display the no jobs toast message if there are no jobs in the rejected list

    }else if(id == 'btnRejected'){
        allJobs.classList.add('hidden');
        filterJobs.classList.remove('hidden');
        renderRejected();
        numOfJobs.innerText = `${rejectedList.length} of ${allJobs.children.length}`;
        if(rejectedList.length == 0){
            noJobs();
        }
    }
}

//Delegation event for interview and rejected buttons

mainSection.addEventListener('click',function (event) {

    
    if(event.target.classList.contains('btnInterviewSelect')){

        // put the parent node of the button in a variable to avoid repetition 
        const jobsParent = event.target.parentNode.parentNode;
        
        // get the job information from the parent node and put it in a variable to avoid repetition 
        const companyName = jobsParent.querySelector('.companyName').innerText;
        const position = jobsParent.querySelector('.position').innerText;
        const salary = jobsParent.querySelector('.salary').innerText;
        const jobStatus = jobsParent.querySelector('.jobStatus').innerText;
        const jobDes = jobsParent.querySelector('.jobDes').innerText;

        //creat a list of array of object to store in interviewList
        jobsParent.querySelector('.jobStatus').innerText = 'Interviewed';

            const jobInfo = {
                companyName,
                position,
                salary,
                jobStatus: 'Interviewed',
                jobDes
                
            }
        // check if the job already exist in the interview list, if not push it to the interview list
            const jobExist = interviewList.find(job => job.companyName == jobInfo.companyName);
        
            if(!jobExist){
                interviewList.push(jobInfo);
            }
        // filter the rejected list to remove the job that is added to the interview list
            rejectedList = rejectedList.filter(job => job.companyName !== jobInfo.companyName);

            if(currentValue == 'btnRejected'){
                //
                renderRejected();
                //
            }

            updateTotal();
        //

    }else if(event.target.classList.contains('btnRejectedSelect')){

        const jobsParent = event.target.parentNode.parentNode;
        //console.log(jobsParent);
        const companyName = jobsParent.querySelector('.companyName').innerText;
        const position = jobsParent.querySelector('.position').innerText;
        const salary = jobsParent.querySelector('.salary').innerText;
        const jobStatus = jobsParent.querySelector('.jobStatus').innerText;
        const jobDes = jobsParent.querySelector('.jobDes').innerText;

        jobsParent.querySelector('.jobStatus').innerText = 'Rejected';

        const jobInfo = {
            companyName,
            position,
            salary,
            jobStatus: 'Rejected',
            jobDes
        }

        // check if the job already exist in the rejected list, if not push it to the rejected list

        const jobExist = rejectedList.find(job => job.companyName == jobInfo.companyName);

        //chck if the job already exist
        if(!jobExist){
            rejectedList.push(jobInfo);
        }
        // filter the interview list to remove the job that is added to the rejected list
        interviewList = interviewList.filter(job => job.companyName != jobInfo.companyName);
        if(currentValue == 'btnInterview'){
            renderInterviewed();
        }
        
    updateTotal()

    }
    //delete job from the list
    if(event.target.classList.contains('btnRemove')){
        
        event.target.parentNode.parentNode.parentNode.remove();
        //console.log(event.target.parentNode.parentNode.parentNode);
        filterJobs.classList.add('hidden');
        //interviewList.add('hidden');

        updateTotal();
    }
    
    
            

    
    
    
    
})

//creat element for interview button
function renderInterviewed(){
    filterJobs.innerHTML = '';

    for(let interview of interviewList){
        //console.log(interview);

        let div = document.createElement('div');
        div.className = 'jobs flex-col gap-4 shadow-md rounded-lg bg-white min-h-[300px] mb-5 px-6 py-6';
        div.innerHTML = `
            
            <div class="flex justify-between" >
                    <div>
                        <h3  class=" companyTitle text-[18px] font-bold text-black mb-1">${interview.companyName}</h3>
                        <p  class="jobTitle text-[18px] text-gray-500">${interview.position}</p>
                    </div>
                    <div >
                        <button  class="removeJobs w-8 h-8 bg-red-500 text-white rounded-full">X</button>
                    </div>
                    </div>
                        <p  class="salary my-5">Remote • Full-time • $130,000 - $175,000>${interview.salary}</p>
                    <div>
                        <p  class="jobStatus px-3 py-2 bg-[#EEF4FF] w-35" type="text" >${interview.jobStatus}</p>
                        <p  class=" jobDes mt-2 mb-5">${interview.jobDes}</p>
                    </div>
                <div class="flex gap-5">
                    <button  class="btnInterviewSelect px-3 py-2 border-2 border-green-300 text-green-500 rounded-[5px]">INTERVIEW</button>
                    <button  class="btnRejectedSelect px-3 py-2 border-2 border-red-300 text-red-500 rounded-[5px]">REJECTED</button>
                </div>
            </div>
        `
        filterJobs.appendChild(div);
    }
}

//creat element for rejected button
function renderRejected(){
    filterJobs.innerHTML = '';

    for(let rejected of rejectedList){
        //console.log(rejected.length);

        let div = document.createElement('div');
        div.className = ' jobs shadow-md rounded-lg bg-white min-h-[300px] px-6 py-6';
        div.innerHTML = `
            
            <div class="flex justify-between" >
                    <div>
                        <h3  class=" companyTitle text-[18px] font-bold text-black mb-1">${rejected.companyName}</h3>
                        <p  class="jobTitle text-[18px] text-gray-500">${rejected.position}</p>
                    </div>
                    <div >
                        <button  class="removeJobs w-8 h-8 bg-red-500 text-white rounded-full">X</button>
                    </div>
                    </div>
                        <p  class="salary my-5">Remote • Full-time • $130,000 - $175,000>${rejected.salary}</p>
                    <div>
                        <p  class="jobStatus px-3 py-2 bg-[#EEF4FF] w-35" type="text" >${rejected.jobStatus}</p>
                        <p  class=" jobDes mt-2 mb-5">${rejected.jobDes}</p>
                    </div>
                <div class="flex gap-5">
                    <button  class="btnInterviewSelect px-3 py-2 border-2 border-green-300 text-green-500 rounded-[5px]">INTERVIEW</button>
                    <button  class="btnRejectedSelect px-3 py-2 border-2 border-red-300 text-red-500 rounded-[5px]">REJECTED</button>
                </div>
            </div>
        `
        filterJobs.appendChild(div);
    }
}

// function to display the no jobs toast message when there are no jobs in the interview or rejected list

function noJobs(){
    filterJobs.innerHTML = '';
    let div = document.createElement('div');
    div.className = "flex flex-col items-center  justify-center shadow-md rounded-lg bg-white min-h-[300px] px-6 py-6 "
    div.innerHTML = `
        <div>
            <img src="./ICONS/noJob.png" alt="" srcset="">
        </div>
        <div>
            <p class="text-center">No job found</p>
            <p class="text-center">Check back soon for new job opportunities</p>
        </div>
    `
    filterJobs.appendChild(div);
   
}

