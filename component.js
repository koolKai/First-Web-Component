const template = document.createElement("template");
template.innerHTML = `
<style>
.table-card{
    font-family:'Arial' sans-serif;
    background:#f4f4f4
    disply:'none';
;
width:500px;
grid-template-column:1fr 2fr;
grid-gap:10px;
margin-bottom:15px;
border-bottom:darkorchid 5px solid;}



.tg {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .tg td {
    border-color: black;
    border-style: solid;
    border-width: 1px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
    overflow: hidden;
    padding: 10px 5px;
    word-break: normal;
    text-align:center;
  }
  .tg th {
    border-color: black;
    border-style: solid;
    border-width: 1px;
    font-family: Arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
    overflow: hidden;
    padding: 10px 5px;
    word-break: normal;
  }

  button {
    font-size: 18px;
    padding: 10px;
    cursor: pointer;
    position: absolute;
    background-color:lightblue;
    color: brown;
    border-radius:5px;
  }

</style>
<div>
<P>Click button below get employee data</P>

<div>
<table class='tg table-card'>
<thead>
          
        </thead>
        <tbody id="data"></tbody>
        </table>
</div>
<div>
<button id='all_employee_data'>Get Employee Details</button>
</div>
</div>`;

class ReUseTable extends HTMLElement {
  constructor() {
    super(); // refer immediate parent class instance variable

    this.attachShadow({ mode: "open" });

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  allEmployeeData() {
    const arr = [];
    const url = "http://dummy.restapiexample.com/api/v1/employees";
    fetch(url).then((res) => {
      res.json().then((list) => {
        arr.push(...list.data);

        if (arr.length > 0) {
          var temp = "";
          arr.forEach((itemData) => {
            temp += `<tr> <td class='tg-01ax'>${itemData.id}</td> <td class='tg-01ax'>${itemData.employee_name}</td> <td class='tg-01ax'>${itemData.employee_age}</td> <td class='tg-01ax'>${itemData.employee_salary}</td> </tr>`;

            this.shadowRoot.querySelector(
              "thead"
            ).innerHTML = `<tr><th class='tg-01ax'>ID</th><th class='tg-01ax'>Employee Name</th><th class='tg-01ax'>Age</th><th class='tg-01ax'>Salary</th></tr>`;
            this.shadowRoot.querySelector("tbody").innerHTML = temp;
          });
        }
      });
    });
  }

  //   // search by specific id

  //   employeeDataById() {
  //     const arr = [];
  //     console.log("123");
  //     let id = this.shadowRoot.querySelector("#input").value;
  //     let url = `http://dummy.restapiexample.com/api/v1/employee/${id}`;

  //     console.log(url);
  //     console.log(id);
  //     fetch(url)
  //       .then((res) => res.json())
  //       .then((data) => arr.push(data.data));

  //     if (arr.length > 0) {
  //       var temp = "";

  //       arr.forEach((itemData) => {
  //         temp += `<tr> <td class='tg-01ax'>${itemData.id}</td> <td class='tg-01ax'>${itemData.employee_name}</td> <td class='tg-01ax'>${itemData.employee_age}</td> <td class='tg-01ax'>${itemData.employee_salary}</td> </tr>`;

  //         this.shadowRoot.querySelector(
  //           "thead"
  //         ).innerHTML = `<tr><th class='tg-01ax'>ID</th><th class='tg-01ax'>Employee Name</th><th class='tg-01ax'>Age</th><th class='tg-01ax'>Salary</th></tr>`;
  //         this.shadowRoot.querySelector("tbody").innerHTML = temp;

  //         console.log(arr);
  //       });
  //     }
  //   }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#all_employee_data")
      .addEventListener("click", () => this.allEmployeeData());
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector("#all_employee_data").removeEventListener();
  }
}

window.customElements.define("table-card", ReUseTable);
