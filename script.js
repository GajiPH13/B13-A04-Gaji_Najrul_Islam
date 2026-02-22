let interviewList = [];
let rejectedList = [];
let currentValue ='all';

let total =document.getElementById("total");
let nrOfInterviews = document.getElementById("numOfInterview");
let nrOfRejected = document.getElementById("numOfRejected");
let nrOfCart = document.getElementById("numOfCart");
let numOfJobs = document.getElementById("numOfJobs");
const main = document.getElementById("main");
const filterJobs = document.getElementById("filterJobs");

let btnInterviewSelect = document.getElementById("btnInterviewSelect");
let btnRejectedSelect = document.getElementById("btnRejectedSelect");
let jobStatus = document.getElementById("jobStatus");
//console.log(main);
//console.log(nrOfCart);
//interviewList.push("interview1");

const btnAll = document.getElementById("btnAll");
const btnInterview = document.getElementById("btnInterview");
const btnRejected = document.getElementById("btnRejected");

// funcrion to update the total number of applications, interviews, and rejections
function updateTotal() {
    total.innerText = nrOfCart.children.length - 1;
    numOfJobs.innerHTML = nrOfCart.children.length - 1;
    nrOfInterviews.innerHTML = interviewList.length;
    nrOfRejected.innerHTML = rejectedList.length;
    //console.log(totalApplications);
    
    //numOfJobs.innerHTML = totalApplications;
 
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

}

main.addEventListener("click",function (event) {

    //console.log(event.target.id.includes("btnInterviewSelect"));

    if(event.target.id.includes("btnInterviewSelect")){

        const cartParent = event.target.parentNode.parentNode

        const companyTitle = document.querySelector('#companyTitle').innerText;
        //console.log(companyTitle);
        const jobTitle = document.querySelector('#jobTitle').innerText;
        const salary = document.querySelector('#salary').innerText;
        const jobDes = document.querySelector('#jobDes').innerText;
        const jobStatus = document.querySelector('#jobStatus').placeholder;
        console.log(companyTitle, jobTitle, salary, jobDes, jobStatus);

        const jobInfo = {
            companyTitle: companyTitle,
            jobTitle: jobTitle,
            salary: salary,
            jobStatus: jobStatus,
            jobDes: jobDes
            
        }
        //console.log(jobInfo);
        const jobExist = interviewList.find(job => job.companyTitle === jobInfo.companyTitle);
        if(!jobExist){
            interviewList.push(jobInfo);
        }

        rejectedList = rejectedList.filter(job => job.companyTitle !== jobInfo.companyTitle);

        if(currentValue === "btnRejected"){
            rejectedList.push(jobInfo);
        }
        renderInterviewed();
    }
})

function renderInterviewed(){
    filterJobs.innerHTML = "";
    for(let interview of interviewList){
        console.log(interview);
        const div = document.createElement("div");
        div.classList.add("shadow-md", "rounded-lg", "bg-white", "min-h-[300px]", "px-6", "py-6");
        div.innerHTML = `
            
                <div class="flex justify-between" >
                    <div>
                        <h3 id="companyTitle" class="text-[18px] font-bold text-black mb-1">Mobile First Corp</h3>
                        <p id="jobTitle" class="text-[18px] text-gray-500">React Native Developer</p>
                    </div>
                    <div id="btnRemove">
                        <button onclick="removeJob(this)" class="w-8 h-8 bg-red-500 text-white rounded-full">X</button>
                    </div>
                </div>
                    <p id="salary" class="my-5">Remote • Full-time •$130,000 - $175,000</p>
                <div>
                    <input id="jobStatus" class="px-3 py-2 bg-[#EEF4FF] w-35" type="text" disabled placeholder="Not applicable">
                    <p id="jobDes" class="mt-2 mb-5">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
                </div>
                <div class="flex gap-5">
                    <button id="btnInterviewSelect" class="px-3 py-2 border-2 border-green-300 text-green-500 rounded-[5px]">INTERVIEW</button>
                    <button id="btnRejectedSelect" class="px-3 py-2 border-2 border-red-300 text-red-500 rounded-[5px]">REJECTED</button>
                </div>
        `;
        filterJobs.appendChild(div);
    }
}