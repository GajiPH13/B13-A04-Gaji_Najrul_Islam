Answers to the Questions--

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer : getElementById always return only one element or null if it  does not exit.

        getElementByClassName return an HTMLCollection

        querySelector return only the first matching element

        querySelectorAll return all matching element in a Nodelist.


2. How do you create and insert a new element into the DOM?

Answer: With the help of document.creatElement(tagName)
        After that append it to the new tag following by tag name like:tagName.appendChild(tagName)


3. What is Event Bubbling? And how does it work?

Answer: Event Bubbling works like a loop all the way to parent Node when the event is happend like 'Click'. 
        it work in 3 phases 

        1. Capture Phasse like windo or document
        2. Target Phase to reache the element 
        3. Bubbling Phase back up from the target through its parents at top.


4. What is Event Delegation in JavaScript? Why is it useful?

Answer: Event Delegation is to manage the Events effeciently. You do not have to put on every single child a event   listener insted put one event listener to common parent.

Why is it useful? Because of better performence (memory save), handling dynamic elements and cleaner code.


5.  What is the difference between preventDefault() and stopPropagation() methods?

Answer: 
preventDefault() is cancels default behavior of HTML element if there any default behavior exit. like  'form' by submitig the page refreshing itself.

stopPropagation() tells the event to stop moving. for example if you ckick any button and it stop here and doesn't reach parent.