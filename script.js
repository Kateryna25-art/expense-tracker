const tracker = {
    expenses: [],
    nextId :1,
    add(title, category, amount){
const expense = {
        id: this.nextId,
        title: title,
        category: category,
        amount: amount,
}
 this.expenses.push(expense)
 this.nextId++;
    },
    getTotal() {
    return this.expenses.reduce((sum, expense) => sum + expense.amount,0)
},
remove(id){
    this.expenses = this.expenses.filter((expense) => expense.id !== id)
},
getByCategory() {
    return this.expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});
},
getMostExpensive() {
    return [...this.expenses].sort((a,b) => b.amount - a.amount)[0];
},
filterByCategory(category){
    return this.expenses.filter((expense) => expense.category=== category)
}
};

/*tracker.add("Coffe", "food", 4);
tracker.add("Taxi", "transport", 15);
console.log(tracker.expenses)
console.log(tracker.getTotal());

tracker.remove(1);
console.log(tracker.expenses);
console.log(tracker.getTotal());

tracker.add("Lunch", "food", 12);
tracker.add("Bus", "transport", 12);
tracker.add("Netflix", "fun", 10);
tracker.add("Groceries", "food", 40);
console.log(tracker.getByCategory());
console.log(tracker.getMostExpensive());
*/
const totalEl = document.querySelector("#total");

 totalEl.textContent = tracker.getTotal()

 const formEl = document.querySelector('#expense-form');
 const titleInput = document.querySelector('#title-input');
 const categoryInput = document.querySelector('#category-input');
 const amountInput = document.querySelector('#amount-input');
 const listEl = document.querySelector('#expense-list');
 const filterEl = document.querySelector('#filter')
 filterEl.addEventListener('change', ()=>{
   updateUI();
 })

 formEl.addEventListener('submit', (event)=> {
event.preventDefault();
const title = titleInput.value;
 const category = categoryInput.value;
 const amount = Number(amountInput.value);
 if(!title || !category || amount <= 0 ){
    return;
 }
 tracker.add(title, category, amount)
 titleInput.value = "";
 categoryInput.value = "";
 amountInput.value = "";
updateUI();
 });
 function getVisibleExpenses(){
    return filterEl.value === "all" ? tracker.expenses: tracker.filterByCategory(filterEl.value)
 }
 function renderList(){
listEl.innerHTML = "";
const list = getVisibleExpenses()
list.forEach((expense) => {
    const li = document.createElement("li");
  const titleEl = document.createElement("span")
  titleEl.className = "expense__title"
  titleEl.textContent = expense.title
  const badgeEl = document.createElement("span")
  badgeEl.className = `badge badge--${expense.category.toLowerCase()}`
  badgeEl.textContent = expense.category
  const amountEl = document.createElement("span")
  amountEl.className = "expense__amount"
  amountEl.textContent = `${expense.amount} $`

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "x"
    deleteBtn.addEventListener('click',(event)=>{
        tracker.remove(expense.id)
        updateUI();
    })
      li.append(titleEl,badgeEl,amountEl,deleteBtn)
    listEl.append(li)
});
 };
     function updateUI(){
       renderList()   
       totalEl.textContent= getVisibleExpenses().reduce((acc,expense)=>acc+expense.amount,0)
       localStorage.setItem("expenses", JSON.stringify(tracker.expenses));
       localStorage.setItem("nextId", tracker.nextId)
        }
        const saved = localStorage.getItem("expenses");
       if(saved){
        tracker.nextId = Number(localStorage.getItem("nextId"));
        tracker.expenses = JSON.parse(saved)
       }
 updateUI();

 
