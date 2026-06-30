let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];


const list = document.getElementById("transactionList");


function updateUI(data = transactions){


    list.innerHTML="";


    let income = 0;
    let expense = 0;


    transactions.forEach(item=>{

        if(item.type==="income")
            income += item.amount;

        else
            expense += item.amount;

    });



    document.getElementById("income")
    .innerText = "₹"+income;


    document.getElementById("expense")
    .innerText = "₹"+expense;


    document.getElementById("balance")
    .innerText = "₹"+(income-expense);



    data.forEach(item=>{


        let li=document.createElement("li");


        li.className =
        item.type==="income"
        ? "income-item"
        :"expense-item";


        li.innerHTML=`

        <span>
        ${item.title}
        <br>
        ₹${item.amount}
        </span>


        <button class="delete"
        onclick="deleteTransaction(${item.id})">
        X
        </button>

        `;


        list.appendChild(li);


    });


}



document
.getElementById("expenseForm")
.addEventListener("submit",function(e){


    e.preventDefault();


    let title =
    document.getElementById("title").value;


    let amount =
    Number(document.getElementById("amount").value);


    let type =
    document.getElementById("type").value;



    let transaction={

        id:Date.now(),

        title,

        amount,

        type

    };


    transactions.push(transaction);


    saveData();


    updateUI();


    this.reset();


});





function deleteTransaction(id){


    transactions =
    transactions.filter(item=>item.id!==id);


    saveData();


    updateUI();

}





function filterData(type){


    if(type==="all"){

        updateUI();

        return;

    }


    let filtered =
    transactions.filter(item=>item.type===type);


    updateUI(filtered);


}





function saveData(){


    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );


}



updateUI();