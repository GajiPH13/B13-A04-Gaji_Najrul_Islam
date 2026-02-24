let interviewList = [];
let rejectedList = [];
let currentValue = 'all';

let total =document.getElementById('total');
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

function toggelColor(id){
    //console.log("click",id);
    // remove the active class from all buttons
    btnAll.classList.remove('bg-[#3B82F6]','text-white');
    btnInterview.classList.remove('bg-white','text-white');
    btnRejected.classList.remove('bg-white','text-white');

    // add the active class to the clicked button
    btnAll.classList.add('bg-white','text-black');
    btnInterview.classList.add('bg-white','text-black');
    btnRejected.classList.add('bg-white','text-black');
    
    const selected = document.getElementById(id);

    currentValue = id;
    console.log(currentValue);

    selected.classList.remove('bg-white');
    selected.classList.add('bg-[#3B82F6]','text-white');

    if(id == 'btnInterview'){
        allJobs.classList.add('hidden');
        filterJobs.classList.remove('hidden');
        renderInterviewed();
        // Count the number of jobs in the interview list and update the numOfJobs element
        numOfJobs.innerText = `${interviewList.length} of ${allJobs.children.length} `;
        // display the no jobs message if there are no jobs in the interview list
        if(interviewList.length == 0){
            noJobs();
        }/* else{
            noMatch.classList.add('hidden');
        } */
        
    }else if(id == 'btnAll'){
        allJobs.classList.remove('hidden');
        filterJobs.classList.add('hidden');
        numOfJobs.innerText = allJobs.children.length;
        
        //noMatch.classList.add('hidden');
    }else if(id == 'btnRejected'){
        allJobs.classList.add('hidden');
        filterJobs.classList.remove('hidden');
        renderRejected();
        numOfJobs.innerText = `${rejectedList.length} of ${allJobs.children.length}`;
        if(rejectedList.length == 0){
            noJobs();
        }/* else{
            noMatch.classList.add('hidden');
        } */
    }
}

//delegation event for interview and rejected buttons

mainSection.addEventListener('click',function (event) {

    
    if(event.target.classList.contains('btnInterviewSelect')){

        const jobsParent = event.target.parentNode.parentNode;
        //console.log(jobsParent);

        const companyName = jobsParent.querySelector('.companyName').innerText;
        const position = jobsParent.querySelector('.position').innerText;
        const salary = jobsParent.querySelector('.salary').innerText;
        const jobStatus = jobsParent.querySelector('.jobStatus').innerText;
        const jobDes = jobsParent.querySelector('.jobDes').innerText;

        //console.log(companyName, position, salary, jobStatus, jobDes);

        jobsParent.querySelector('.jobStatus').innerText = 'Interviewed';

            const jobInfo = {
                companyName,
                position,
                salary,
                jobStatus: 'Interviewed',
                jobDes
                
            }
        
            const jobExist = interviewList.find(job => job.companyName == jobInfo.companyName);
        
            if(!jobExist){
                interviewList.push(jobInfo);
            }

            rejectedList = rejectedList.filter(job => job.companyName !== jobInfo.companyName);

            if(currentValue == 'btnRejected'){
                renderRejected();
            }

            updateTotal();

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

        const jobExist = rejectedList.find(job => job.companyName == jobInfo.companyName);
        
        if(!jobExist){
            rejectedList.push(jobInfo);
        }
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
    
    /* console.log(interviewList);
     if(event.target.classList.contains('btnRemove') &&
      parentNode.jobStatus.innerText == 'Interviewed' ){
        event.target.parentNode.parentNode.parentNode.remove();
        nrOfInterviews.innerText = interviewList.length -1;
        updateTotal();
      }  */
            

    
    
    
    
})

//creat element for rejected button
function renderInterviewed(){
    filterJobs.innerHTML = '';

    for(let interview of interviewList){
        console.log(interview);

        let div = document.createElement('div');
        div.className = 'jobs flex-col gap-4 shadow-md rounded-lg bg-white min-h-[300px] mb-5 px-6 py-6';
        div.innerHTML = `
            
            <div class="flex justify-between space-y-6" >
                    <div>
                        <h3 id="companyTitle" class="text-[18px] font-bold text-black mb-1">${interview.companyName}</h3>
                        <p id="jobTitle" class="text-[18px] text-gray-500">React Native Developer</p>
                    </div>
                    <div >
                        <button  class="removeJobs w-8 h-8 bg-red-500 text-white rounded-full">X</button>
                    </div>
                </div>
                    <p id="salary" class="my-5">Remote • Full-time •$130,000 - $175,000</p>
                <div>
                    <p id="jobStatus" class="px-3 py-2 bg-[#EEF4FF] w-35" type="text" >${interview.jobStatus}</p>
                    <p id="jobDes" class="mt-2 mb-5">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
                </div>
                <div class="flex gap-5">
                    <button id="btnInterviewSelect" class="px-3 py-2 border-2 border-green-300 text-green-500 rounded-[5px]">Interviewed</button>
                    <button id="btnRejectedSelect" class="px-3 py-2 border-2 border-red-300 text-red-500 rounded-[5px]">Rejected</button>
                </div>
            </div>
        `
        filterJobs.appendChild(div);
    }
}

function renderRejected(){
    filterJobs.innerHTML = '';

    for(let rejected of rejectedList){
        //console.log(rejected.length);

        let div = document.createElement('div');
        div.className = ' jobs shadow-md rounded-lg bg-white min-h-[300px] px-6 py-6';
        div.innerHTML = `
            
            <div class="flex justify-between" >
                    <div>
                        <h3 id="companyTitle" class="text-[18px] font-bold text-black mb-1">${rejected.companyName}</h3>
                        <p id="jobTitle" class="text-[18px] text-gray-500">React Native Developer</p>
                    </div>
                    <div >
                        <button  class="removeJobs w-8 h-8 bg-red-500 text-white rounded-full">X</button>
                    </div>
                    </div>
                        <p id="salary" class="my-5">Remote • Full-time •$130,000 - $175,000</p>
                    <div>
                        <p id="jobStatus" class="px-3 py-2 bg-[#EEF4FF] w-35" type="text" >${rejected.jobStatus}</p>
                        <p id="jobDes" class="mt-2 mb-5">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
                    </div>
                <div class="flex gap-5">
                    <button id="btnInterviewSelect" class="px-3 py-2 border-2 border-green-300 text-green-500 rounded-[5px]">INTERVIEW</button>
                    <button id="btnRejectedSelect" class="px-3 py-2 border-2 border-red-300 text-red-500 rounded-[5px]">REJECTED</button>
                </div>
            </div>
        `
        filterJobs.appendChild(div);
    }
}

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
   // noMatch.classList.remove('hidden');
    //noMatch.classList.add('hidden');
}

